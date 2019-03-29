import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { arrayMove } from "react-sortable-hoc";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import withAddButton from "../../components/HOC/withAddButton";
import withPoints from "../../components/HOC/withPoints";
import QuestionTextArea from "../../components/QuestionTextArea";
import QuillSortableList from "../../components/QuillSortableList/index";
import CorrectAnswers from "../../components/CorrectAnswers";
import { Subtitle } from "../../styled/Subtitle";

import AdvancedOptions from "./components/AdvancedOptions";

const List = withAddButton(QuillSortableList);

const OptionsList = withPoints(QuillSortableList);

const EditSortList = ({ item, setQuestionData, t }) => {
  const [correctTab, setCorrectTab] = useState(0);

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleUiStyleChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem.ui_style[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleAdd = () => {
    const newItem = cloneDeep(item);

    newItem.source.push("");
    newItem.validation.valid_response.value.push(newItem.source.length - 1);
    newItem.validation.alt_responses.forEach(ite => {
      ite.value.push(newItem.source.length - 1);
    });

    setQuestionData(newItem);
  };

  const handleRemove = index => {
    const newItem = cloneDeep(item);
    newItem.source.splice(index, 1);
    newItem.validation.valid_response.value.splice(
      newItem.validation.valid_response.value.indexOf(newItem.source.length),
      1
    );
    newItem.validation.alt_responses.forEach(ite => {
      ite.value.splice(ite.value.indexOf(newItem.source.length), 1);
    });

    setQuestionData(newItem);
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);

    newItem.source = arrayMove(item.source, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  const handleChange = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.source[index] = value;
    setQuestionData(newItem);
  };

  const handleAddAnswer = () => {
    const newItem = cloneDeep(item);

    if (!newItem.validation.alt_responses) {
      newItem.validation.alt_responses = [];
    }
    newItem.validation.alt_responses.push({
      score: 1,
      value: item.validation.valid_response.value
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

  const handleCorrectSortEnd = ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);
    if (correctTab === 0) {
      newItem.validation.valid_response.value = arrayMove(newItem.validation.valid_response.value, oldIndex, newIndex);
    } else {
      newItem.validation.alt_responses[correctTab - 1].value = arrayMove(
        newItem.validation.alt_responses[correctTab - 1].value,
        oldIndex,
        newIndex
      );
    }

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

  const renderOptions = () => (
    <OptionsList
      prefix="options"
      readOnly
      items={
        correctTab === 0
          ? item.validation.valid_response.value.map(ind => item.source[ind])
          : item.validation.alt_responses[correctTab - 1].value.map(ind => item.source[ind])
      }
      onSortEnd={handleCorrectSortEnd}
      useDragHandle
      columns={1}
      points={
        correctTab === 0 ? item.validation.valid_response.score : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handlePointsChange}
    />
  );

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.sortList.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.sortList.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />
        <Subtitle>{t("component.sortList.list")}</Subtitle>
        <List
          items={item.source}
          onAdd={handleAdd}
          firstFocus={item.firstMount}
          onSortEnd={handleSortEnd}
          onChange={handleChange}
          onRemove={handleRemove}
          useDragHandle
          columns={1}
        />

        <CorrectAnswers
          onTabChange={setCorrectTab}
          correctTab={correctTab}
          readOnly
          onAdd={handleAddAnswer}
          validation={item.validation}
          options={renderOptions()}
          onCloseTab={handleCloseTab}
        />
      </Paper>
      <AdvancedOptions item={item} onUiChange={handleUiStyleChange} />
    </Fragment>
  );
};

EditSortList.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(EditSortList);
