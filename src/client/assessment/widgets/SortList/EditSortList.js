import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import produce from "immer";
import { arrayMove } from "react-sortable-hoc";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { updateVariables } from "../../utils/variables";

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
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;
        updateVariables(draft);
      })
    );
  };

  const handleUiStyleChange = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        draft.ui_style[prop] = uiStyle;
        updateVariables(draft);
      })
    );
  };

  const handleAdd = () => {
    setQuestionData(
      produce(item, draft => {
        draft.source.push("");
        draft.validation.valid_response.value.push(draft.source.length - 1);
        draft.validation.alt_responses.forEach(ite => {
          ite.value.push(draft.source.length - 1);
        });
      })
    );
  };

  const handleRemove = index => {
    setQuestionData(
      produce(item, draft => {
        draft.source.splice(index, 1);
        draft.validation.valid_response.value.splice(
          draft.validation.valid_response.value.indexOf(draft.source.length),
          1
        );
        draft.validation.alt_responses.forEach(ite => {
          ite.value.splice(ite.value.indexOf(draft.source.length), 1);
        });

        updateVariables(draft);
      })
    );
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setQuestionData(
      produce(item, draft => {
        draft.source = arrayMove(item.source, oldIndex, newIndex);
      })
    );
  };

  const handleChange = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.source[index] = value;
        updateVariables(draft);
      })
    );
  };

  const handleAddAnswer = () => {
    setQuestionData(
      produce(item, draft => {
        if (!draft.validation.alt_responses) {
          draft.validation.alt_responses = [];
        }
        draft.validation.alt_responses.push({
          score: 1,
          value: item.validation.valid_response.value
        });
      })
    );
    setCorrectTab(correctTab + 1);
  };

  const handleCloseTab = tabIndex => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.alt_responses.splice(tabIndex, 1);

        setCorrectTab(0);
        updateVariables(draft);
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

  const handlePointsChange = val => {
    setQuestionData(
      produce(item, draft => {
        if (correctTab === 0) {
          draft.validation.valid_response.score = val;
        } else {
          draft.validation.alt_responses[correctTab - 1].score = val;
        }

        updateVariables(draft);
      })
    );
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
