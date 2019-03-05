import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

import { SHOW, CHECK, CLEAR } from "../../constants/constantsForQuestions";

import MathInput from "../../components/MathInput";

import CorrectAnswerBox from "./components/CorrectAnswerBox";
import MathInputStatus from "./components/MathInputStatus";
import MathInputWrapper from "./styled/MathInputWrapper";
import StaticMath from "./StaticMath";

const MathFormulaPreview = ({
  item,
  studentTemplate,
  type: previewType,
  evaluation,
  saveAnswer,
  userAnswer,
  theme
}) => {
  const studentRef = useRef();
  const isStatic = studentTemplate.search(/\\MathQuillMathField\{(.*)\}/g) !== -1;

  const [latex, setLatex] = useState(studentTemplate);

  const onUserResponse = latexv => {
    setLatex(latexv);
    saveAnswer(isStatic ? studentRef.current.getLatex() : latexv);
  };

  const onBlur = () => {
    if (studentRef.current) {
      saveAnswer(studentRef.current.getLatex());
    }
  };

  const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const setUserResponse = () => {
    studentRef.current.setLatex(studentTemplate);
    if (!userAnswer) {
      setLatex(studentTemplate);
      return;
    }

    const regexTemplate = new RegExp(
      escapeRegExp(studentTemplate).replace(/\\\\MathQuillMathField\\\{\\\}/g, "(.*)"),
      "g"
    );
    const innerValues = regexTemplate.exec(userAnswer);
    for (let i = 1; i < innerValues.length; i++) {
      studentRef.current.setInnerFieldValue(innerValues[i], i - 1);
    }
  };

  useEffect(() => {
    if (previewType === CLEAR) {
      if (!isStatic) {
        setLatex(userAnswer || studentTemplate);
        return;
      }

      setUserResponse();
    }
  }, [studentTemplate, previewType]);

  useEffect(() => {
    setTimeout(() => {
      if (!isStatic) {
        setLatex(userAnswer || studentTemplate);
        return;
      }

      setUserResponse();
    }, 0);
  }, [studentTemplate]);

  let statusColor = theme.widgets.mathFormula.inputColor;
  if (previewType === SHOW || previewType === CHECK) {
    statusColor = evaluation
      ? evaluation[0]
        ? theme.widgets.mathFormula.inputCorrectColor
        : theme.widgets.mathFormula.inputIncorrectColor
      : theme.widgets.mathFormula.inputIncorrectColor;
  }
  return (
    <div>
      <div style={{ marginBottom: 15 }} dangerouslySetInnerHTML={{ __html: item.stimulus }} />

      <MathInputWrapper>
        {isStatic && (
          <StaticMath
            symbols={item.symbols}
            numberPad={item.numberPad}
            ref={studentRef}
            onInput={onUserResponse}
            onBlur={onBlur}
            style={{ background: statusColor }}
          />
        )}
        {!isStatic && (
          <MathInput
            symbols={item.symbols}
            numberPad={item.numberPad}
            value={latex}
            onInput={onUserResponse}
            onBlur={onBlur}
            disabled={evaluation && !evaluation[0]}
            style={{ background: statusColor }}
          />
        )}
        {(previewType === SHOW || previewType === CHECK) && <MathInputStatus valid={!!evaluation && !!evaluation[0]} />}
      </MathInputWrapper>

      {previewType === SHOW && item.validation.valid_response.value[0].value !== undefined && (
        <CorrectAnswerBox>{item.validation.valid_response.value[0].value}</CorrectAnswerBox>
      )}
    </div>
  );
};
MathFormulaPreview.propTypes = {
  item: PropTypes.object.isRequired,
  studentTemplate: PropTypes.string,
  type: PropTypes.string.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  evaluation: PropTypes.object.isRequired,
  userAnswer: PropTypes.any,
  theme: PropTypes.object.isRequired
};
MathFormulaPreview.defaultProps = {
  studentTemplate: "",
  userAnswer: null
};

export default withTheme(MathFormulaPreview);
