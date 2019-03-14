import { ShapeTypes } from "./constants/shapeTypes";
import CompareShapes from "./compareShapes";

const checkAnswer = (answer, userResponse, ignoreRepeatedShapes) => {
  const result = {
    commonResult: false,
    details: []
  };

  const trueAnswerValue = answer.value;
  const trueShapes = trueAnswerValue.filter(item => !item.subElement);

  const compareShapes = new CompareShapes(trueAnswerValue, userResponse);

  userResponse
    .filter(elem => !elem.subElement)
    .forEach(testShape => {
      let compareResult = {
        id: testShape.id,
        result: false
      };
      for (let i = 0; i < trueShapes.length; i++) {
        compareResult = compareShapes.compare(testShape.id, trueShapes[i].id);
        if (compareResult.result) {
          break;
        }
      }

      result.details.push(compareResult);
    });

  // if result contain error shapes
  if (result.details.findIndex(item => !item.result) > -1) {
    result.commonResult = false;
    return result;
  }

  // check that all shapes are resolved
  const relatedIds = [];
  result.details.forEach(item => {
    if (relatedIds.findIndex(id => id === item.relatedId) === -1) {
      relatedIds.push(item.relatedId);
    }
  });

  if (relatedIds.length < trueShapes.length) {
    result.commonResult = false;
    return result;
  }

  // compare by slope
  if (ignoreRepeatedShapes && ignoreRepeatedShapes === "yes") {
    result.commonResult = true;
    return result;
  }

  // compare by points
  if (ignoreRepeatedShapes && ignoreRepeatedShapes === "strict") {
    result.commonResult = true;

    for (let i = 0; i < relatedIds.length; i++) {
      const sameShapes = result.details.filter(item => item.relatedId === relatedIds[i]);
      const sameShapesType = userResponse.find(item => item.id === sameShapes[0].id).type;

      if (
        sameShapes.length > 1 &&
        sameShapesType !== ShapeTypes.POINT &&
        sameShapesType !== ShapeTypes.SEGMENT &&
        sameShapesType !== ShapeTypes.VECTOR &&
        sameShapesType !== ShapeTypes.POLYGON
      ) {
        const allowedSubElementsIds = userResponse.find(item => item.id === sameShapes[0].id).subElementsIds;
        for (let j = 1; j < sameShapes.length; j++) {
          const checkableShape = userResponse.find(item => item.id === sameShapes[j].id);
          switch (checkableShape.type) {
            case ShapeTypes.CIRCLE:
              if (checkableShape.subElementsIds.endPoint !== allowedSubElementsIds.endPoint) {
                sameShapes[j].result = false;
                result.commonResult = false;
              }
              break;

            case ShapeTypes.PARABOLA:
            case ShapeTypes.SINE:
            case ShapeTypes.LINE:
            case ShapeTypes.RAY:
            default:
              if (
                checkableShape.subElementsIds.startPoint !== allowedSubElementsIds.startPoint ||
                checkableShape.subElementsIds.endPoint !== allowedSubElementsIds.endPoint
              ) {
                sameShapes[j].result = false;
                result.commonResult = false;
              }
          }
        }
      }
    }

    return result;
  }

  // compare by default
  result.commonResult = true;
  for (let i = 0; i < relatedIds.length; i++) {
    const sameShapes = result.details.filter(item => item.relatedId === relatedIds[i]);
    if (sameShapes.length > 1) {
      for (let j = 1; j < sameShapes.length; j++) {
        sameShapes[j].result = false;
        result.commonResult = false;
      }
    }
  }

  return result;
};

const evaluator = ({ userResponse, validation }) => {
  const { valid_response, alt_responses, ignore_repeated_shapes } = validation;

  let score = 0;
  let maxScore = 1;

  const evaluation = {};

  let answers = [valid_response];
  if (alt_responses) {
    answers = answers.concat([...alt_responses]);
  }

  let result = {};

  answers.forEach((answer, index) => {
    result = checkAnswer(answer, userResponse, ignore_repeated_shapes);
    if (result.commonResult) {
      score = Math.max(answer.score, score);
    }
    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = result;
  });

  return {
    score,
    maxScore,
    evaluation
  };
};

export default evaluator;
