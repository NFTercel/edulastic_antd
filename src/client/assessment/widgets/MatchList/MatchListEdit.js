import React, { Fragment, useState } from "react";
import produce from "immer";
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
import Options from "./components/Options";

const OptionsList = withPoints(MatchListPreview);

const List = withAddButton(QuillSortableList);

const MatchListEdit = ({ item, setQuestionData, t }) => {
  const [correctTab, setCorrectTab] = useState(0);

  const handleItemChangeChange = (prop, uiStyle) => {
    setQuestionData(
      produce(item, draft => {
        draft[prop] = uiStyle;
      })
    );
  };

  const handleAdd = () => {
    setQuestionData(
      produce(item, draft => {
        draft.list.push("");

        draft.validation.valid_response.value.push("");
        draft.validation.alt_responses.forEach(ite => {
          ite.value.push("");
        });
      })
    );
  };

  const handleAddResp = () => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_responses.push("");
      })
    );
  };

  const handleRemove = index => {
    setQuestionData(
      produce(item, draft => {
        draft.list.splice(index, 1);
      })
    );
  };

  const handleRemoveResp = index => {
    setQuestionData(
      produce(item, draft => {
        const spliceRes = draft.possible_responses.splice(index, 1);

        draft.validation.valid_response.value.splice(draft.validation.valid_response.value.indexOf(spliceRes), 1);

        draft.validation.alt_responses.forEach(ite => {
          ite.value.splice(ite.value.indexOf(spliceRes), 1);
        });
      })
    );
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    setQuestionData(
      produce(item, draft => {
        draft.list = arrayMove(item.list, oldIndex, newIndex);
      })
    );
  };

  const handleSortEndResp = ({ oldIndex, newIndex }) => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_responses = arrayMove(item.possible_responses, oldIndex, newIndex);
      })
    );
  };

  const handleChange = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.list[index] = value;
      })
    );
  };

  const handleChangeResp = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.valid_response.value[
          draft.validation.valid_response.value.indexOf(draft.possible_responses[index])
        ] = value;
        draft.validation.alt_responses.forEach(ite => {
          ite.value[ite.value.indexOf(draft.possible_responses[index])] = value;
        });

        draft.possible_responses[index] = value;
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
          value: Array.from({
            length: item.validation.valid_response.value.length
          }).fill(null)
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
      })
    );
  };

  const handleAnswerChange = ans => {
    setQuestionData(
      produce(item, draft => {
        if (correctTab === 0) {
          draft.validation.valid_response.value = ans;
        } else {
          draft.validation.alt_responses[correctTab - 1].value = ans;
        }
      })
    );
  };

  const onGroupPossibleResp = e => {
    setQuestionData(
      produce(item, draft => {
        draft.group_possible_responses = e.target.checked;
      })
    );
  };

  const onGroupTitleChange = (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups[index].title = value;
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

  const onAddInner = index => () => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups[index].responses.push("");
      })
    );
  };

  const onRemoveInner = ind => index => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.valid_response.value = Array.from({
          length: item.validation.valid_response.value.length
        }).fill(null);

        draft.validation.alt_responses.forEach(ite => {
          ite.value = Array.from({
            length: item.validation.valid_response.value.length
          }).fill(null);
        });

        draft.possible_response_groups[ind].responses.splice(index, 1);
      })
    );
  };

  const handleGroupAdd = () => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups.push({ title: "", responses: [] });
      })
    );
  };

  const handleGroupRemove = index => () => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.valid_response.value = Array.from({
          length: item.validation.valid_response.value.length
        }).fill(null);

        draft.validation.alt_responses.forEach(ite => {
          ite.value = Array.from({
            length: item.validation.valid_response.value.length
          }).fill(null);
        });

        draft.possible_response_groups.splice(index, 1);
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
      })
    );
  };

  const handleGroupChange = ind => (index, value) => {
    setQuestionData(
      produce(item, draft => {
        draft.possible_response_groups[ind].responses[index] = value;
      })
    );
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
        <Subtitle data-cy="list-container">{t("component.matchList.list")}</Subtitle>
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
      <Options />
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
