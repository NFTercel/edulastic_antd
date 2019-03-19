import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { Checkbox, Select } from "@edulastic/common";
import {
  MoreOptionsContainer,
  MoreOptionsColumn,
  MoreOptionsColumnContainer,
  MoreOptionsInput,
  MoreOptionsInputSmall,
  MoreOptionsLabel,
  MoreOptionsRow,
  MoreOptionsRowInline,
  MoreOptionsSubHeading
} from "../../common/styled_components";
import { GraphDisplay } from "../../Display";
import { AnnotationSettings, AdditionalSettings, ControlsSettings, QuestionSection, ScoreSettings } from "..";

class QuadrantsMoreOptions extends Component {
  handleCheckbox = (name, checked) => {
    const { graphData, setOptions } = this.props;
    const { ui_style } = graphData;
    setOptions({ ...ui_style, [name]: !checked });
  };

  handleExtraOptionsChange = event => {
    const {
      target: { name, value }
    } = event;
    const { graphData, setExtras } = this.props;
    const { extra_options } = graphData;
    setExtras({ ...extra_options, [name]: value });
  };

  handleInputChange = event => {
    const {
      target: { name, value }
    } = event;
    const { graphData, setOptions } = this.props;
    const { ui_style } = graphData;
    setOptions({ ...ui_style, [name]: value });
  };

  handleSelect = (name, value) => {
    const { graphData, setOptions } = this.props;
    const { ui_style } = graphData;
    setOptions({ ...ui_style, [name]: value });
  };

  handleBgImgCheckbox = (name, checked) => {
    const { graphData, setBgImg } = this.props;
    const { background_image } = graphData;
    setBgImg({ ...background_image, [name]: !checked });
  };

  handleBgImgInputChange = event => {
    const {
      target: { name, value }
    } = event;
    const { graphData, setBgImg } = this.props;
    const { background_image } = graphData;
    setBgImg({ ...background_image, [name]: value });
  };

  render() {
    const {
      t,
      graphData,
      stemNumerationList,
      fontSizeList,
      setBgShapes,
      fillSections,
      cleanSections,
      setControls,
      setAnnotation,
      setValidation
    } = this.props;

    const { ui_style, background_image, controlbar, annotation, extra_options } = graphData;

    const {
      drawLabelZero,
      displayPositionOnHover,
      currentStemNum,
      currentFontSize,
      xShowAxisLabel,
      xHideTicks,
      xDrawLabel,
      xMaxArrow,
      xMinArrow,
      xCommaInLabel,
      yShowAxisLabel,
      yHideTicks,
      yDrawLabel,
      yMaxArrow,
      yMinArrow,
      yCommaInLabel,
      xDistance,
      yDistance,
      xTickDistance,
      yTickDistance,
      layout_width,
      layout_height,
      layout_margin,
      layout_snapto,
      xAxisLabel,
      yAxisLabel
    } = ui_style;

    return (
      <Fragment>
        <QuestionSection section="advanced" label="SCORING" cleanSections={cleanSections} fillSections={fillSections}>
          <ScoreSettings setValidation={setValidation} graphData={graphData} />
        </QuestionSection>

        <QuestionSection section="advanced" label="LAYOUT" cleanSections={cleanSections} fillSections={fillSections}>
          <MoreOptionsContainer>
            <MoreOptionsSubHeading>{t("component.graphing.layoutoptionstitle")}</MoreOptionsSubHeading>

            <MoreOptionsColumnContainer>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.width")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="600"
                    name="layout_width"
                    value={layout_width}
                    onChange={this.handleInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.margin")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="0"
                    name="layout_margin"
                    value={layout_margin}
                    onChange={this.handleInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "16px" }}>
                  <Checkbox
                    label={t("component.graphing.layoutoptions.drawLabelzero")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("drawLabelZero", drawLabelZero)}
                    checked={drawLabelZero}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.stemNumeration")}</MoreOptionsLabel>
                  <Select
                    style={{ width: "77%", marginTop: "11px" }}
                    onChange={val => this.handleSelect("currentStemNum", val)}
                    options={stemNumerationList}
                    value={currentStemNum}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>

              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.height")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="600"
                    name="layout_height"
                    value={layout_height}
                    onChange={this.handleInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.snapTo")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="grid"
                    name="layout_snapto"
                    value={layout_snapto}
                    onChange={this.handleInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "16px" }}>
                  <Checkbox
                    label={t("component.graphing.layoutoptions.displayPositionOnHover")}
                    name="displayPositionOnHover"
                    onChange={() => this.handleCheckbox("displayPositionOnHover", displayPositionOnHover)}
                    checked={displayPositionOnHover}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.fontSize")}</MoreOptionsLabel>
                  <Select
                    style={{ width: "77%", marginTop: "11px" }}
                    onChange={val => this.handleSelect("currentFontSize", val)}
                    options={fontSizeList}
                    value={currentFontSize}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
            </MoreOptionsColumnContainer>
          </MoreOptionsContainer>
        </QuestionSection>

        <QuestionSection section="advanced" label="GRID" cleanSections={cleanSections} fillSections={fillSections}>
          <MoreOptionsContainer>
            <MoreOptionsSubHeading>{t("component.graphing.grid_options.grid")}</MoreOptionsSubHeading>

            <MoreOptionsColumnContainer>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.grid_options.axis_x")}</MoreOptionsLabel>
                </MoreOptionsRow>
                <MoreOptionsRowInline>
                  <MoreOptionsInputSmall
                    type="number"
                    defaultValue="1"
                    name="xDistance"
                    value={xDistance}
                    onChange={this.handleInputChange}
                  />
                  <MoreOptionsLabel style={{ marginLeft: "29px" }}>
                    {t("component.graphing.grid_options.x_distance")}
                  </MoreOptionsLabel>
                </MoreOptionsRowInline>
                <MoreOptionsRowInline>
                  <MoreOptionsInputSmall
                    type="number"
                    name="xTickDistance"
                    value={xTickDistance}
                    onChange={this.handleInputChange}
                  />
                  <MoreOptionsLabel style={{ marginLeft: "29px" }}>
                    {t("component.graphing.grid_options.tick_distance")}
                  </MoreOptionsLabel>
                </MoreOptionsRowInline>

                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.show_axis_label")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("xShowAxisLabel", xShowAxisLabel)}
                    checked={xShowAxisLabel}
                  />
                </MoreOptionsRow>
                {xShowAxisLabel && (
                  <MoreOptionsRow style={{ marginTop: "16px" }}>
                    <MoreOptionsInput
                      type="text"
                      defaultValue="X"
                      style={{ width: "7em", marginTop: 0 }}
                      name="xAxisLabel"
                      value={xAxisLabel}
                      onChange={this.handleInputChange}
                    />
                  </MoreOptionsRow>
                )}
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.hide_ticks")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("xHideTicks", xHideTicks)}
                    checked={xHideTicks}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.draw_label")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("xDrawLabel", xDrawLabel)}
                    checked={xDrawLabel}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.min_arrow")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("xMinArrow", xMinArrow)}
                    checked={xMinArrow}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.max_arrow")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("xMaxArrow", xMaxArrow)}
                    checked={xMaxArrow}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.comma_in_label")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("xCommaInLabel", xCommaInLabel)}
                    checked={xCommaInLabel}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>

              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.grid_options.axis_y")}</MoreOptionsLabel>
                </MoreOptionsRow>
                <MoreOptionsRowInline>
                  <MoreOptionsInputSmall
                    type="number"
                    defaultValue="1"
                    style={{ width: "7em", marginTop: 0 }}
                    name="yDistance"
                    value={yDistance}
                    onChange={this.handleInputChange}
                  />
                  <MoreOptionsLabel style={{ marginLeft: "29px" }}>
                    {t("component.graphing.grid_options.y_distance")}
                  </MoreOptionsLabel>
                </MoreOptionsRowInline>
                <MoreOptionsRowInline>
                  <MoreOptionsInputSmall
                    type="number"
                    style={{ width: "7em", marginTop: 0 }}
                    name="yTickDistance"
                    value={yTickDistance}
                    onChange={this.handleInputChange}
                  />
                  <MoreOptionsLabel style={{ marginLeft: "29px" }}>
                    {t("component.graphing.grid_options.tick_distance")}
                  </MoreOptionsLabel>
                </MoreOptionsRowInline>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.show_axis_label")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("yShowAxisLabel", yShowAxisLabel)}
                    checked={yShowAxisLabel}
                  />
                </MoreOptionsRow>
                {yShowAxisLabel && (
                  <MoreOptionsRow style={{ marginTop: "16px" }}>
                    <MoreOptionsInput
                      type="text"
                      defaultValue="X"
                      style={{ width: "7em", marginTop: 0 }}
                      name="yAxisLabel"
                      value={yAxisLabel}
                      onChange={this.handleInputChange}
                    />
                  </MoreOptionsRow>
                )}
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.hide_ticks")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("yHideTicks", yHideTicks)}
                    checked={yHideTicks}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.draw_label")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("yDrawLabel", yDrawLabel)}
                    checked={yDrawLabel}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.min_arrow")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("yMinArrow", yMinArrow)}
                    checked={yMinArrow}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.max_arrow")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("yMaxArrow", yMaxArrow)}
                    checked={yMaxArrow}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "40px" }}>
                  <Checkbox
                    label={t("component.graphing.grid_options.comma_in_label")}
                    name="drawLabelZero"
                    onChange={() => this.handleCheckbox("yCommaInLabel", yCommaInLabel)}
                    checked={yCommaInLabel}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
            </MoreOptionsColumnContainer>
          </MoreOptionsContainer>
        </QuestionSection>

        <QuestionSection section="advanced" label="CONTROLS" cleanSections={cleanSections} fillSections={fillSections}>
          <ControlsSettings onChange={setControls} controlbar={controlbar} />
        </QuestionSection>

        <QuestionSection
          section="advanced"
          label="ANNOTATION"
          cleanSections={cleanSections}
          fillSections={fillSections}
        >
          <AnnotationSettings annotation={annotation} setAnnotation={setAnnotation} />
        </QuestionSection>

        <QuestionSection
          section="advanced"
          label="BACKGROUND IMAGE"
          cleanSections={cleanSections}
          fillSections={fillSections}
        >
          <MoreOptionsContainer>
            <MoreOptionsSubHeading>{t("component.graphing.background_options.background_image")}</MoreOptionsSubHeading>
            <MoreOptionsRow>
              <MoreOptionsLabel>{t("component.graphing.background_options.image_url")}</MoreOptionsLabel>
              <MoreOptionsInput
                style={{ width: "88.5%" }}
                type="text"
                defaultValue=""
                name="src"
                value={background_image.src}
                onChange={this.handleBgImgInputChange}
              />
            </MoreOptionsRow>
            <MoreOptionsColumnContainer>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.background_options.height")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue=""
                    name="height"
                    value={background_image.height}
                    onChange={this.handleBgImgInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>
                    {t("component.graphing.background_options.x_axis_image_position")}
                  </MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue=""
                    name="x"
                    value={background_image.x}
                    onChange={this.handleBgImgInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.background_options.opacity")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue=""
                    name="opacity"
                    value={background_image.opacity}
                    onChange={this.handleBgImgInputChange}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.background_options.width")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue=""
                    name="width"
                    value={background_image.width}
                    onChange={this.handleBgImgInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>
                    {t("component.graphing.background_options.y_axis_image_position")}
                  </MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue=""
                    name="y"
                    value={background_image.y}
                    onChange={this.handleBgImgInputChange}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow style={{ marginTop: "58px" }}>
                  <Checkbox
                    label={t("component.graphing.background_options.show_bg_shape_points")}
                    name="showShapePoints"
                    onChange={() => this.handleBgImgCheckbox("showShapePoints", background_image.showShapePoints)}
                    checked={background_image.showShapePoints}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
            </MoreOptionsColumnContainer>
          </MoreOptionsContainer>
        </QuestionSection>

        <QuestionSection
          section="advanced"
          label="BACKGROUND SHAPES"
          cleanSections={cleanSections}
          fillSections={fillSections}
        >
          <MoreOptionsContainer>
            <MoreOptionsSubHeading>{t("component.graphing.background_shapes")}</MoreOptionsSubHeading>
            <MoreOptionsRow>
              <GraphDisplay
                graphData={graphData}
                onChange={setBgShapes}
                elements={graphData.background_shapes}
                changePreviewTab={() => {}}
                shapes={true}
              />
            </MoreOptionsRow>
          </MoreOptionsContainer>
        </QuestionSection>
        <QuestionSection
          section="advanced"
          label="ADDITIONAL OPTIONS"
          cleanSections={cleanSections}
          fillSections={fillSections}
          marginLast="0"
        >
          <AdditionalSettings handleChange={this.handleExtraOptionsChange} {...extra_options} />
        </QuestionSection>
      </Fragment>
    );
  }
}

QuadrantsMoreOptions.propTypes = {
  t: PropTypes.func.isRequired,
  cleanSections: PropTypes.func.isRequired,
  fillSections: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  stemNumerationList: PropTypes.array.isRequired,
  fontSizeList: PropTypes.array.isRequired,
  setExtras: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
  setBgImg: PropTypes.func.isRequired,
  setBgShapes: PropTypes.func.isRequired,
  setControls: PropTypes.func.isRequired,
  setAnnotation: PropTypes.func.isRequired,
  setValidation: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(QuadrantsMoreOptions);
