import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { arrayMove } from "react-sortable-hoc";
import { connect } from "react-redux";
import { Row, Col, Select } from "antd";
import { withTheme } from "styled-components";
import { compose } from "redux";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import QuillSortableList from "../../components/QuillSortableList/index";
import QuestionTextArea from "../../components/QuestionTextArea";
import CorrectAnswers from "../../components/CorrectAnswers";
import withAddButton from "../../components/HOC/withAddButton";
import withPoints from "../../components/HOC/withPoints";
import { Subtitle } from "../../styled/Subtitle";
import { EDIT } from "../../constants/constantsForQuestions";

import { setQuestionDataAction, setFirstMountAction } from "../../../author/QuestionEditor/ducks";

import GroupPossibleResponses from "./components/GroupPossibleResponses";
import ClassificationPreview from "./ClassificationPreview";
import Options from "./components/Options";

const List = withAddButton(QuillSortableList);

const OptionsList = withPoints(ClassificationPreview);

const { Option } = Select;

const actions = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  SORTEND: "SORTEND"
};

const EditClassification = ({ item, setQuestionData, setFirstMount, theme, t }) => {
  const { stimulus, ui_style, firstMount } = item;

  const [correctTab, setCorrectTab] = useState(0);

  useEffect(
    () => () => {
      setFirstMount(item.id);
    },
    []
  );

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const onGroupPossibleResp = e => {
    const newItem = cloneDeep(item);

    newItem.group_possible_responses = e.target.checked;

    setQuestionData(newItem);
  };

  const handleGroupAdd = () => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups.push({ title: "", responses: [] });

    setQuestionData(newItem);
  };

  const handleGroupRemove = index => () => {
    const newItem = cloneDeep(item);

    const colCount = newItem.ui_style.column_count;
    const rowCount = newItem.ui_style.row_count;

    const initialLength = (colCount || 2) * (rowCount || 1);
    newItem.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

    newItem.validation.alt_responses.forEach(ite => {
      ite.value = Array(...Array(initialLength)).map(() => []);
    });

    newItem.possible_response_groups.splice(index, 1);

    setQuestionData(newItem);
  };

  const onAddInner = index => () => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].responses.push("");

    setQuestionData(newItem);
  };

  const onRemoveInner = ind => index => {
    const newItem = cloneDeep(item);

    const colCount = newItem.ui_style.column_count;
    const rowCount = newItem.ui_style.row_count;

    const initialLength = (colCount || 2) * (rowCount || 1);
    newItem.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

    newItem.validation.alt_responses.forEach(ite => {
      ite.value = Array(...Array(initialLength)).map(() => []);
    });

    newItem.possible_response_groups[ind].responses.splice(index, 1);

    setQuestionData(newItem);
  };

  const onGroupTitleChange = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].title = value;

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

  const handleGroupChange = ind => (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[ind].responses[index] = value;

    setQuestionData(newItem);
  };

  const handleMainPossible = action => restProp => {
    const newItem = cloneDeep(item);

    switch (action) {
      case actions.ADD:
        newItem.possible_responses.push("");
        break;

      case actions.REMOVE:
        newItem.validation.valid_response.value.forEach(arr => {
          if (arr.includes(restProp)) {
            arr.splice(arr.indexOf(restProp), 1);
          }
        });
        newItem.validation.alt_responses.forEach(arrs => {
          arrs.value.forEach(arr => {
            if (arr.includes(restProp)) {
              arr.splice(arr.indexOf(restProp), 1);
            }
          });
        });
        newItem.possible_responses.splice(restProp, 1);
        break;

      case actions.SORTEND:
        newItem.possible_responses = arrayMove(item.possible_responses, restProp.oldIndex, restProp.newIndex);
        break;

      default:
        break;
    }

    setQuestionData(newItem);
  };

  const handleMain = (action, prop) => restProp => {
    const newItem = cloneDeep(item);

    switch (action) {
      case actions.ADD:
        newItem.ui_style[prop].push("");
        if (prop === "column_titles") {
          newItem.ui_style.column_count += 1;
          Array.from({ length: newItem.ui_style.row_count }).forEach(() => {
            newItem.validation.valid_response.value.push([]);
          });

          newItem.validation.alt_responses.forEach(valid => {
            Array.from({ length: newItem.ui_style.row_count }).forEach(() => {
              valid.value.push([]);
            });
          });
        } else if (prop === "row_titles") {
          newItem.ui_style.row_count += 1;
          Array.from({ length: newItem.ui_style.column_count }).forEach(() => {
            newItem.validation.valid_response.value.push([]);
          });

          newItem.validation.alt_responses.forEach(valid => {
            Array.from({ length: newItem.ui_style.column_count }).forEach(() => {
              valid.value.push([]);
            });
          });
        }
        break;

      case actions.REMOVE:
        newItem.ui_style[prop].splice(restProp, 1);
        if (prop === "column_titles" && newItem.ui_style.column_count !== 1) {
          newItem.validation.valid_response.value.forEach(array => {
            array.splice(-1, newItem.ui_style.row_count);
          });
          newItem.validation.alt_responses.forEach(valid => {
            valid.value.forEach(array => {
              array.splice(-1, newItem.ui_style.row_count);
            });
          });
          newItem.ui_style.column_count -= 1;
        } else if (prop === "row_titles" && newItem.ui_style.row_count !== 1) {
          newItem.validation.valid_response.value.splice(-1, newItem.ui_style.column_titles);
          newItem.validation.alt_responses.forEach(valid => {
            valid.value.splice(-1, newItem.ui_style.column_titles);
          });
          newItem.ui_style.row_count -= 1;
        }
        break;

      case actions.SORTEND:
        newItem.ui_style[prop] = arrayMove(item.ui_style[prop], restProp.oldIndex, restProp.newIndex);
        break;

      default:
        break;
    }

    setQuestionData(newItem);
  };

  const handleChange = prop => (index, value) => {
    const newItem = cloneDeep(item);

    newItem.ui_style[prop][index] = value;
    setQuestionData(newItem);
  };

  const handleChangePossible = () => (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_responses[index] = value;
    setQuestionData(newItem);
  };

  const onUiChange = prop => val => {
    const newItem = cloneDeep(item);

    newItem.ui_style[prop] = val;

    const colCount = newItem.ui_style.column_count;
    const rowCount = newItem.ui_style.row_count;

    const initialLength = (colCount || 2) * (rowCount || 1);

    if (prop === "column_count" || prop === "row_count") {
      newItem.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

      newItem.validation.alt_responses.forEach(ite => {
        ite.value = Array(...Array(initialLength)).map(() => []);
      });
    }

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

  const handlePointsChange = val => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.score = val;
    } else {
      newItem.validation.alt_responses[correctTab - 1].score = val;
    }

    setQuestionData(newItem);
  };

  const handleAnswerChange = answer => {
    const newItem = cloneDeep(item);
    let groupArray = item.group_possible_responses ? [] : item.possible_responses;

    if (item.group_possible_responses) {
      item.possible_response_groups.forEach(group => {
        groupArray = [...groupArray, ...group.responses];
      });
    }

    if (correctTab === 0) {
      if (newItem.validation && newItem.validation.valid_response) {
        newItem.validation.valid_response.value = [...answer];
      }
    } else if (
      newItem.validation &&
      newItem.validation.alt_responses &&
      newItem.validation.alt_responses[correctTab - 1]
    )
      newItem.validation.alt_responses[correctTab - 1].value = [...answer];

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

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.classification.composeQuestion")}</Subtitle>

        <QuestionTextArea
          placeholder={t("component.classification.enterQuestion")}
          onChange={stim => handleItemChangeChange("stimulus", stim)}
          value={stimulus}
        />

        <Row gutter={70}>
          <Col data-cy="column-container" span={12}>
            <Subtitle>{t("component.classification.columnsSubtitle")}</Subtitle>

            <Subtitle
              fontSize={theme.widgets.classification.subtitleFontSize}
              color={theme.widgets.classification.subtitleColor}
              padding="0 0 16px 0"
            >
              {t("component.classification.columnsCountSubtitle")}
            </Subtitle>

            <Select
              data-cy="classification-column-dropdown"
              size="large"
              style={{ width: "calc(100% - 30px)" }}
              value={ui_style.column_count}
              onChange={value => onUiChange("column_count")(+value)}
            >
              {Array.from({ length: 10 }).map((v, index) => (
                <Option data-cy={`coloumn-dropdown-list-${index}`} key={index} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>

            <Subtitle
              fontSize={theme.widgets.classification.subtitleFontSize}
              color={theme.widgets.classification.subtitleColor}
            >
              {t("component.classification.editColListSubtitle")}
            </Subtitle>

            <List
              prefix="columns"
              buttonText={t("component.classification.addNewColumn")}
              items={item.ui_style.column_titles}
              onAdd={handleMain(actions.ADD, "column_titles")}
              onSortEnd={handleMain(actions.SORTEND, "column_titles")}
              onChange={handleChange("column_titles")}
              onRemove={handleMain(actions.REMOVE, "column_titles")}
              firstFocus={firstMount}
              useDragHandle
              columns={1}
            />
          </Col>
          <Col data-cy="row-container" span={12}>
            <Subtitle>{t("component.classification.rowsSubtitle")}</Subtitle>

            <Subtitle
              fontSize={theme.widgets.classification.subtitleFontSize}
              color={theme.widgets.classification.subtitleColor}
              padding="0 0 16px 0"
            >
              {t("component.classification.rowsCountSubtitle")}
            </Subtitle>

            <Select
              data-cy="classification-row-dropdown"
              size="large"
              style={{ width: "calc(100% - 30px)" }}
              value={ui_style.row_count}
              onChange={value => onUiChange("row_count")(+value)}
            >
              {Array.from({ length: 10 }).map((v, index) => (
                <Option data-cy={`row-dropdown-list-${index}`} key={index} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>

            <Subtitle
              fontSize={theme.widgets.classification.subtitleFontSize}
              color={theme.widgets.classification.subtitleColor}
            >
              {t("component.classification.editRowListSubtitle")}
            </Subtitle>

            <List
              prefix="rows"
              firstFocus={firstMount}
              buttonText={t("component.classification.addNewRow")}
              items={item.ui_style.row_titles}
              onAdd={handleMain(actions.ADD, "row_titles")}
              onSortEnd={handleMain(actions.SORTEND, "row_titles")}
              onChange={handleChange("row_titles")}
              onRemove={handleMain(actions.REMOVE, "row_titles")}
              useDragHandle
              columns={1}
            />
          </Col>
        </Row>

        <GroupPossibleResponses
          checkboxChange={onGroupPossibleResp}
          checkboxVal={item.group_possible_responses}
          items={
            item.group_possible_responses ? item.possible_response_groups : item.possible_responses.map(ite => ite)
          }
          onAddInner={onAddInner}
          onTitleChange={onGroupTitleChange}
          onAdd={item.group_possible_responses ? handleGroupAdd : handleMainPossible(actions.ADD)}
          onSortEnd={item.group_possible_responses ? handleGroupSortEnd : handleMainPossible(actions.SORTEND)}
          firstFocus={firstMount}
          onChange={item.group_possible_responses ? handleGroupChange : handleChangePossible()}
          onRemoveInner={onRemoveInner}
          onRemove={item.group_possible_responses ? handleGroupRemove : handleMainPossible(actions.REMOVE)}
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
      <Options />
    </Fragment>
  );
};

EditClassification.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  setFirstMount: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme,
  connect(
    null,
    { setQuestionData: setQuestionDataAction, setFirstMount: setFirstMountAction }
  )
);

export default enhance(EditClassification);
