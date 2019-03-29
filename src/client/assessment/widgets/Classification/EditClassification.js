import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { arrayMove } from "react-sortable-hoc";
import { connect } from "react-redux";
import { Row, Col, Select } from "antd";
import { withTheme } from "styled-components";
import { compose } from "redux";
import produce from "immer";

import { Paper } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import QuillSortableList from "../../components/QuillSortableList/index";
import QuestionTextArea from "../../components/QuestionTextArea";
import CorrectAnswers from "../../components/CorrectAnswers";
import withAddButton from "../../components/HOC/withAddButton";
import withPoints from "../../components/HOC/withPoints";
import { Subtitle } from "../../styled/Subtitle";
import { EDIT } from "../../constants/constantsForQuestions";

import { updateVariables } from "../../utils/variables";

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
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;
        updateVariables(draft);
      })
    );
  };

  const onGroupPossibleResp = e => {
    setQuestionData(
      produce(item, draft => {
        draft.group_possible_responses = e.target.checked;
        updateVariables(draft);
      })
    );
  };

  const handleGroupAdd = () => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups.push({ title: "", responses: [] });
        updateVariables(draft);
      })
    );
  };

  const handleGroupRemove = index => () => {
    setQuestionData(
      produce(item, draft => {
        const colCount = draft.ui_style.column_count;
        const rowCount = draft.ui_style.row_count;

        const initialLength = (colCount || 2) * (rowCount || 1);
        draft.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

        draft.validation.alt_responses.forEach(ite => {
          ite.value = Array(...Array(initialLength)).map(() => []);
        });

        draft.possible_response_groups.splice(index, 1);
        updateVariables(draft);
      })
    );
  };

  const onAddInner = index => () => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups[index].responses.push("");
        updateVariables(draft);
      })
    );
  };

  const onRemoveInner = ind => index => {
    setQuestionData(
      produce(item, draft => {
        const colCount = draft.ui_style.column_count;
        const rowCount = draft.ui_style.row_count;

        const initialLength = (colCount || 2) * (rowCount || 1);
        draft.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

        draft.validation.alt_responses.forEach(ite => {
          ite.value = Array(...Array(initialLength)).map(() => []);
        });

        draft.possible_response_groups[ind].responses.splice(index, 1);
        updateVariables(draft);
      })
    );
  };

  const onGroupTitleChange = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups[index].title = value;
        updateVariables(draft);
      })
    );
  };

  const handleGroupSortEnd = index => ({ oldIndex, newIndex }) => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups[index].responses = arrayMove(
          draft.possible_response_groups[index].responses,
          oldIndex,
          newIndex
        );
        updateVariables(draft);
      })
    );
  };

  const handleGroupChange = ind => (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups[ind].responses[index] = value;
        updateVariables(draft);
      })
    );
  };

  const handleMainPossible = action => restProp => {
    setQuestionData(
      produce(item, draft => {
        switch (action) {
          case actions.ADD:
            draft.possible_responses.push("");
            break;

          case actions.REMOVE:
            draft.validation.valid_response.value.forEach(arr => {
              if (arr.includes(restProp)) {
                arr.splice(arr.indexOf(restProp), 1);
              }
            });
            draft.validation.alt_responses.forEach(arrs => {
              arrs.value.forEach(arr => {
                if (arr.includes(restProp)) {
                  arr.splice(arr.indexOf(restProp), 1);
                }
              });
            });
            draft.possible_responses.splice(restProp, 1);
            break;

          case actions.SORTEND:
            draft.possible_responses = arrayMove(item.possible_responses, restProp.oldIndex, restProp.newIndex);
            break;

          default:
            return;
        }
        updateVariables(draft);
      })
    );
  };

  const handleMain = (action, prop) => restProp => {
    setQuestionData(
      produce(item, draft => {
        switch (action) {
          case actions.ADD:
            draft.ui_style[prop].push("");
            if (prop === "column_titles") {
              draft.ui_style.column_count += 1;
              Array.from({ length: draft.ui_style.row_count }).forEach(() => {
                draft.validation.valid_response.value.push([]);
              });

              draft.validation.alt_responses.forEach(valid => {
                Array.from({ length: draft.ui_style.row_count }).forEach(() => {
                  valid.value.push([]);
                });
              });
            } else if (prop === "row_titles") {
              draft.ui_style.row_count += 1;
              Array.from({ length: draft.ui_style.column_count }).forEach(() => {
                draft.validation.valid_response.value.push([]);
              });

              draft.validation.alt_responses.forEach(valid => {
                Array.from({ length: draft.ui_style.column_count }).forEach(() => {
                  valid.value.push([]);
                });
              });
            }
            break;

          case actions.REMOVE:
            draft.ui_style[prop].splice(restProp, 1);
            if (prop === "column_titles" && draft.ui_style.column_count !== 1) {
              draft.validation.valid_response.value.forEach(array => {
                array.splice(-1, draft.ui_style.row_count);
              });
              draft.validation.alt_responses.forEach(valid => {
                valid.value.forEach(array => {
                  array.splice(-1, draft.ui_style.row_count);
                });
              });
              draft.ui_style.column_count -= 1;
            } else if (prop === "row_titles" && draft.ui_style.row_count !== 1) {
              draft.validation.valid_response.value.splice(-1, draft.ui_style.column_titles);
              draft.validation.alt_responses.forEach(valid => {
                valid.value.splice(-1, draft.ui_style.column_titles);
              });
              draft.ui_style.row_count -= 1;
            }
            break;

          case actions.SORTEND: {
            const { oldIndex, newIndex } = restProp;
            draft.ui_style[prop] = arrayMove(item.ui_style[prop], oldIndex, newIndex);
            break;
          }

          default:
            return;
        }

        updateVariables(draft);
      })
    );
  };

  const handleChange = prop => (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.ui_style[prop][index] = value;
        updateVariables(draft);
      })
    );
  };

  const handleChangePossible = () => (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_responses[index] = value;
        updateVariables(draft);
      })
    );
  };

  const onUiChange = prop => val => {
    setQuestionData(
      produce(item, draft => {
        draft.ui_style[prop] = val;

        const colCount = draft.ui_style.column_count;
        const rowCount = draft.ui_style.row_count;

        const initialLength = (colCount || 2) * (rowCount || 1);

        if (prop === "column_count" || prop === "row_count") {
          draft.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

          draft.validation.alt_responses.forEach(ite => {
            ite.value = Array(...Array(initialLength)).map(() => []);
          });
        }

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

        updateVariables(draft);
      })
    );
    setCorrectTab(correctTab + 1);
  };

  const handleCloseTab = tabIndex => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.alt_responses.splice(tabIndex, 1);
        updateVariables(draft);
      })
    );
    setCorrectTab(0);
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

  const handleAnswerChange = answer => {
    setQuestionData(
      produce(item, draft => {
        let groupArray = item.group_possible_responses ? [] : item.possible_responses;

        if (item.group_possible_responses) {
          item.possible_response_groups.forEach(group => {
            groupArray = [...groupArray, ...group.responses];
          });
        }

        if (correctTab === 0) {
          if (draft.validation && draft.validation.valid_response) {
            draft.validation.valid_response.value = [...answer];
          }
        } else if (draft.validation && draft.validation.alt_responses && draft.validation.alt_responses[correctTab - 1])
          draft.validation.alt_responses[correctTab - 1].value = [...answer];

        updateVariables(draft);
      })
    );
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
