import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import produce from "immer";

import { MathInput, Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { checkAnswerAction } from "../../../author/src/actions/testItem";
import { replaceVariables, updateVariables } from "../../utils/variables";

import QuestionTextArea from "../../components/QuestionTextArea";
import { Subtitle } from "../../styled/Subtitle";

import { CLEAR, PREVIEW, EDIT } from "../../constants/constantsForQuestions";

import MathFormulaAnswers from "./MathFormulaAnswers";
import MathFormulaOptions from "./components/MathFormulaOptions";
import MathFormulaPreview from "./MathFormulaPreview";

const EmptyWrapper = styled.div``;

const MathFormula = ({
  view,
  testItem,
  previewTab,
  item,
  evaluation,
  setQuestionData,
  saveAnswer,
  smallSize,
  userAnswer,
  t
}) => {
  const Wrapper = testItem ? EmptyWrapper : Paper;
  const studentTemplate = item.template.replace(/\\embed\{response\}/g, "\\MathQuillMathField{}");

  const handleItemChangeChange = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;
        updateVariables(draft);
      })
    );
  };

  const handleUpdateTemplate = val => {
    setQuestionData(
      produce(item, draft => {
        draft.template = val;
        updateVariables(draft);
      })
    );
  };

  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === EDIT && (
        <Fragment>
          <Paper style={{ marginBottom: 30 }}>
            <Subtitle>{t("component.math.composeQuestion")}</Subtitle>
            <QuestionTextArea
              placeholder={t("component.math.enterQuestion")}
              onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
              value={item.stimulus}
            />
            <Subtitle data-cy="template-container">{t("component.math.template")}</Subtitle>
            <MathInput
              showResponse
              symbols={item.symbols}
              numberPad={item.numberPad}
              value={item.template}
              onInput={latex => {
                handleUpdateTemplate(latex);
              }}
            />
            <MathFormulaAnswers item={item} setQuestionData={setQuestionData} />
          </Paper>
          <MathFormulaOptions
            onChange={handleItemChangeChange}
            uiStyle={item.ui_style}
            item={item}
            responseContainers={item.response_containers}
            textBlocks={item.text_blocks}
            stimulusReview={item.stimulus_review}
            instructorStimulus={item.instructor_stimulus}
            metadata={item.metadata}
          />
        </Fragment>
      )}
      {view === PREVIEW && (
        <Wrapper style={{ height: "100%", overflow: "visible" }}>
          <MathFormulaPreview
            type={previewTab}
            studentTemplate={studentTemplate}
            item={itemForPreview}
            saveAnswer={saveAnswer}
            evaluation={evaluation}
            smallSize={smallSize}
            userAnswer={userAnswer}
          />
        </Wrapper>
      )}
    </Fragment>
  );
};

MathFormula.propTypes = {
  view: PropTypes.string.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  previewTab: PropTypes.string,
  testItem: PropTypes.bool,
  item: PropTypes.object,
  evaluation: PropTypes.any.isRequired,
  userAnswer: PropTypes.any,
  smallSize: PropTypes.bool,
  t: PropTypes.func.isRequired
};

MathFormula.defaultProps = {
  previewTab: CLEAR,
  testItem: false,
  item: {},
  userAnswer: null,
  smallSize: false
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction,
      checkAnswer: checkAnswerAction
    }
  )
);

const MathFormulaContainer = enhance(MathFormula);

export { MathFormulaContainer as MathFormula };
