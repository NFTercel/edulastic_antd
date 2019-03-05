import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withNamespaces } from "@edulastic/localization";
import { PaddingDiv } from "@edulastic/common";
import { Col, Label, Row, StyledTextField, Subtitle, TitleTextInput } from "../common/styled_components";
import { setQuestionDataAction } from "../../../../author/QuestionEditor/ducks";
import QuestionTextArea from "../../QuestionTextArea";
import { QuestionSection } from "./";

class AxisSegments extends Component {
  onChangeQuestion = stimulus => {
    const { graphData, setQuestionData } = this.props;
    setQuestionData({ ...graphData, stimulus });
  };

  handleCanvasChange = event => {
    const { value, name } = event.target;
    const { graphData, setQuestionData } = this.props;
    const { canvas } = graphData;

    canvas[name] = value;
    setQuestionData({ ...graphData, canvas });
  };

  handleInputChange = event => {
    const {
      target: { type, checked, value: targetValue, name }
    } = event;
    const value = type === "checkbox" ? checked : targetValue;

    this.setState({ [name]: value });
  };

  render() {
    const { t, graphData, fillSections, cleanSections } = this.props;
    const { canvas, stimulus } = graphData;

    return (
      <div>
        <QuestionSection
          section="main"
          label="COMPOSE QUESTION"
          cleanSections={cleanSections}
          fillSections={fillSections}
        >
          <Subtitle>{t("component.graphing.question.composequestion")}</Subtitle>
          <QuestionTextArea
            placeholder={t("component.graphing.question.enteryourquestion")}
            onChange={this.onChangeQuestion}
            value={stimulus}
          />
        </QuestionSection>
        <QuestionSection section="main" label="LINE" cleanSections={cleanSections} fillSections={fillSections}>
          <Subtitle>{t("component.graphing.graphline")}</Subtitle>
          <Row>
            <Col md={6}>
              <Label>{t("component.graphing.minVal")}</Label>
              <StyledTextField
                type="number"
                name="x_min"
                value={canvas.x_min}
                onChange={this.handleCanvasChange}
                disabled={false}
                step={1}
              />
              <div>
                <Label>{t("component.graphing.responseNumAllowed")}</Label>
                <StyledTextField
                  type="number"
                  name="responsesAllowed"
                  value={canvas.responsesAllowed}
                  onChange={this.handleCanvasChange}
                  disabled={false}
                  step={1}
                  min={1}
                />
              </div>
            </Col>
            <Col md={6} style={{ paddingLeft: 30 }}>
              <div>
                <Label>{t("component.graphing.maxVal")}</Label>
                <StyledTextField
                  type="number"
                  name="x_max"
                  value={canvas.x_max}
                  onChange={this.handleCanvasChange}
                  disabled={false}
                  step={1}
                />
              </div>
            </Col>
          </Row>
        </QuestionSection>

        <QuestionSection section="main" label="TITLE" cleanSections={cleanSections} fillSections={fillSections}>
          <PaddingDiv bottom={30}>
            <Subtitle>{t("component.graphing.title")}</Subtitle>
            <TitleTextInput type="text" name="title" value={canvas.title} onChange={this.handleCanvasChange} />
          </PaddingDiv>
        </QuestionSection>
      </div>
    );
  }
}

AxisSegments.propTypes = {
  t: PropTypes.func.isRequired,
  cleanSections: PropTypes.func.isRequired,
  fillSections: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(AxisSegments);
