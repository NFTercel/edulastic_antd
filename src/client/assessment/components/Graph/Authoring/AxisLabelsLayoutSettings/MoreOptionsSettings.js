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
  MoreOptionsDivider,
  MoreOptionsSubHeading,
  MoreOptionsColumnContainer
} from "../../common/styled_components";
import FontSizeDropdown from "./FontSizeDropdown";
import FractionsFormatDropdown from "./FractionsFormatDropdown";
import RenderingBaseDropdown from "./RenderingBaseDropdown";

class MoreOptionsSettings extends Component {
  state = {
    leftArrowState: true,
    rightArrowState: false,
    currentFontSizeItem: {},
    currentFractionItem: {},
    currentRenderingBaseItem: {},
    showTicksState: false,
    snapToTicksState: false,
    showMinLabelStatus: true,
    showMaxLabelStatus: true
  };

  handleInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState(state => ({
      [name]: !state[value]
    }));
  };

  getDefaultFontSizeItem = () => {
    const { currentFontSizeItem } = this.state;
    const { fontSizeList } = this.props;

    const defaultSelectedItem = fontSizeList.find(item => item.selected);
    const isCurrentFontSizeItemUndefined = currentFontSizeItem && currentFontSizeItem.selected === undefined;

    if (defaultSelectedItem && isCurrentFontSizeItemUndefined) {
      this.setState(() => ({
        currentFontSizeItem: defaultSelectedItem
      }));
    }
  };

  changeFontSize = e => {
    const { fontSizeList } = this.props;
    const { value } = e.target;
    const findItem = fontSizeList.find(fzItem => fzItem.value.toLowerCase() === value.toLowerCase());

    if (findItem) {
      findItem.selected = true;

      this.setState(() => ({
        currentFontSizeItem: findItem
      }));
    }
  };

  changeFractionsFormat = e => {
    const { fractionsFormatList } = this.props;
    const { value } = e.target;
    const findItem = fractionsFormatList.find(fractionItem => fractionItem.value.toLowerCase() === value.toLowerCase());

    if (findItem) {
      findItem.selected = true;

      this.setState(() => ({
        currentFractionItem: findItem
      }));
    }
  };

  changeRenderingBase = e => {
    const { renderingBaseList } = this.props;
    const { value } = e.target;
    const findItem = renderingBaseList.find(renderingItem => renderingItem.value.toLowerCase() === value.toLowerCase());

    if (findItem) {
      findItem.selected = true;

      this.setState(() => ({
        currentRenderingBaseItem: findItem
      }));
    }
  };

  componentDidMount() {
    this.getDefaultFontSizeItem();
  }

  render() {
    const {
      leftArrowState,
      rightArrowState,
      currentFontSizeItem,
      currentFractionItem,
      currentRenderingBaseItem,
      showTicksState,
      snapToTicksState,
      showMinLabelStatus,
      showMaxLabelStatus
    } = this.state;
    const { t, fontSizeList, fractionsFormatList, renderingBaseList } = this.props;

    return (
      <Fragment>
        <MoreOptionsContainer>
          <MoreOptionsSubHeading>{t("component.graphing.layoutoptionstitle")}</MoreOptionsSubHeading>

          <MoreOptionsColumnContainer>
            <MoreOptionsColumn>
              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.width")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="550px" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.linemargin")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="5px" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.titleposition")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="50" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.separationdistancex")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="10px" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <Checkbox
                  label={t("component.graphing.layoutoptions.showleftarrow")}
                  onChange={this.handleInputChange}
                  checked={leftArrowState}
                />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <FontSizeDropdown
                  t={t}
                  fontSizeList={fontSizeList}
                  currentItem={currentFontSizeItem}
                  onChangeFontSize={this.changeFontSize}
                />
              </MoreOptionsRow>
            </MoreOptionsColumn>

            <MoreOptionsColumn>
              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.height")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="auto" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.lineposition")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="35" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.pointboxposition")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="60" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.layoutoptions.separationdistancey")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="20px" />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <Checkbox
                  label={t("component.graphing.layoutoptions.showrightarrow")}
                  onChange={this.handleInputChange}
                  checked={rightArrowState}
                />
              </MoreOptionsRow>
            </MoreOptionsColumn>
          </MoreOptionsColumnContainer>
        </MoreOptionsContainer>

        <MoreOptionsDivider />

        <MoreOptionsContainer>
          <MoreOptionsSubHeading>{t("component.graphing.ticksoptionstitle")}</MoreOptionsSubHeading>

          <MoreOptionsColumnContainer>
            <MoreOptionsColumn>
              <MoreOptionsRow>
                <Checkbox
                  label={t("component.graphing.ticksoptions.showticks")}
                  onChange={this.handleInputChange}
                  checked={showTicksState}
                />
              </MoreOptionsRow>
              <MoreOptionsRow>
                <Checkbox
                  label={t("component.graphing.ticksoptions.snaptoticks")}
                  onChange={this.handleInputChange}
                  checked={snapToTicksState}
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
                <MoreOptionsInput type="number" defaultValue="1" />
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

        <MoreOptionsDivider />

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
                  onChange={this.handleInputChange}
                  checked={showMinLabelStatus}
                />
              </MoreOptionsRow>
            </MoreOptionsColumn>

            <MoreOptionsColumn>
              <MoreOptionsRow>
                <MoreOptionsLabel>{t("component.graphing.labelsoptions.displayspecificpoints")}</MoreOptionsLabel>
                <MoreOptionsInput type="text" defaultValue="" />
              </MoreOptionsRow>
              <MoreOptionsRow>
                <Checkbox
                  label={t("component.graphing.labelsoptions.showmax")}
                  onChange={this.handleInputChange}
                  checked={showMaxLabelStatus}
                />
              </MoreOptionsRow>
            </MoreOptionsColumn>
          </MoreOptionsColumnContainer>
        </MoreOptionsContainer>

        <MoreOptionsDivider />
      </Fragment>
    );
  }
}

MoreOptionsSettings.propTypes = {
  t: PropTypes.func.isRequired,
  fontSizeList: PropTypes.array.isRequired,
  fractionsFormatList: PropTypes.array.isRequired,
  renderingBaseList: PropTypes.array.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(MoreOptionsSettings);
