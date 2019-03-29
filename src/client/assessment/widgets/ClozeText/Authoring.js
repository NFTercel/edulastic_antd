import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "react-quill/dist/quill.snow.css";
import produce from "immer";

import { PaddingDiv, CustomQuillComponent } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { setQuestionDataAction } from "../../../author/QuestionEditor/ducks";
import { updateVariables } from "../../utils/variables";

import { Subtitle } from "../../styled/Subtitle";

const defaultTemplateMarkup =
  '<p>"It\'s all clear" he</p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p>Have you the </p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p> and the bags? <br /> Great Scott!!! Jump, archie, jump, and I\'ll swing for it</p>';

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

  onChangeMarkUp = templateMarkUp => {
    const { item, setQuestionData } = this.props;
    setQuestionData(
      produce(item, draft => {
        draft.templateMarkUp = templateMarkUp;
        updateVariables(draft);
      })
    );
  };

  render() {
    const { t, item } = this.props;
    return (
      <div>
        <PaddingDiv bottom={20}>
          <Subtitle>{t("component.cloze.text.composequestion")}</Subtitle>
          <CustomQuillComponent
            toolbarId="stimulus"
            wrappedRef={instance => {
              this.stimulus = instance;
            }}
            placeholder={t("component.cloze.text.thisisstem")}
            onChange={this.onChangeQuestion}
            showResponseBtn={false}
            value={item.stimulus}
          />
          <Subtitle>{t("component.cloze.text.templatemarkup")}</Subtitle>
          <CustomQuillComponent
            toolbarId="templatemarkup"
            wrappedRef={instance => {
              this.templatemarkup = instance;
            }}
            placeholder={t("component.cloze.text.templatemarkupplaceholder")}
            onChange={this.onChangeMarkUp}
            firstFocus={!item.templateMarkUp}
            showResponseBtn
            value={item.templateMarkUp || defaultTemplateMarkup}
          />
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
