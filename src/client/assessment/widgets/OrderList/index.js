import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import { cloneDeep, get } from "lodash";
import styled from "styled-components";

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

const EmptyWrapper = styled.div``;

const List = withAddButton(QuillSortableList);
const OptionsList = withPoints(QuillSortableList);

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctTab: 0
    };
  }

  componentDidUpdate() {
    const { item, saveAnswer, userAnswer } = this.props;

    if (userAnswer.length === 0) {
      saveAnswer(item.list.map((q, i) => i));
    }
  }

  render() {
    const {
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
    } = this.props;
    const { correctTab } = this.state;

    const fontSize = getFontSize(get(item, "ui_style.fontsize", "normal"));
    const styleType = get(item, "ui_style.type", "list");
    const axis = styleType === "inline" ? "x" : "y";
    const columns = styleType === "inline" ? 3 : 1;

    const handleQuestionChange = value => {
      setQuestionData({ ...item, stimulus: value });
    };

    const onSortOrderListEnd = ({ oldIndex, newIndex }) => {
      const newData = cloneDeep(item);

      newData.list = arrayMove(newData.list, oldIndex, newIndex);

      setQuestionData(newData);
    };

    const handleQuestionsChange = (value, index) => {
      const newData = cloneDeep(item);

      newData.list[value] = index;

      setQuestionData(newData);
    };

    const handleDeleteQuestion = index => {
      const newItem = cloneDeep(item);

      newItem.list = newItem.list.filter((q, i) => i !== index);

      const indexList = newItem.list.map((val, i) => i);

      newItem.validation.valid_response.value = indexList;

      newItem.validation.alt_responses = newItem.validation.alt_responses.map(res => {
        res.value = indexList;
        return res;
      });

      saveAnswer(indexList);
      setQuestionData(newItem);
    };

    const handleAddQuestion = () => {
      const newItem = cloneDeep(item);

      newItem.list = [...item.list, ""];
      newItem.validation.valid_response.value = [
        ...newItem.validation.valid_response.value,
        newItem.validation.valid_response.value.length
      ];

      if (newItem.validation.alt_responses.length) {
        newItem.validation.alt_responses = newItem.validation.alt_responses.map(res => {
          res.value.push(res.value.length);
          return res;
        });
      }

      saveAnswer(newItem.list.map((q, i) => i));
      setQuestionData(newItem);
    };

    const handleCorrectSortEnd = ({ oldIndex, newIndex }) => {
      const newItem = cloneDeep(item);

      if (correctTab === 0) {
        newItem.validation.valid_response.value = arrayMove(
          newItem.validation.valid_response.value,
          oldIndex,
          newIndex
        );
      } else {
        newItem.validation.alt_responses[correctTab - 1].value = arrayMove(
          newItem.validation.alt_responses[correctTab - 1].value,
          oldIndex,
          newIndex
        );
      }

      setQuestionData(newItem);
    };

    const onSortPreviewEnd = ({ oldIndex, newIndex }) => {
      const newPreviewList = arrayMove(userAnswer, oldIndex, newIndex);

      saveAnswer(newPreviewList);
    };

    const handleAddAltResponse = () => {
      const newItem = cloneDeep(item);

      newItem.validation.alt_responses.push({
        score: 1,
        value: newItem.list.map((q, i) => i)
      });

      this.setState({
        correctTab: correctTab + 1
      });
      setQuestionData(newItem);
    };

    const handleDeleteAltAnswers = index => {
      const newItem = cloneDeep(item);

      newItem.validation.alt_responses.splice(index, 1);

      this.setState({
        correctTab: 0
      });
      setQuestionData(newItem);
    };

    const handleUpdatePoints = points => {
      const newItem = cloneDeep(item);

      if (correctTab === 0) {
        newItem.validation.valid_response.score = points;
      } else {
        newItem.validation.alt_responses[correctTab - 1].score = points;
      }

      setQuestionData(newItem);
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
      this.setState({
        correctTab: index
      });
    };

    if (!item) return null;

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
            <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
            <QuestionHeader qIndex={qIndex} smallSize={smallSize} dangerouslySetInnerHTML={{ __html: item.stimulus }} />

            {previewTab === CHECK && (
              <OrderListReport
                onSortEnd={onSortPreviewEnd}
                questionsList={item.list}
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
                questionsList={item.list}
                previewIndexesList={userAnswer}
                showAnswers
                evaluation={evaluation}
                validation={item.validation}
                list={item.list}
                listStyle={{ fontSize }}
                axis={axis}
                columns={columns}
              />
            )}

            {previewTab === CLEAR && (
              <OrderListPreview
                onSortEnd={onSortPreviewEnd}
                questions={userAnswer.map(index => item.list[index])}
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
  }
}

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
