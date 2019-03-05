import React from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { InstructorStimulus } from "@edulastic/common";

import Matrix from "./Matrix";
import CheckAnswerButton from "../../../themes/common/CheckAnswerButton";

const Preview = ({ type, saveAnswer, userAnswer, item, smallSize, onCheckAnswer, feedbackAttempts }) => {
  const handleCheck = ({ columnIndex, rowIndex, checked }) => {
    const newAnswer = cloneDeep(userAnswer);

    let value = newAnswer.value[rowIndex];
    let findIndex;

    if (value) {
      findIndex = value.findIndex(i => i === columnIndex);
    }

    if (!checked && value) {
      value.splice(findIndex, 1);
    } else if (!value || !item.multiple_responses) {
      value = [];
      value.push(columnIndex);
    } else {
      value.push(columnIndex);
    }

    newAnswer.value[rowIndex] = value;

    saveAnswer(newAnswer);
  };

  return (
    <div>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>

      <div style={{ marginBottom: 20 }} dangerouslySetInnerHTML={{ __html: item.stimulus }} />
      <Matrix
        stems={item.stems}
        options={item.options}
        uiStyle={item.ui_style}
        response={userAnswer}
        isMultiple={item.multiple_responses}
        onCheck={handleCheck}
        validation={item.validation}
        type={type}
        smallSize={smallSize}
      />
      {item.instant_feedback && <CheckAnswerButton feedbackAttempts={feedbackAttempts} onCheck={onCheckAnswer} />}
    </div>
  );
};

Preview.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.object.isRequired,
  onCheckAnswer: PropTypes.func.isRequired,
  feedbackAttempts: PropTypes.number.isRequired,
  smallSize: PropTypes.bool
};

Preview.defaultProps = {
  smallSize: false
};

export default Preview;
