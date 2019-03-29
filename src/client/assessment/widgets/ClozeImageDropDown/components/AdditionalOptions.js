import React, { Component } from "react";
import { Checkbox } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { arrayMove } from "react-sortable-hoc";
import produce from "immer";

import { TextField, PaddingDiv } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../../author/QuestionEditor/ducks";

import SortableList from "../../../components/SortableList";
import { AddNewChoiceBtn } from "../../../styled/AddNewChoiceBtn";
import { Heading } from "../../../styled/WidgetOptions/Heading";
import { Row } from "../../../styled/WidgetOptions/Row";
import { Col } from "../../../styled/WidgetOptions/Col";
import { Label } from "../../../styled/WidgetOptions/Label";

class AdditionalOptions extends Component {
  changeOption(prop, value) {
    const { onChange } = this.props;
    onChange(prop, value);
  }

  onSortEnd({ oldIndex, newIndex }) {
    const { questionData, setQuestionData } = this.props;
    setQuestionData(
      produce(questionData, draft => {
        draft.distractorRationaleOptions = arrayMove(draft.distractorRationaleOptions, oldIndex, newIndex);
      })
    );
  }

  remove(index) {
    const { questionData, setQuestionData } = this.props;
    setQuestionData(
      produce(questionData, draft => {
        draft.distractorRationaleOptions.splice(index, 1);
      })
    );
  }

  editOptions(index, e) {
    const { questionData, setQuestionData } = this.props;
    setQuestionData(
      produce(questionData, draft => {
        if (draft.distractorRationaleOptions === undefined) {
          draft.distractorRationaleOptions = [];
        }
        draft.distractorRationaleOptions[index] = e.target.value;
      })
    );
  }

  addNewChoiceBtn() {
    const { questionData, setQuestionData, t } = this.props;
    setQuestionData(
      produce(questionData, draft => {
        if (draft.distractorRationaleOptions === undefined) {
          draft.distractorRationaleOptions = [];
        }
        draft.distractorRationaleOptions.push(t("component.cloze.imageDropDown.newChoice"));
      })
    );
  }

  render() {
    const { t, questionData } = this.props;
    return (
      <PaddingDiv bottom={30}>
        <Heading>{t("component.cloze.imageDropDown.additionaloptions")}</Heading>
        <Row>
          <Col md={12}>
            <Label>{t("component.options.stimulusreviewonly")}</Label>
            <TextField
              disabled={false}
              containerStyle={{ width: "80%" }}
              onChange={e => this.changeStimulus("stimulusReviewonly", e.target.value)}
              value={questionData.stimulusReviewonly}
            />
          </Col>
          <Col md={12}>
            <Label>{t("component.options.instructorstimulus")}</Label>
            <TextField
              disabled={false}
              containerStyle={{ width: "80%" }}
              onChange={e => this.changeStimulus("instructorStimulus", e.target.value)}
              value={questionData.instructorStimulus}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Label>{t("component.options.rubricreference")}</Label>
            <TextField
              disabled={false}
              containerStyle={{ width: "80%" }}
              onChange={e => this.changeStimulus("rubricReference", e.target.value)}
              value={questionData.rubricReference}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Label>{t("component.options.sampleanswer")}</Label>
            <TextField
              disabled={false}
              onChange={e => this.changeStimulus("sampleAnswer", e.target.value)}
              value={questionData.sampleAnswer}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Label>{t("component.options.distractorrationale")}</Label>
            <TextField
              disabled={false}
              onChange={e => this.changeStimulus("distractorRationale", e.target.value)}
              value={questionData.distractorRationale}
            />
            <Checkbox
              checked={questionData.distractorRationalePerResponse}
              onChange={e => this.onChange("distractorRationalePerResponse", e.target.checked)}
              size="large"
              style={{ width: "80%" }}
            >
              {t("component.options.distractorRationalePerResponse")}
            </Checkbox>
          </Col>
        </Row>
        <PaddingDiv top={30}>
          <SortableList
            items={questionData.distractorRationaleOptions || []}
            onSortEnd={params => this.onSortEnd(params)}
            useDragHandle
            onRemove={index => this.remove(index)}
            onChange={(index, e) => this.editOptions(index, e)}
          />
          <PaddingDiv top={6}>
            <AddNewChoiceBtn onClick={() => this.addNewChoiceBtn()}>
              {t("component.cloze.imageDropDown.addnewchoice")}
            </AddNewChoiceBtn>
          </PaddingDiv>
        </PaddingDiv>
      </PaddingDiv>
    );
  }
}

AdditionalOptions.propTypes = {
  setQuestionData: PropTypes.func.isRequired,
  questionData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

AdditionalOptions.defaultProps = {};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    state => ({
      questionData: getQuestionDataSelector(state)
    }),
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(AdditionalOptions);
