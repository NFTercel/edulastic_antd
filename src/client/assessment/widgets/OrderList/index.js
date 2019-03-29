import React, { Fragment, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { cloneDeep, get } from "lodash";
import styled from "styled-components";
import produce from "immer";

import { withNamespaces } from "@edulastic/localization";
import { Paper, InstructorStimulus } from "@edulastic/common";

import CorrectAnswers from "../../components/CorrectAnswers";
import QuestionTextArea from "../../components/QuestionTextArea";
import QuillSortableList from "../../components/QuillSortableList";
import { Subtitle } from "../../styled/Subtitle";
import { QuestionHeader } from "../../styled/QuestionHeader";

import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { EDIT, PREVIEW, CHECK, SHOW, CLEAR } from "../../constants/constantsForQuestions";
import withAddButton from "../../components/HOC/withAddButton";
import withPoints from "../../components/HOC/withPoints";
import OrderListPreview from "./components/OrderListPreview";
import OrderListReport from "./components/OrderListReport";
import Options from "./components/Options";
import { getFontSize } from "../../utils/helpers";
import { replaceVariables, updateVariables } from "../../utils/variables";

const EmptyWrapper = styled.div``;

const List = withAddButton(QuillSortableList);
const OptionsList = withPoints(QuillSortableList);

const OrderList = ({
  qIndex,
  view,
  previewTab,
  smallSize,
  item,
  userAnswer,
  testItem,
  evaluation,
  t,
  setQuestionData,
  saveAnswer
}) => {
  const [correctTab, setCorrectTab] = useState(0);
  useEffect(() => {
    if (userAnswer.length === 0) {
      saveAnswer(item.list.map((q, i) => i));
    }
  }, [item, userAnswer]);

  const fontSize = getFontSize(get(item, "ui_style.fontsize", "normal"));
  const styleType = get(item, "ui_style.type", "list");
  const axis = styleType === "inline" ? "x" : "y";
  const columns = styleType === "inline" ? 3 : 1;

  const handleQuestionChange = value => {
    const newData = cloneDeep(item);
    newData.stimulus = value;
    updateVariables(newData);
    setQuestionData(newData);
  };

  const onSortOrderListEnd = ({ oldIndex, newIndex }) => {
    const newData = cloneDeep(item);

    newData.list = arrayMove(newData.list, oldIndex, newIndex);

    setQuestionData(newData);
  };

  const handleQuestionsChange = (value, index) => {
    const newData = cloneDeep(item);

    newData.list[value] = index;
    updateVariables(newData);
    setQuestionData(newData);
  };

  const handleDeleteQuestion = index => {
    setQuestionData(
      produce(item, draft => {
        draft.list = draft.list.filter((q, i) => i !== index);

        const indexList = draft.list.map((val, i) => i);

        draft.validation.valid_response.value = indexList;

        draft.validation.alt_responses = draft.validation.alt_responses.map(res => {
          res.value = indexList;
          return res;
        });

        saveAnswer(indexList);
        updateVariables(draft);
      })
    );
  };

  const handleAddQuestion = () => {
    setQuestionData(
      produce(item, draft => {
        draft.list = [...item.list, ""];
        draft.validation.valid_response.value = [
          ...draft.validation.valid_response.value,
          draft.validation.valid_response.value.length
        ];

        if (draft.validation.alt_responses.length) {
          draft.validation.alt_responses = draft.validation.alt_responses.map(res => {
            res.value.push(res.value.length);
            return res;
          });
        }

        saveAnswer(draft.list.map((q, i) => i));
      })
    );
  };

  const handleCorrectSortEnd = ({ oldIndex, newIndex }) => {
    setQuestionData(
      produce(item, draft => {
        if (correctTab === 0) {
          draft.validation.valid_response.value = arrayMove(draft.validation.valid_response.value, oldIndex, newIndex);
        } else {
          draft.validation.alt_responses[correctTab - 1].value = arrayMove(
            draft.validation.alt_responses[correctTab - 1].value,
            oldIndex,
            newIndex
          );
        }
      })
    );
  };

  const onSortPreviewEnd = ({ oldIndex, newIndex }) => {
    const newPreviewList = arrayMove(userAnswer, oldIndex, newIndex);

    saveAnswer(newPreviewList);
  };

  const handleAddAltResponse = () => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.alt_responses.push({
          score: 1,
          value: draft.list.map((q, i) => i)
        });

        setCorrectTab(correctTab + 1);
      })
    );
  };

  const handleDeleteAltAnswers = index => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.alt_responses.splice(index, 1);

        setCorrectTab(0);
        updateVariables(draft);
      })
    );
  };

  const handleUpdatePoints = points => {
    setQuestionData(
      produce(item, draft => {
        if (correctTab === 0) {
          draft.validation.valid_response.score = points;
        } else {
          draft.validation.alt_responses[correctTab - 1].score = points;
        }
        updateVariables(draft);
      })
    );
  };

  const renderOptions = () => (
    <OptionsList
      fontSize={fontSize}
      axis={axis}
      data-cy="match-option-list"
      prefix="options2"
      readOnly
      items={
        correctTab === 0
          ? item.validation.valid_response.value.map(ind => item.list[ind])
          : item.validation.alt_responses[correctTab - 1].value.map(ind => item.list[ind])
      }
      onSortEnd={handleCorrectSortEnd}
      useDragHandle
      columns={columns}
      points={
        correctTab === 0 ? item.validation.valid_response.score : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handleUpdatePoints}
    />
  );

  const onTabChange = (index = 0) => {
    setCorrectTab(index);
  };

  if (!item) return null;

  const itemForPreview = useMemo(() => replaceVariables(item), [item]);

  const Wrapper = testItem ? EmptyWrapper : Paper;
  return (
    <Fragment>
      {view === EDIT && (
        <Fragment>
          <Paper>
            <Subtitle>{t("component.orderlist.composeQuestion")}</Subtitle>

            <QuestionTextArea onChange={handleQuestionChange} value={item.stimulus} style={{ marginBottom: 30 }} />
            <Subtitle data-cy="list-container">{t("component.orderlist.list")}</Subtitle>
            <List
              fontSize={fontSize}
              onAdd={handleAddQuestion}
              items={item.list}
              onSortEnd={onSortOrderListEnd}
              useDragHandle
              onRemove={handleDeleteQuestion}
              onChange={handleQuestionsChange}
            />

            <CorrectAnswers
              onTabChange={onTabChange}
              correctTab={correctTab}
              onAdd={handleAddAltResponse}
              validation={item.validation}
              options={renderOptions()}
              onCloseTab={handleDeleteAltAnswers}
            />
          </Paper>
          <Options />
        </Fragment>
      )}
      {view === PREVIEW && (
        <Wrapper>
          <InstructorStimulus>{itemForPreview.instructor_stimulus}</InstructorStimulus>
          <QuestionHeader
            qIndex={qIndex}
            smallSize={smallSize}
            dangerouslySetInnerHTML={{ __html: itemForPreview.stimulus }}
          />

          {previewTab === CHECK && (
            <OrderListReport
              onSortEnd={onSortPreviewEnd}
              questionsList={itemForPreview.list}
              previewIndexesList={userAnswer}
              evaluation={evaluation}
              listStyle={{ fontSize }}
              axis={axis}
              columns={columns}
            />
          )}

          {previewTab === SHOW && (
            <OrderListReport
              onSortEnd={onSortPreviewEnd}
              questionsList={itemForPreview.list}
              previewIndexesList={userAnswer}
              showAnswers
              evaluation={evaluation}
              validation={itemForPreview.validation}
              list={itemForPreview.list}
              listStyle={{ fontSize }}
              axis={axis}
              columns={columns}
            />
          )}

          {previewTab === CLEAR && (
            <OrderListPreview
              onSortEnd={onSortPreviewEnd}
              questions={userAnswer.map(index => itemForPreview.list[index])}
              smallSize={smallSize}
              listStyle={{ fontSize }}
              axis={axis}
              columns={columns}
            />
          )}
        </Wrapper>
      )}
    </Fragment>
  );
};

OrderList.propTypes = {
  view: PropTypes.string.isRequired,
  previewTab: PropTypes.string,
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object,
  setQuestionData: PropTypes.func.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.any,
  testItem: PropTypes.bool,
  qIndex: PropTypes.any.isRequired,
  evaluation: PropTypes.any
};

OrderList.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  item: {},
  userAnswer: [],
  testItem: false,
  evaluation: ""
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

const OrderListContainer = enhance(OrderList);

export { OrderListContainer as OrderList };
