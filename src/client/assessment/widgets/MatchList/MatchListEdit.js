import React, { Fragment, useState } from "react";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import PropTypes from "prop-types";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import withAddButton from "../../components/HOC/withAddButton";
import withPoints from "../../components/HOC/withPoints";
import QuillSortableList from "../../components/QuillSortableList";
import QuestionTextArea from "../../components/QuestionTextArea";
import CorrectAnswers from "../../components/CorrectAnswers";
import { Subtitle } from "../../styled/Subtitle";

import { EDIT } from "../../constants/constantsForQuestions";

import GroupPossibleResponses from "./components/GroupPossibleResponses";
import MatchListPreview from "./MatchListPreview";
import AdvancedOptions from "../SortList/components/AdvancedOptions";

const OptionsList = withPoints(MatchListPreview);

const List = withAddButton(QuillSortableList);

const MatchListEdit = ({ item, setQuestionData, t }) => {
  const [correctTab, setCorrectTab] = useState(0);

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleAdd = () => {
    const newItem = cloneDeep(item);

    newItem.list.push("");

    newItem.validation.valid_response.value.push("");
    newItem.validation.alt_responses.forEach(ite => {
      ite.value.push("");
    });

    setQuestionData(newItem);
  };

  const handleAddResp = () => {
    const newItem = cloneDeep(item);

    newItem.possible_responses.push("");

    setQuestionData(newItem);
  };

  const handleRemove = index => {
    const newItem = cloneDeep(item);

    newItem.list.splice(index, 1);

    setQuestionData(newItem);
  };

  const handleRemoveResp = index => {
    const newItem = cloneDeep(item);

    const spliceRes = newItem.possible_responses.splice(index, 1);

    newItem.validation.valid_response.value.splice(newItem.validation.valid_response.value.indexOf(spliceRes), 1);

    newItem.validation.alt_responses.forEach(ite => {
      ite.value.splice(ite.value.indexOf(spliceRes), 1);
    });

    setQuestionData(newItem);
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);

    newItem.list = arrayMove(item.list, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  const handleSortEndResp = ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);

    newItem.possible_responses = arrayMove(item.possible_responses, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  const handleChange = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.list[index] = value;
    setQuestionData(newItem);
  };

  const handleChangeResp = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.validation.valid_response.value[
      newItem.validation.valid_response.value.indexOf(newItem.possible_responses[index])
    ] = value;
    newItem.validation.alt_responses.forEach(ite => {
      ite.value[ite.value.indexOf(newItem.possible_responses[index])] = value;
    });

    newItem.possible_responses[index] = value;

    setQuestionData(newItem);
  };

  const handleAddAnswer = () => {
    const newItem = cloneDeep(item);

    if (!newItem.validation.alt_responses) {
      newItem.validation.alt_responses = [];
    }
    newItem.validation.alt_responses.push({
      score: 1,
      value: Array.from({
        length: item.validation.valid_response.value.length
      }).fill(null)
    });

    setQuestionData(newItem);
    setCorrectTab(correctTab + 1);
  };

  const handleCloseTab = tabIndex => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses.splice(tabIndex, 1);

    setCorrectTab(0);
    setQuestionData(newItem);
  };

  const handlePointsChange = val => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.score = val;
    } else {
      newItem.validation.alt_responses[correctTab - 1].score = val;
    }

    setQuestionData(newItem);
  };

  const handleAnswerChange = ans => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.value = ans;
    } else {
      newItem.validation.alt_responses[correctTab - 1].value = ans;
    }

    setQuestionData(newItem);
  };

  const onGroupPossibleResp = e => {
    const newItem = cloneDeep(item);

    newItem.group_possible_responses = e.target.checked;

    setQuestionData(newItem);
  };

  const onGroupTitleChange = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].title = value;

    setQuestionData(newItem);
  };

  const renderOptions = () => (
    <OptionsList
      item={item}
      points={
        correctTab === 0 ? item.validation.valid_response.score : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handlePointsChange}
      saveAnswer={handleAnswerChange}
      editCorrectAnswers={
        correctTab === 0 ? item.validation.valid_response.value : item.validation.alt_responses[correctTab - 1].value
      }
      view={EDIT}
    />
  );

  const onAddInner = index => () => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].responses.push("");

    setQuestionData(newItem);
  };

  const onRemoveInner = ind => index => {
    const newItem = cloneDeep(item);

    newItem.validation.valid_response.value = Array.from({
      length: item.validation.valid_response.value.length
    }).fill(null);

    newItem.validation.alt_responses.forEach(ite => {
      ite.value = Array.from({
        length: item.validation.valid_response.value.length
      }).fill(null);
    });

    newItem.possible_response_groups[ind].responses.splice(index, 1);

    setQuestionData(newItem);
  };

  const handleGroupAdd = () => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups.push({ title: "", responses: [] });

    setQuestionData(newItem);
  };

  const handleGroupRemove = index => () => {
    const newItem = cloneDeep(item);

    newItem.validation.valid_response.value = Array.from({
      length: item.validation.valid_response.value.length
    }).fill(null);

    newItem.validation.alt_responses.forEach(ite => {
      ite.value = Array.from({
        length: item.validation.valid_response.value.length
      }).fill(null);
    });

    newItem.possible_response_groups.splice(index, 1);

    setQuestionData(newItem);
  };

  const handleGroupSortEnd = index => ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].responses = arrayMove(
      newItem.possible_response_groups[index].responses,
      oldIndex,
      newIndex
    );

    setQuestionData(newItem);
  };

  const handleUiStyleChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem.ui_style[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleGroupChange = ind => (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[ind].responses[index] = value;

    setQuestionData(newItem);
  };

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.matchList.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.matchList.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />
        <Subtitle>{t("component.matchList.list")}</Subtitle>
        <List
          buttonText={t("component.matchList.addNew")}
          items={item.list}
          onAdd={handleAdd}
          firstFocus={item.firstMount}
          onSortEnd={handleSortEnd}
          onChange={handleChange}
          onRemove={handleRemove}
          useDragHandle
          columns={1}
        />

        <GroupPossibleResponses
          checkboxChange={onGroupPossibleResp}
          checkboxVal={item.group_possible_responses}
          items={item.group_possible_responses ? item.possible_response_groups : item.possible_responses}
          firstFocus={item.firstMount}
          onAddInner={onAddInner}
          onTitleChange={onGroupTitleChange}
          onAdd={item.group_possible_responses ? handleGroupAdd : handleAddResp}
          onSortEnd={item.group_possible_responses ? handleGroupSortEnd : handleSortEndResp}
          onChange={item.group_possible_responses ? handleGroupChange : handleChangeResp}
          onRemoveInner={onRemoveInner}
          onRemove={item.group_possible_responses ? handleGroupRemove : handleRemoveResp}
        />

        <CorrectAnswers
          onTabChange={setCorrectTab}
          correctTab={correctTab}
          onAdd={handleAddAnswer}
          validation={item.validation}
          options={renderOptions()}
          onCloseTab={handleCloseTab}
        />
      </Paper>
      <AdvancedOptions onUiChange={handleUiStyleChange} />
    </Fragment>
  );
};

MatchListEdit.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(
  connect(
    null,
    { setQuestionData: setQuestionDataAction }
  )(MatchListEdit)
);
