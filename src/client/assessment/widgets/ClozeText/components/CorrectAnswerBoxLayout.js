import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line max-len
const CorrectAnswerBoxLayout = ({ hasGroupResponses, fontSize, userAnswers, groupResponses }) => {
  let results;
  if (hasGroupResponses) {
    results = {};
    userAnswers.forEach(userAnswer => {
      if (results[userAnswer.group] === undefined) {
        results[userAnswer.group] = [];
      }
      results[userAnswer.group].push(userAnswer.data);
    });
  } else {
    results = userAnswers;
  }
  return (
    <div className="correctanswer-box" style={{ padding: 16, fontSize }}>
      <h2 style={{ fontSize: 20 }}>Correct Answer</h2>
      <div>
        {hasGroupResponses &&
          Object.keys(results).map((key, index) => (
            <div key={index}>
              <h3>{groupResponses[key] && groupResponses[key].title}</h3>
              {results[key].map((value, itemId) => (
                <div key={itemId} className="response-btn check-answer showanswer">
                  &nbsp;<span className="index">{index + 1}</span>
                  <span className="text">{value}</span>&nbsp;
                </div>
              ))}
            </div>
          ))}
        {!hasGroupResponses &&
          results.map((result, index) => (
            <div key={index} className="response-btn check-answer showanswer">
              &nbsp;<span className="index">{index + 1}</span>
              <span className="text">{result}</span>&nbsp;
            </div>
          ))}
      </div>
    </div>
  );
};

CorrectAnswerBoxLayout.propTypes = {
  hasGroupResponses: PropTypes.bool,
  fontSize: PropTypes.string,
  userAnswers: PropTypes.array,
  groupResponses: PropTypes.array
};

CorrectAnswerBoxLayout.defaultProps = {
  hasGroupResponses: false,
  groupResponses: [],
  fontSize: "13px",
  userAnswers: []
};

export default React.memo(CorrectAnswerBoxLayout);
