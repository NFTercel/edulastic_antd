import React, { Component } from "react";
import PropTypes from "prop-types";
import { arrayMove } from "react-sortable-hoc";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Icon, Input } from "antd";
import "react-quill/dist/quill.snow.css";
import { withTheme } from "styled-components";
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

class Authoring extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasGroupResponses: false,
      groupResponses: []
    };
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

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options = arrayMove(draft.options, oldIndex, newIndex);
      })
    );
  };

  remove = index => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options.splice(index, 1);
        updateVariables(draft);
      })
    );
  };

  editOptions = (index, e) => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options[index] = e.target.value;
        updateVariables(draft);
      })
    );
  };

  addNewChoiceBtn = () => {
    const { item, setQuestionData, t } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.options.push(t("component.cloze.dragDrop.newChoice"));
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

  groupResponsesHandler = e => {
    const { item, setQuestionData } = this.props;
    const { groupResponses } = this.state;
    const hasGroupResponses = e.target.checked;
    if (e.target.checked) {
      this.setState({
        hasGroupResponses,
        groupResponses:
          groupResponses.length === 0 && item.options
            ? [
                {
                  title: "",
                  options: [...item.options]
                }
              ]
            : groupResponses
      });
    } else {
      this.setState({ hasGroupResponses });
    }

    setQuestionData(
      produce(item, draft => {
        draft.hasGroupResponses = hasGroupResponses;
        updateVariables(draft);
      })
    );
  };

  addGroup = () => {
    const { groupResponses } = this.state;
    groupResponses.push({ title: "", options: [] });
    const newGroupResponses = groupResponses.slice();
    this.setState({ groupResponses: newGroupResponses });

    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.groupResponses = newGroupResponses;
      })
    );
  };

  removeGroup = index => {
    const { groupResponses } = this.state;
    groupResponses.splice(index, 1);
    const newGroupResponses = groupResponses.slice();
    this.setState({ groupResponses: newGroupResponses });

    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.groupResponses = newGroupResponses;
        updateVariables(draft);
      })
    );
  };

  changeGroupRespTitle = (index, e) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].title = e.target.value;
    this.setState({ groupResponses: newGroupResponses });

    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.groupResponses = newGroupResponses;
        updateVariables(draft);
      })
    );
  };

  addNewGroupOption = index => {
    const { groupResponses } = this.state;
    const { t } = this.props;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].options.push(t("component.cloze.dragDrop.newChoice"));

    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.groupResponses = newGroupResponses;
      })
    );
  };

  editGroupOptions = (index, itemIndex, e) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].options[itemIndex] = e.target.value;
    this.setState({ groupResponses: newGroupResponses });

    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.groupResponses = newGroupResponses;
        updateVariables(draft);
      })
    );
  };

  removeGroupOptions = (index, itemIndex) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].options.splice(itemIndex, 1);
    this.setState({ groupResponses: newGroupResponses });

    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.groupResponses = newGroupResponses;
        updateVariables(draft);
      })
    );
  };

  onSortEndGroupOptions = () => {};

  render() {
    const { t, item, theme } = this.props;
    const { hasGroupResponses, groupResponses } = this.state;
    return (
      <div>
        <PaddingDiv bottom={20}>
          <Subtitle>{t("component.cloze.dragDrop.composequestion")}</Subtitle>
          <CustomQuillComponent
            toolbarId="stimulus"
            wrappedRef={instance => {
              this.stimulus = instance;
            }}
            placeholder={t("component.cloze.dragDrop.thisisstem")}
            onChange={this.onChangeQuestion}
            showResponseBtn={false}
            value={item.stimulus}
          />
          <Subtitle>{t("component.cloze.dragDrop.templatemarkup")}</Subtitle>
          <CustomQuillComponent
            toolbarId="templatemarkup"
            wrappedRef={instance => {
              this.templatemarkup = instance;
            }}
            placeholder={t("component.cloze.dragDrop.templatemarkupplaceholder")}
            onChange={this.onChangeMarkUp}
            firstFocus={!item.templateMarkUp}
            showResponseBtn
            clearOnFirstFocus
            value={item.templateMarkUp || defaultTemplateMarkup}
          />
          <PaddingDiv>
            <Subtitle>
              <input id="groupResponseCheckbox" type="checkbox" onChange={e => this.groupResponsesHandler(e)} />
              <label htmlFor="groupResponseCheckbox">{t("component.cloze.dragDrop.grouppossibleresponses")}</label>
            </Subtitle>
          </PaddingDiv>
          {!hasGroupResponses && (
            <PaddingDiv>
              <div>{t("component.cloze.dragDrop.choicesforresponse")}</div>
              <SortableList
                items={item.options}
                dirty={!!item.templateMarkUp}
                onSortEnd={this.onSortEnd}
                useDragHandle
                onRemove={this.remove}
                onChange={this.editOptions}
              />
              <div>
                <AddNewChoiceBtn onClick={this.addNewChoiceBtn}>
                  {t("component.cloze.dragDrop.addnewchoice")}
                </AddNewChoiceBtn>
              </div>
            </PaddingDiv>
          )}
          {hasGroupResponses &&
            groupResponses.length > 0 &&
            groupResponses.map((group, index) => (
              <div key={index}>
                <fieldset
                  style={{
                    borderColor: theme.widgets.clozeDragDrop.groupResponseFieldsetBorderColor,
                    borderRadius: 2,
                    padding: "0 20px",
                    marginBottom: 15,
                    border: "solid 1px"
                  }}
                >
                  <legend style={{ padding: "0 20px", width: "auto" }}>
                    {t("component.cloze.dragDrop.group")} {index + 1}
                  </legend>
                  <div style={{ float: "right" }}>
                    <Button onClick={() => this.removeGroup(index)} size="small" type="button">
                      <Icon type="close" />
                    </Button>
                  </div>
                  <PaddingDiv top={10} bottom={10}>
                    <div>{t("component.cloze.dragDrop.title")}</div>
                  </PaddingDiv>
                  <div>
                    <Input
                      size="large"
                      style={{ width: "100%" }}
                      onChange={e => this.changeGroupRespTitle(index, e)}
                      value={group.title}
                    />
                  </div>
                  <PaddingDiv top={20} bottom={10}>
                    <div>{t("component.cloze.dragDrop.choicesforresponse")}</div>
                    <SortableList
                      dirty={!!item.templateMarkUp}
                      items={group.options}
                      onSortEnd={params => this.onSortEndGroupOptions(index, ...params)}
                      useDragHandle
                      onRemove={itemIndex => this.removeGroupOptions(index, itemIndex)}
                      onChange={(itemIndex, e) => this.editGroupOptions(index, itemIndex, e)}
                    />
                    <PaddingDiv top={10} bottom={10}>
                      <AddNewChoiceBtn onClick={() => this.addNewGroupOption(index)}>
                        {t("component.cloze.dragDrop.addnewchoice")}
                      </AddNewChoiceBtn>
                    </PaddingDiv>
                  </PaddingDiv>
                </fieldset>
              </div>
            ))}
          {hasGroupResponses && (
            <Button
              type="primary"
              onClick={this.addGroup}
              style={{
                background: theme.widgets.clozeDragDrop.addGroupButtonBgColor
              }}
            >
              {t("component.cloze.dragDrop.addgroup")}
            </Button>
          )}
        </PaddingDiv>
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withNamespaces("assessment"),
  withTheme,
  connect(
    null,
    { setQuestionData: setQuestionDataAction }
  )
);

export default enhance(Authoring);
