import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrayMove } from "react-sortable-hoc";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import "react-quill/dist/quill.snow.css";

import { withNamespaces } from "@edulastic/localization";
import { PaddingDiv, CustomQuillComponent } from "@edulastic/common";
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

  getNewItem() {
    const { item } = this.props;
    return cloneDeep(item);
  }

  onChangeQuesiton = html => {
    const stimulus = html;
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, stimulus });
  };

  onSortEnd = (index, { oldIndex, newIndex }) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options[index] = arrayMove(newItem.options[index], oldIndex, newIndex);
    setQuestionData(newItem);
  };

  remove = (index, itemIndex) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options[index].splice(itemIndex, 1);
    setQuestionData(newItem);
  };

  editOptions = (index, itemIndex, e) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    if (newItem.options[index] === undefined) newItem.options[index] = [];
    newItem.options[index][itemIndex] = e.target.value;
    setQuestionData(newItem);
  };

  addNewChoiceBtn = index => {
    const { setQuestionData, t } = this.props;
    const newItem = this.getNewItem();
    if (newItem.options[index] === undefined) newItem.options[index] = [];
    newItem.options[index].push(t("component.cloze.dropDown.newChoice"));
    setQuestionData(newItem);
  };

  onChangeMarkUp = html => {
    const templateMarkUp = html;
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, templateMarkUp });
  };

  addGroup = () => {
    const { groupResponses } = this.state;
    groupResponses.push({ title: "", options: [] });
    const newGroupResponses = groupResponses.slice();
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  removeGroup = index => {
    const { groupResponses } = this.state;
    groupResponses.splice(index, 1);
    const newGroupResponses = groupResponses.slice();
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  changeGroupRespTitle = (index, e) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].title = e.target.value;
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  onSortEndGroupOptions = () => {};

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
            onChange={this.onChangeQuesiton}
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
