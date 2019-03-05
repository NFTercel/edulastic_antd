import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { Checkbox, Select } from "@edulastic/common";
import {
  MoreOptionsContainer,
  MoreOptionsInput,
  MoreOptionsLabel,
  MoreOptionsRow,
  MoreOptionsSubHeading,
  Row,
  Col,
  MoreOptionsColumnContainer,
  MoreOptionsColumn
} from "../../common/styled_components";
import FontSizeDropdown from "../AxisLabelsLayoutSettings/FontSizeDropdown";
import RenderingBaseDropdown from "../AxisLabelsLayoutSettings/RenderingBaseDropdown";
import { QuestionSection } from "../";

class AxisSegmentsMoreOptions extends Component {
  state = {
    layout: "horizontal",
    minWidth: "550px",
    renderingBase: "lineMinValue",
    labelDisplaySpecPoints: "",
    currentRenderingBaseItem: {}
  };

  handleNumberlineCheckboxChange = (name, checked) => {
    const { numberlineAxis, setNumberline } = this.props;
    setNumberline({ ...numberlineAxis, [name]: !checked });
  };

  handleNumberlineInputChange = event => {
    const {
      target: { name, value }
    } = event;

    const { numberlineAxis, setNumberline } = this.props;
    if (name !== "specificPoints" && !value) {
      setNumberline({ ...numberlineAxis, [name]: 0 });
    } else {
      setNumberline({ ...numberlineAxis, [name]: value });
    }
  };

  handleCanvasInputChange = event => {
    const {
      target: { name, value }
    } = event;

    const { canvasConfig, setCanvas } = this.props;

    if (!value) {
      setCanvas({ ...canvasConfig, [name]: 0 });
    } else {
      setCanvas({ ...canvasConfig, [name]: value });
    }
  };

  handleOptionsInputChange = event => {
    const {
      target: { name, value }
    } = event;

    const { options, setOptions } = this.props;
    if (!value) {
      setOptions({ ...options, [name]: 0 });
    } else {
      setOptions({ ...options, [name]: parseInt(value, 10) });
    }
  };

  getFontSizeItem = () => {
    const { fontSizeList, numberlineAxis } = this.props;
    const selectedItem = fontSizeList.find(item => item.value === parseInt(numberlineAxis.fontSize, 10));

    return selectedItem;
  };

  changeFontSize = event => {
    const { setNumberline, numberlineAxis } = this.props;

    setNumberline({ ...numberlineAxis, fontSize: event });
  };

  handleSelect = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleCheckbox = (name, checked) => {
    this.setState({
      [name]: !checked
    });
  };

  handleInputChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  };

  changeRenderingBase = e => {
    const { setNumberline, numberlineAxis } = this.props;

    const { renderingBaseList } = this.props;
    const { value } = e.target;
    const findItem = renderingBaseList.find(renderingItem => renderingItem.value.toLowerCase() === value.toLowerCase());

    if (findItem) {
      findItem.selected = true;

      setNumberline({ ...numberlineAxis, renderingBase: findItem.id });

      this.setState(() => ({
        currentRenderingBaseItem: findItem
      }));
    }
  };

  render() {
    const {
      t,
      orientationList,
      fontSizeList,
      renderingBaseList,
      canvasConfig,
      options,
      numberlineAxis,
      fillSections,
      cleanSections
    } = this.props;
    const { layout, minWidth, currentRenderingBaseItem } = this.state;
    return (
      <Fragment>
        <QuestionSection section="advanced" label="LAYOUT" cleanSections={cleanSections} fillSections={fillSections}>
          <MoreOptionsContainer>
            <MoreOptionsSubHeading>{t("component.graphing.layoutoptionstitle")}</MoreOptionsSubHeading>

            <Row>
              <Col md={12}>
                <Row>
                  <Col md={6} style={{ paddingRight: 20 }}>
                    <MoreOptionsRow>
                      <MoreOptionsLabel>{t("component.options.orientation")}</MoreOptionsLabel>
                      <Select
                        style={{ width: "80%" }}
                        onChange={val => this.handleSelect("layout", val)}
                        options={orientationList}
                        value={layout}
                      />
                    </MoreOptionsRow>
                  </Col>
                  <Col md={6} style={{ paddingLeft: 20 }}>
                    {layout === "horizontal" && (
                      <MoreOptionsRow>
                        <MoreOptionsLabel>{t("component.graphing.layoutoptions.width")}</MoreOptionsLabel>
                        <MoreOptionsInput
                          type="text"
                          defaultValue="600px"
                          name="layout_width"
                          onChange={this.handleOptionsInputChange}
                          value={options.layout_width}
                        />
                      </MoreOptionsRow>
                    )}
                  </Col>
                </Row>
              </Col>

              {layout === "vertical" && (
                <Col md={12}>
                  <Row>
                    <Col md={6} style={{ paddingRight: 20 }}>
                      <MoreOptionsRow>
                        <MoreOptionsLabel>{t("component.graphing.layoutoptions.minWidth")}</MoreOptionsLabel>
                        <MoreOptionsInput
                          type="text"
                          defaultValue="600px"
                          name="minWidth"
                          onChange={this.handleInputChange}
                          value={minWidth}
                        />
                      </MoreOptionsRow>
                    </Col>
                    <Col md={6} style={{ paddingLeft: 20 }}>
                      <MoreOptionsRow>
                        <MoreOptionsLabel>{t("component.graphing.layoutoptions.height")}</MoreOptionsLabel>
                        <MoreOptionsInput
                          type="text"
                          defaultValue="600px"
                          name="layout_height"
                          onChange={this.handleOptionsInputChange}
                          value={options.layout_height}
                        />
                      </MoreOptionsRow>
                    </Col>
                  </Row>
                </Col>
              )}

              <Col md={12}>
                <Row>
                  <Col md={6} style={{ paddingRight: 20 }}>
                    <MoreOptionsRow>
                      <MoreOptionsLabel>{t("component.graphing.layoutoptions.linemargin")}</MoreOptionsLabel>
                      <MoreOptionsInput
                        type="text"
                        name="margin"
                        defaultValue="75"
                        value={canvasConfig.margin}
                        onChange={this.handleCanvasInputChange}
                      />
                    </MoreOptionsRow>
                    <MoreOptionsRow>
                      <Checkbox
                        label={t("component.graphing.layoutoptions.showMinArrow")}
                        onChange={() => this.handleNumberlineCheckboxChange("leftArrow", numberlineAxis.leftArrow)}
                        name="leftArrow"
                        checked={numberlineAxis.leftArrow}
                      />
                    </MoreOptionsRow>
                    <MoreOptionsRow>
                      <Checkbox
                        label={t("component.graphing.layoutoptions.stackResponses")}
                        name="stackResponses"
                        onChange={() =>
                          this.handleNumberlineCheckboxChange("stackResponses", numberlineAxis.stackResponses)
                        }
                        checked={numberlineAxis.stackResponses}
                      />
                    </MoreOptionsRow>
                  </Col>
                  <Col md={6} style={{ paddingLeft: 20 }}>
                    <MoreOptionsRow>
                      <MoreOptionsLabel>{t("component.graphing.layoutoptions.spacingBtwStacked")}</MoreOptionsLabel>
                      <MoreOptionsInput
                        type="text"
                        defaultValue="30"
                        name="stackResponsesSpacing"
                        onChange={this.handleNumberlineInputChange}
                        value={numberlineAxis.stackResponsesSpacing}
                      />
                    </MoreOptionsRow>
                    <MoreOptionsRow>
                      <Checkbox
                        label={t("component.graphing.layoutoptions.showMaxArrow")}
                        onChange={() => this.handleNumberlineCheckboxChange("rightArrow", numberlineAxis.rightArrow)}
                        name="rightArrow"
                        checked={numberlineAxis.rightArrow}
                      />
                    </MoreOptionsRow>
                    <MoreOptionsRow>
                      <MoreOptionsLabel>{t("component.graphing.layoutoptions.fontSize")}</MoreOptionsLabel>
                      <FontSizeDropdown
                        t={t}
                        fontSizeList={fontSizeList}
                        currentItem={this.getFontSizeItem()}
                        onChangeFontSize={this.changeFontSize}
                      />
                    </MoreOptionsRow>
                  </Col>
                </Row>
              </Col>
            </Row>
          </MoreOptionsContainer>
        </QuestionSection>

        <QuestionSection section="advanced" label="TICKS" cleanSections={cleanSections} fillSections={fillSections}>
          <MoreOptionsContainer>
            <MoreOptionsSubHeading>{t("component.graphing.ticksoptionstitle")}</MoreOptionsSubHeading>

            <MoreOptionsColumnContainer>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.ticksoptions.showticks")}
                    name="showTicks"
                    onChange={() => this.handleNumberlineCheckboxChange("showTicks", numberlineAxis.showTicks)}
                    checked={numberlineAxis.showTicks}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.labelsoptions.showmax")}
                    name="showMax"
                    onChange={() => this.handleNumberlineCheckboxChange("showMax", numberlineAxis.showMax)}
                    checked={numberlineAxis.showMax}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.labelsoptions.showmin")}
                    name="showMin"
                    onChange={() => this.handleNumberlineCheckboxChange("showMin", numberlineAxis.showMin)}
                    checked={numberlineAxis.showMin}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.ticksoptions.tickdistance")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="number"
                    defaultValue="1"
                    name="ticksDistance"
                    onChange={this.handleNumberlineInputChange}
                    value={numberlineAxis.ticksDistance}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
            </MoreOptionsColumnContainer>
            <MoreOptionsColumnContainer style={{ marginTop: 20 }}>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.ticksoptions.minorTicks")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="1"
                    name="minorTicks"
                    onChange={this.handleNumberlineInputChange}
                    value={numberlineAxis.minorTicks}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>

              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.ticksoptions.renderingbase")}</MoreOptionsLabel>
                  <RenderingBaseDropdown
                    t={t}
                    renderingBaseList={renderingBaseList}
                    currentItem={currentRenderingBaseItem}
                    onChangeRenderingBase={this.changeRenderingBase}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
            </MoreOptionsColumnContainer>
          </MoreOptionsContainer>
        </QuestionSection>

        <QuestionSection section="advanced" label="LABELS" cleanSections={cleanSections} fillSections={fillSections}>
          <MoreOptionsContainer>
            <MoreOptionsSubHeading>{t("component.graphing.labelstitle")}</MoreOptionsSubHeading>

            <MoreOptionsColumnContainer>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.labelsoptions.showLabels")}
                    name="showLabels"
                    onChange={() => this.handleNumberlineCheckboxChange("showLabels", numberlineAxis.showLabels)}
                    checked={numberlineAxis.showLabels}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.labelsoptions.showmax")}
                    name="labelShowMax"
                    onChange={() => this.handleNumberlineCheckboxChange("labelShowMax", numberlineAxis.labelShowMax)}
                    checked={numberlineAxis.labelShowMax}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>

              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.labelsoptions.showmin")}
                    name="labelShowMin"
                    onChange={() => this.handleNumberlineCheckboxChange("labelShowMin", numberlineAxis.labelShowMin)}
                    checked={numberlineAxis.labelShowMin}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.labelsoptions.displayspecificpoints")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue=""
                    name="specificPoints"
                    onChange={this.handleNumberlineInputChange}
                    value={numberlineAxis.specificPoints}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
            </MoreOptionsColumnContainer>
          </MoreOptionsContainer>
        </QuestionSection>
      </Fragment>
    );
  }
}

AxisSegmentsMoreOptions.propTypes = {
  t: PropTypes.func.isRequired,
  cleanSections: PropTypes.func.isRequired,
  fillSections: PropTypes.func.isRequired,
  numberlineAxis: PropTypes.object.isRequired,
  canvasConfig: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  setCanvas: PropTypes.func.isRequired,
  setNumberline: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  orientationList: PropTypes.array,
  fontSizeList: PropTypes.array,
  renderingBaseList: PropTypes.array
};

AxisSegmentsMoreOptions.defaultProps = {
  orientationList: [],
  fontSizeList: [],
  renderingBaseList: []
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(AxisSegmentsMoreOptions);
