import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { withNamespaces } from "@edulastic/localization";
import { PaddingDiv } from "@edulastic/common";
import { QuestionSection } from "..";
import { Subtitle, StyledTextField, Label, Row, Col } from "../../common/styled_components";
import GraphToolsParams from "../../components/GraphToolsParams";
import { setQuestionDataAction } from "../../../../../author/QuestionEditor/ducks";
import QuestionTextArea from "../../../QuestionTextArea";

class GraphQuadrants extends Component {
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

  handleCanvasBlur = (event, defaultValue) => {
    const { value, name } = event.target;
    const { graphData, setQuestionData } = this.props;
    const { canvas } = graphData;

    if (!value) {
      canvas[name] = defaultValue;
      setQuestionData({ ...graphData, canvas });
    }
  };

  handleToolsChange = toolbar => {
    const { graphData, setQuestionData } = this.props;
    setQuestionData({ ...graphData, toolbar });
  };

  getToolOptions = () => [
    { value: "point", label: "Point" },
    { value: "line", label: "Line" },
    { value: "ray", label: "Ray" },
    { value: "segment", label: "Segment" },
    { value: "vector", label: "Vector" },
    { value: "circle", label: "Circle" },
    { value: "ellipse", label: "Ellipse" },
    { value: "parabola", label: "Parabola" },
    { value: "sine", label: "Sine" },
    { value: "tangent", label: "Tangent" },
    { value: "secant", label: "Secant" },
    { value: "exponent", label: "Exponent" },
    { value: "polynom", label: "Polynom" },
    { value: "logarithm", label: "Logarithm" },
    { value: "hyperbola", label: "Hyperbola" },
    { value: "polygon", label: "Polygon" },
    { value: "label", label: "Label" }
  ];

  render() {
    const { t, graphData, fillSections, cleanSections } = this.props;
    const { canvas } = graphData;

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
            onChange={this.onChangeQuestion}
            value={graphData.stimulus}
            placeholder={t("component.graphing.question.enteryourquestion")}
          />
        </QuestionSection>
        <QuestionSection
          section="main"
          label="GRAPH PARAMETERS"
          cleanSections={cleanSections}
          fillSections={fillSections}
        >
          <PaddingDiv top={4} bottom={8}>
            <Subtitle>{t("component.graphing.graphparameters")}</Subtitle>
            <Row>
              <Col paddingRight="2.5em" md={6}>
                <Label>X min</Label>
                <StyledTextField
                  width="100%"
                  type="number"
                  name="x_min"
                  value={canvas.x_min}
                  onChange={this.handleCanvasChange}
                  onBlur={event => this.handleCanvasBlur(event, -10)}
                  disabled={false}
                  step={0.1}
                />
                <Label>X max</Label>
                <StyledTextField
                  marginBottom="0"
                  width="100%"
                  type="number"
                  name="x_max"
                  value={canvas.x_max}
                  onChange={this.handleCanvasChange}
                  onBlur={event => this.handleCanvasBlur(event, 10)}
                  disabled={false}
                  step={0.1}
                />
              </Col>
              <Col paddingLeft="2.5em" md={6}>
                <div>
                  <Label>Y min</Label>
                  <StyledTextField
                    width="100%"
                    type="number"
                    name="y_min"
                    value={canvas.y_min}
                    onChange={this.handleCanvasChange}
                    onBlur={event => this.handleCanvasBlur(event, -10)}
                    disabled={false}
                    step={0.1}
                  />
                </div>
                <div>
                  <Label>Y max</Label>
                  <StyledTextField
                    marginBottom="0"
                    width="100%"
                    type="number"
                    name="y_max"
                    value={canvas.y_max}
                    onChange={this.handleCanvasChange}
                    onBlur={event => this.handleCanvasBlur(event, 10)}
                    disabled={false}
                    step={0.1}
                  />
                </div>
              </Col>
            </Row>
          </PaddingDiv>
        </QuestionSection>
        <QuestionSection section="main" label="TOOLS" cleanSections={cleanSections} fillSections={fillSections}>
          <PaddingDiv bottom={4}>
            <Subtitle>{t("component.graphing.tools")}</Subtitle>
            <GraphToolsParams
              options={this.getToolOptions()}
              toolbar={graphData.toolbar}
              onChange={this.handleToolsChange}
            />
          </PaddingDiv>
        </QuestionSection>
      </div>
    );
  }
}

GraphQuadrants.propTypes = {
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

export default enhance(GraphQuadrants);
