import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrayMove } from "react-sortable-hoc";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";
import produce from "immer";

import { withNamespaces } from "@edulastic/localization";
import { PaddingDiv, CustomQuillComponent } from "@edulastic/common";
import { updateVariables } from "../../utils/variables";
import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";

import SortableList from "../../components/SortableList/index";
import { Subtitle } from "../../styled/Subtitle";
import { AddNewChoiceBtn } from "../../styled/AddNewChoiceBtn";

const defaultTemplateMarkup =
  '<p>Risus </p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p>, et tincidunt turpis facilisis. Curabitur eu nulla justo. Curabitur vulputate ut nisl et bibendum. Nunc diam enim, porta sed eros vitae. </p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p> dignissim, et tincidunt turpis facilisis. Curabitur eu nulla justo. Curabitur vulputate ut nisl et bibendum.</p>';

class ClozeDropDownAuthoring extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired
  };

  state = {
    responseContainersCount: 2
  };

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    const { responseContainersCount } = this.getTemplateParts(item);
    this.setState({ responseContainersCount });
  }

  onChangeQuestion = stimulus => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.stimulus = stimulus;
        updateVariables(draft);
      })
    );
  };

  onSortEnd = (index, { oldIndex, newIndex }) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options[index] = arrayMove(draft.options[index], oldIndex, newIndex);
      })
    );
  };

  remove = (index, itemIndex) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options[index].splice(itemIndex, 1);
        updateVariables(draft);
      })
    );
  };

  editOptions = (index, itemIndex, e) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        if (draft.options[index] === undefined) draft.options[index] = [];
        draft.options[index][itemIndex] = e.target.value;
        updateVariables(draft);
      })
    );
  };

  addNewChoiceBtn = index => {
    const { item, setQuestionData, t } = this.props;
    setQuestionData(
      produce(item, draft => {
        if (draft.options[index] === undefined) draft.options[index] = [];
        draft.options[index].push(t("component.cloze.dropDown.newChoice"));
      })
    );
  };

  onChangeMarkUp = templateMarkUp => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.templateMarkUp = templateMarkUp;
        updateVariables(draft);
      })
    );
  };

  getTemplateParts = props => {
    const { templateMarkUp } = props;
    let templateMarkUpStr = templateMarkUp;
    if (!templateMarkUpStr) {
      templateMarkUpStr = defaultTemplateMarkup;
    }
    const templateParts = templateMarkUpStr.match(/<p.*?<\/p>/g);
    const responseParts = templateMarkUpStr.match(/<p class="response-btn.*?<\/p>/g);
    const responseContainersCount = responseParts !== null ? responseParts.length : 0;
    return { templateParts, responseContainersCount };
  };

  render() {
    const { t, item } = this.props;
    const { responseContainersCount } = this.state;
    const responseContainers = new Array(responseContainersCount).fill(true);

    return (
      <div>
        <PaddingDiv bottom={20}>
          <Subtitle>{t("component.cloze.dropDown.composequestion")}</Subtitle>
          <CustomQuillComponent
            toolbarId="stimulus"
            wrappedRef={instance => {
              this.stimulus = instance;
            }}
            placeholder={t("component.cloze.dropDown.thisisstem")}
            onChange={this.onChangeQuestion}
            showResponseBtn={false}
            value={item.stimulus}
          />
          <Subtitle>{t("component.cloze.dropDown.templatemarkup")}</Subtitle>
          <CustomQuillComponent
            toolbarId="templatemarkup"
            wrappedRef={instance => {
              this.templatemarkup = instance;
            }}
            placeholder={t("component.cloze.dropDown.templatemarkupplaceholder")}
            onChange={this.onChangeMarkUp}
            firstFocus={!item.templateMarkUp}
            showResponseBtn
            value={item.templateMarkUp || defaultTemplateMarkup}
          />
          {responseContainers.map((resp, index) => (
            <PaddingDiv key={`${resp}_${index}`}>
              <Subtitle>{`${t("component.cloze.dropDown.choicesforresponse")} ${index + 1}`}</Subtitle>
              <SortableList
                items={item.options[index] || []}
                dirty={item.templateMarkUp}
                onSortEnd={params => this.onSortEnd(index, params)}
                useDragHandle
                onRemove={itemIndex => this.remove(index, itemIndex)}
                onChange={(itemIndex, e) => this.editOptions(index, itemIndex, e)}
              />
              <div>
                <AddNewChoiceBtn onClick={() => this.addNewChoiceBtn(index)}>
                  {t("component.cloze.dropDown.addnewchoice")}
                </AddNewChoiceBtn>
              </div>
            </PaddingDiv>
          ))}
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

export default enhance(ClozeDropDownAuthoring);
