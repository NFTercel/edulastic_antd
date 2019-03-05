import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { Paper, Stimulus, CorrectAnswersContainer, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { CHECK, SHOW, PREVIEW, CLEAR, CONTAINS } from "../../constants/constantsForQuestions";

import { SmallContainer } from "./styled/SmallContainer";
import { SmallStim } from "./styled/SmallStim";

const ShortTextPreview = ({ view, saveAnswer, t, item, previewTab, smallSize, userAnswer, theme }) => {
  const [text, setText] = useState(Array.isArray(userAnswer) ? "" : userAnswer);

  useEffect(() => {
    if (Array.isArray(userAnswer)) {
      setText("");
    }
  });

  const handleTextChange = e => {
    const val = e.target.value;
    setText(val);
    saveAnswer(val);
  };

  const validate = () => {
    let flag = false;

    if (item.validation.valid_response.value === text) {
      return true;
    }

    if (
      item.validation.valid_response.matching_rule === CONTAINS &&
      text &&
      text.toLowerCase().includes(item.validation.valid_response.value.toLowerCase())
    ) {
      return true;
    }

    item.validation.alt_responses.forEach(ite => {
      if (ite.value === text) {
        flag = true;
      }

      if (ite.matching_rule === CONTAINS && text && text.toLowerCase().includes(ite.value.toLowerCase())) {
        flag = true;
      }
    });

    return flag;
  };

  const preview = previewTab === CHECK || previewTab === SHOW;

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      {view === PREVIEW && !smallSize && <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />}

      {smallSize && (
        <SmallContainer>
          <SmallStim bold>{t("component.shortText.smallSizeTitle")}</SmallStim>

          <SmallStim>{t("component.shortText.smallSizePar")}</SmallStim>
        </SmallContainer>
      )}

      <Input
        style={
          preview
            ? validate()
              ? { background: theme.widgets.shortText.correctInputBgColor }
              : { background: theme.widgets.shortText.incorrectInputBgColor }
            : {}
        }
        value={text}
        onChange={handleTextChange}
        size="large"
      />

      {previewTab === SHOW && (
        <CorrectAnswersContainer title={t("component.shortText.correctAnswers")}>
          {item.validation.valid_response.value}
        </CorrectAnswersContainer>
      )}
    </Paper>
  );
};

ShortTextPreview.propTypes = {
  previewTab: PropTypes.string,
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any.isRequired,
  theme: PropTypes.object.isRequired
};

ShortTextPreview.defaultProps = {
  previewTab: CLEAR,
  smallSize: false
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(ShortTextPreview);
