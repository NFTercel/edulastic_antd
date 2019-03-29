import React, { Fragment, useState, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import produce from "immer";
import { arrayMove } from "react-sortable-hoc";
import { withRouter } from "react-router-dom";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { replaceVariables, updateVariables } from "../../utils/variables";

import withAddButton from "../../components/HOC/withAddButton";
import QuestionTextArea from "../../components/QuestionTextArea";
import QuillSortableList from "../../components/QuillSortableList";
import { Subtitle } from "../../styled/Subtitle";

import Options from "./components/Options";
import Answers from "./Answers";
import Preview from "./components/Preview";
import { checkAnswerAction } from "../../../author/src/actions/testItem";

const EmptyWrapper = styled.div``;
const List = withAddButton(QuillSortableList);

const MatrixChoice = ({
  view,
  testItem,
  previewTab,
  item,
  setQuestionData,
  saveAnswer,
  userAnswer,
  smallSize,
  checkAnswer,
  t
}) => {
  const [feedbackAttempts, setFeedbackAttempts] = useState(item.feedback_attempts);
  const Wrapper = testItem ? EmptyWrapper : Paper;

  const handleSortEndStems = ({ oldIndex, newIndex }) => {
    setQuestionData(
      produce(item, draft => {
        draft.stems = arrayMove(item.stems, oldIndex, newIndex);
      })
    );
  };

  const handleRemoveStem = index => {
    setQuestionData(
      produce(item, draft => {
        draft.stems.splice(index, 1);
      })
    );
  };

  const handleAddStem = () => {
    setQuestionData(
      produce(item, draft => {
        draft.stems.push("");
      })
    );
  };

  const handleChangeStem = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.stems[index] = value;
        updateVariables(draft);
      })
    );
  };

  const handleChangeOption = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.options[index] = value;
        updateVariables(draft);
      })
    );
  };

  const reduceResponseValue = (val, index) => {
    if (!val) return val;

    val = val.filter(i => i !== index);
    if (!val.length) {
      return null;
    }

    return val;
  };

  const handleRemoveOption = index => {
    setQuestionData(
      produce(item, draft => {
        draft.options.splice(index, 1);
        draft.validation.valid_response.value = draft.validation.valid_response.value.map(val =>
          reduceResponseValue(val, index)
        );

        if (draft.validation.alt_responses && draft.validation.alt_responses.length) {
          draft.validation.alt_responses.map(res => {
            res.value = res.value.map(val => reduceResponseValue(val, index));
            return res;
          });
        }
        updateVariables(draft);
      })
    );
  };

  const handleAddOption = () => {
    setQuestionData(
      produce(item, draft => {
        draft.options.push("");
      })
    );
  };
  const handleSortEndOptions = ({ oldIndex, newIndex }) => {
    setQuestionData(
      produce(item, draft => {
        draft.options = arrayMove(item.options, oldIndex, newIndex);
      })
    );
  };
  const handleItemChangeChange = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;
        updateVariables(draft);
      })
    );
  };

  let answer = userAnswer;

  if (!userAnswer) {
    answer = {
      value: item.stems.map(() => null)
    };
  } else if (Array.isArray(userAnswer)) {
    answer = {
      value: userAnswer
    };
  }

  const _checkAnswer = () => {
    if (!userAnswer || (Array.isArray(userAnswer) && !userAnswer.length)) {
      return;
    }

    setFeedbackAttempts(feedbackAttempts - 1);
    checkAnswer();
  };

  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  return (
    <Fragment>
      {view === "edit" && (
        <Fragment>
          <Paper style={{ marginBottom: 30 }}>
            <QuestionTextArea
              placeholder={t("component.matrix.enterQuestion")}
              onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
              value={item.stimulus}
            />
            <Subtitle>{t("component.matrix.multipleChoiceOptions")}</Subtitle>
            <List
              items={item.stems}
              onSortEnd={handleSortEndStems}
              useDragHandle
              onRemove={handleRemoveStem}
              onChange={handleChangeStem}
              onAdd={handleAddStem}
              columns={2}
              prefix="list1"
            />
            <Subtitle>{t("component.matrix.steams")}</Subtitle>
            <List
              items={item.options}
              onSortEnd={handleSortEndOptions}
              useDragHandle
              onRemove={handleRemoveOption}
              onChange={handleChangeOption}
              onAdd={handleAddOption}
              columns={2}
              prefix="list2"
            />
            <Answers item={item} setQuestionData={setQuestionData} />
          </Paper>
          <Options onChange={handleItemChangeChange} uiStyle={item.ui_style} />
        </Fragment>
      )}
      {view === "preview" && (
        <Wrapper>
          {previewTab === "check" && (
            <Preview
              type="check"
              saveAnswer={saveAnswer}
              userAnswer={answer}
              item={itemForPreview}
              feedbackAttempts={feedbackAttempts}
              onCheckAnswer={_checkAnswer}
            />
          )}

          {previewTab === "show" && (
            <Preview
              type="show"
              saveAnswer={saveAnswer}
              userAnswer={answer}
              item={itemForPreview}
              feedbackAttempts={feedbackAttempts}
              onCheckAnswer={_checkAnswer}
            />
          )}

          {previewTab === "clear" && (
            <Preview
              smallSize={smallSize}
              type="clear"
              saveAnswer={saveAnswer}
              userAnswer={answer}
              item={itemForPreview}
              feedbackAttempts={feedbackAttempts}
              onCheckAnswer={_checkAnswer}
            />
          )}
        </Wrapper>
      )}
    </Fragment>
  );
};

MatrixChoice.propTypes = {
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  checkAnswer: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  previewTab: PropTypes.string,
  testItem: PropTypes.bool,
  item: PropTypes.object,
  t: PropTypes.func.isRequired
};

MatrixChoice.defaultProps = {
  previewTab: "clear",
  testItem: false,
  item: {},
  userAnswer: null,
  smallSize: false
};

const enhance = compose(
  withRouter,
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction,
      checkAnswer: checkAnswerAction
    }
  )
);

const MatrixChoiceContainer = enhance(MatrixChoice);

export { MatrixChoiceContainer as MatrixChoice };
