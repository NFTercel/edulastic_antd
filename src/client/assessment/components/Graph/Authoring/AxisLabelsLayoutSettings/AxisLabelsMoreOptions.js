import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Checkbox } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import {
  MoreOptionsContainer,
  MoreOptionsColumn,
  MoreOptionsRow,
  MoreOptionsLabel,
  MoreOptionsInput,
  MoreOptionsSubHeading,
  MoreOptionsColumnContainer
} from "../../common/styled_components";
import FontSizeDropdown from "./FontSizeDropdown";
import FractionsFormatDropdown from "./FractionsFormatDropdown";
import RenderingBaseDropdown from "./RenderingBaseDropdown";
import { QuestionSection, ScoreSettings } from "..";

class AxisLabelsMoreOptions extends Component {
  state = {
    currentFractionItem: {},
    currentRenderingBaseItem: {}
  };

  handleNumberlineCheckboxChange = (name, checked) => {
    const { graphData, setNumberline } = this.props;
    const { numberlineAxis } = graphData;
    setNumberline({ ...numberlineAxis, [name]: !checked });
  };

  handleNumberlineInputChange = event => {
    const {
      target: { name, value }
    } = event;
    const { graphData, setNumberline } = this.props;
    const { numberlineAxis } = graphData;
    if (name !== "specificPoints" && name !== "ticksDistance" && !value) {
      setNumberline({ ...numberlineAxis, [name]: 0 });
    } else {
      setNumberline({ ...numberlineAxis, [name]: value });
    }
  };

  handleCanvasInputChange = event => {
    const {
      target: { name, value }
    } = event;
    const { graphData, setCanvas } = this.props;
    const { canvas } = graphData;
    if (!value) {
      setCanvas({ ...canvas, [name]: 0 });
    } else {
      setCanvas({ ...canvas, [name]: value });
    }
  };

  handleOptionsInputChange = event => {
    const {
      target: { name, value }
    } = event;
    const { graphData, setOptions } = this.props;
    const { ui_style } = graphData;

    if (!value) {
      setOptions({ ...ui_style, [name]: 0 });
    } else {
      setOptions({ ...ui_style, [name]: parseInt(value, 10) });
    }
  };

  getFontSizeItem = () => {
    const { fontSizeList, graphData } = this.props;
    const { numberlineAxis } = graphData;
    return fontSizeList.find(item => item.value === parseInt(numberlineAxis.fontSize, 10));
  };

  changeFontSize = event => {
    const { setNumberline, graphData } = this.props;
    const { numberlineAxis } = graphData;
    setNumberline({ ...numberlineAxis, fontSize: event });
  };

  changeFractionsFormat = e => {
    const { setNumberline, graphData } = this.props;
    const { numberlineAxis } = graphData;

    const { fractionsFormatList } = this.props;
    const { value } = e.target;
    const findItem = fractionsFormatList.find(fractionItem => fractionItem.value.toLowerCase() === value.toLowerCase());

    if (findItem) {
      findItem.selected = true;

      setNumberline({ ...numberlineAxis, fractionsFormat: findItem.id });

      this.setState(() => ({
        currentFractionItem: findItem
      }));
    }
  };

  changeRenderingBase = e => {
    const { setNumberline, graphData } = this.props;
    const { numberlineAxis } = graphData;

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
    const { currentFractionItem, currentRenderingBaseItem } = this.state;

    const {
      t,
      fontSizeList,
      fractionsFormatList,
      renderingBaseList,
      fillSections,
      cleanSections,
      graphData,
      setValidation
    } = this.props;

    const { canvas, ui_style, numberlineAxis } = graphData;

    return (
      <Fragment>
        <QuestionSection section="advanced" label="SCORING" cleanSections={cleanSections} fillSections={fillSections}>
          <ScoreSettings showSelect={false} setValidation={setValidation} graphData={graphData} />
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
                    name="layout_width"
                    defaultValue="550"
                    value={ui_style.layout_width}
                    onChange={this.handleOptionsInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.linemargin")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    name="margin"
                    defaultValue="15"
                    value={canvas.margin}
                    onChange={this.handleCanvasInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.titleposition")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    name="title_position"
                    defaultValue="50"
                    value={ui_style.title_position}
                    onChange={this.handleOptionsInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.separationdistancex")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    name="separationDistanceX"
                    defaultValue="10"
                    value={numberlineAxis.separationDistanceX}
                    onChange={this.handleNumberlineInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.layoutoptions.showleftarrow")}
                    onChange={() => this.handleNumberlineCheckboxChange("leftArrow", numberlineAxis.leftArrow)}
                    name="leftArrow"
                    checked={numberlineAxis.leftArrow}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <FontSizeDropdown
                    t={t}
                    fontSizeList={fontSizeList}
                    currentItem={this.getFontSizeItem()}
                    onChangeFontSize={this.changeFontSize}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>

              <MoreOptionsColumn>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.height")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    name="layout_height"
                    defaultValue="auto"
                    value={ui_style.layout_height}
                    onChange={this.handleOptionsInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.lineposition")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="35"
                    name="line_position"
                    value={ui_style.line_position}
                    onChange={this.handleOptionsInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.pointboxposition")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="60"
                    name="point_box_position"
                    value={ui_style.point_box_position}
                    onChange={this.handleOptionsInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.layoutoptions.separationdistancey")}</MoreOptionsLabel>
                  <MoreOptionsInput
                    type="text"
                    defaultValue="20"
                    name="separationDistanceY"
                    value={numberlineAxis.separationDistanceY}
                    onChange={this.handleNumberlineInputChange}
                  />
                </MoreOptionsRow>

                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.layoutoptions.showrightarrow")}
                    name="rightArrow"
                    onChange={() => this.handleNumberlineCheckboxChange("rightArrow", numberlineAxis.rightArrow)}
                    checked={numberlineAxis.rightArrow}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>
            </MoreOptionsColumnContainer>
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
                    label={t("component.graphing.ticksoptions.snaptoticks")}
                    name="snapToTicks"
                    onChange={() => this.handleNumberlineCheckboxChange("snapToTicks", numberlineAxis.snapToTicks)}
                    checked={numberlineAxis.snapToTicks}
                  />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <MoreOptionsLabel>{t("component.graphing.ticksoptions.fractionsformat")}</MoreOptionsLabel>

                  <FractionsFormatDropdown
                    t={t}
                    fractionsFormatList={fractionsFormatList}
                    currentItem={currentFractionItem}
                    onChangeFractionsFormat={this.changeFractionsFormat}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>

              <MoreOptionsColumn>
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
                  <MoreOptionsLabel>{t("component.graphing.labelsoptions.frequency")}</MoreOptionsLabel>
                  <MoreOptionsInput type="number" defaultValue="1" />
                </MoreOptionsRow>
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.labelsoptions.showmin")}
                    onChange={() => this.handleNumberlineCheckboxChange("showMin", numberlineAxis.showMin)}
                    checked={numberlineAxis.showMin}
                  />
                </MoreOptionsRow>
              </MoreOptionsColumn>

              <MoreOptionsColumn>
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
                <MoreOptionsRow>
                  <Checkbox
                    label={t("component.graphing.labelsoptions.showmax")}
                    onChange={() => this.handleNumberlineCheckboxChange("showMax", numberlineAxis.showMax)}
                    checked={numberlineAxis.showMax}
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

AxisLabelsMoreOptions.propTypes = {
  t: PropTypes.func.isRequired,
  cleanSections: PropTypes.func.isRequired,
  fillSections: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  fontSizeList: PropTypes.array.isRequired,
  fractionsFormatList: PropTypes.array.isRequired,
  renderingBaseList: PropTypes.array.isRequired,
  setOptions: PropTypes.func.isRequired,
  setNumberline: PropTypes.func.isRequired,
  setCanvas: PropTypes.func.isRequired,
  setValidation: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(AxisLabelsMoreOptions);
