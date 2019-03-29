import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrayMove } from "react-sortable-hoc";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import produce from "immer";
import uuid from "uuid/v4";

import { withNamespaces } from "@edulastic/localization";
import { PaddingDiv } from "@edulastic/common";
import { setQuestionDataAction } from "../../../../author/QuestionEditor/ducks";

import QuestionTextArea from "../../../components/QuestionTextArea";
import { Subtitle } from "../../../styled/Subtitle";
import { AddNewChoiceBtn } from "../../../styled/AddNewChoiceBtn";

import { ALPHABET } from "../constants/alphabet";
import QuillSortableList from "../../../components/QuillSortableList";
import { updateVariables } from "../../../utils/variables";

class Authoring extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired
  };

  onChangeQuestion = stimulus => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.stimulus = stimulus;
        updateVariables(draft);
      })
    );
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        // reorder the options and sort the key based on index
        // editing is based on on index!
        draft.options = arrayMove(draft.options, oldIndex, newIndex).map(({ label }, index) => ({
          value: index,
          label
        }));

        let idx = item.validation.valid_response.value.findIndex(val => val === oldIndex);
        if (idx !== -1) {
          draft.validation.valid_response.value[idx] = newIndex;
        }

        idx = item.validation.valid_response.value.findIndex(val => val === newIndex);
        if (idx !== -1) {
          draft.validation.valid_response.value[idx] = oldIndex;
        }

        if (draft.validation.alt_responses) {
          for (let i = 0; i < item.validation.alt_responses; i++) {
            const altResponse = draft.validation.alt_responses[i];
            idx = item.validation.alt_responses[i].value.findIndex(val => val === oldIndex);
            if (idx !== -1) {
              altResponse.value[idx] = newIndex;
            }

            idx = item.validation.alt_responses[i].value.findIndex(val => val === newIndex);
            if (idx !== -1) {
              altResponse.value[idx] = oldIndex;
            }
            return altResponse;
          }
        }

        updateVariables(draft);
      })
    );
  };

  remove = index => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options.splice(index, 1);
        for (let i = index + 1; i < draft.options.length; i++) {
          draft.variable.variableStatus[`option-${index - 1}`] = draft.variable.variableStatus[`option-${index}`];
        }
        updateVariables(draft);
      })
    );
  };

  addNewChoiceBtn = () => {
    const { item, setQuestionData, t } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options.push({
          value: uuid(),
          label: `${t("component.multiplechoice.choice")} ${ALPHABET[draft.options.length]}`
        });
      })
    );
  };

  editOptions = (index, value) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options[index] = {
          value: index,
          label: value
        };
        updateVariables(draft);
      })
    );
  };

  render() {
    const { t, item } = this.props;

    return (
      <div>
        <PaddingDiv bottom={20}>
          <Subtitle>{t("component.multiplechoice.composequestion")}</Subtitle>
          <QuestionTextArea
            onChange={this.onChangeQuestion}
            value={item.stimulus}
            firstFocus={item.firstMount}
            placeholder={t("component.multiplechoice.thisisstem")}
          />
          <Subtitle>{t("component.multiplechoice.multiplechoiceoptions")}</Subtitle>
          <QuillSortableList
            items={item.options.map(o => o.label)}
            onSortEnd={this.onSortEnd}
            useDragHandle
            firstFocus={item.firstMount}
            onRemove={this.remove}
            onChange={this.editOptions}
          />
          <div>
            <AddNewChoiceBtn data-cy="add-new-ch" onClick={this.addNewChoiceBtn}>
              {t("component.multiplechoice.addnewchoice")}
            </AddNewChoiceBtn>
          </div>
        </PaddingDiv>
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withNamespaces("assessment"),
  connect(
    null,
    { setQuestionData: setQuestionDataAction }
  )
);

export default enhance(Authoring);
