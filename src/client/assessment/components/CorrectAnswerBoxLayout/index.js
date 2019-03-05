import React from "react";
import PropTypes from "prop-types";

import { withNamespaces } from "@edulastic/localization";

import { StyledCorrectAnswerbox } from "./styled/StyledCorrectAnswerbox";
import { CorrectAnswerTitle } from "./styled/CorrectAnswerTitle";

const CorrectAnswerBoxLayout = ({ hasGroupResponses, fontSize, userAnswers, groupResponses, t }) => {
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
    <StyledCorrectAnswerbox fontSize={fontSize}>
      <CorrectAnswerTitle>{t("component.cloze.correctAnswer")}</CorrectAnswerTitle>
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
    </StyledCorrectAnswerbox>
  );
};

CorrectAnswerBoxLayout.propTypes = {
  hasGroupResponses: PropTypes.bool,
  fontSize: PropTypes.string,
  userAnswers: PropTypes.array,
  groupResponses: PropTypes.array,
  t: PropTypes.func.isRequired
};

CorrectAnswerBoxLayout.defaultProps = {
  hasGroupResponses: false,
  groupResponses: [],
  fontSize: "13px",
  userAnswers: []
};

export default React.memo(withNamespaces("assessment")(CorrectAnswerBoxLayout));
