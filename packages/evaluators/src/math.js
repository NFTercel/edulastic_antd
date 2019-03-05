import axios from 'axios';
import { omitBy } from 'lodash';
import { ScoringType } from './const/scoring';

const url =
  'https://9ehy0wtpo7.execute-api.us-east-1.amazonaws.com/dev/evaluate';

const evaluate = data =>
  axios
    .post(url, {
      ...data
    })
    .then(result => result.data);

const getChecks = validation => {
  const altResponses = validation.alt_responses || [];

  const values = [
    ...validation.valid_response.value,
    ...altResponses.reduce((acc, res) => [...acc, ...res.value], [])
  ];

  return values.reduce((valAcc, val, valIndex) => {
    let options = val.options || {};
    options = omitBy(options, f => f === false);

    let midRes = Object.keys(options).reduce((acc, key, i) => {
      const fieldVal = options[key];

      acc += i === 0 ? ':' : '';

      if (key === 'argument') {
        return acc;
      }

      if (fieldVal === false) {
        return acc;
      }

      if (key === 'setThousandsSeparator') {
        if (fieldVal.length) {
          const stringArr = `[${fieldVal.map(f => `'${f}'`)}]`;
          acc += `${key}=${stringArr}`;
        } else {
          return acc;
        }
      } else if (key === 'allowThousandsSeparator') {
        return acc;
      } else if (key === 'setDecimalSeparator') {
        acc += `${key}='${fieldVal}'`;
      } else if (key === 'allowedUnits') {
        acc += `${key}=[${fieldVal}]`;
      } else if (key === 'syntax') {
        acc +=
          options.argument === undefined
            ? fieldVal
            : `${fieldVal}=${options.argument}`;
      } else {
        acc += `${key}=${fieldVal}`;
      }

      return `${acc},`;
    }, val.method);

    if (midRes[midRes.length - 1] === ',') {
      midRes = midRes.slice(0, midRes.length - 1);
    }

    valAcc += midRes;

    valAcc += valIndex + 1 === values.length ? '' : ';';

    return valAcc;
  }, '');
};

// exact match evaluator
const exactMatchEvaluator = async (userResponse, answers, checks) => {
  let score = 0;
  let maxScore = 0;
  let evaluation = [];
  try {
    const getAnswerCorrectMethods = answer => {
      if (answer.value && answer.value.length) {
        return answer.value.map(val => val.value);
      }
      return [];
    };

    /* eslint-disable */
    for (let answer of answers) {
      const corrects = getAnswerCorrectMethods(answer);
      let valid = false;
      for (let correct of corrects) {
        const data = {
          input: userResponse.replace(/\\ /g, ' '),
          expected: correct ? correct.replace(/\\ /g, ' ') : ':',
          checks
        };
        const { result } = await evaluate(data);
        if (result === 'true') {
          valid = true;
          break;
        }
      }
      if (valid) {
        score = Math.max(answer.score, score);
      }
      maxScore = Math.max(answer.score, maxScore);
      evaluation = [...evaluation, valid];
    }
  } catch (e) {
    console.log(e);
  } finally {
    return {
      score,
      maxScore,
      evaluation
    };
  }
};

const evaluator = async ({ userResponse, validation }) => {
  const {
    valid_response,
    alt_responses = [],
    scoring_type,
    min_score_if_attempted: attemptScore
  } = validation;
  const answers = [valid_response, ...alt_responses];

  let result;

  switch (scoring_type) {
    case ScoringType.EXACT_MATCH:
    default:
      const checks = getChecks(validation);
      result = await exactMatchEvaluator(userResponse, answers, checks);
  }

  // if score for attempting is greater than current score
  // let it be the score!
  if (!Number.isNaN(attemptScore) && attemptScore > result.score) {
    result.score = attemptScore;
  }

  return result;
};

export default evaluator;
