import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { MoreOptions, MoreOptionsHeading } from "../../common/styled_components";
import MoreOptionsSettings from "./MoreOptionsSettings";

class AxisLabelsLayoutSettings extends Component {
  updateClickOnMoreOptions = () => {
    const { onClickMoreOptions, isMoreOptionsOpen } = this.props;

    onClickMoreOptions(!isMoreOptionsOpen);
  };

  render() {
    const { isMoreOptionsOpen, fontSizeList, fractionsFormatList, renderingBaseList, t } = this.props;

    return (
      <Fragment>
        <MoreOptions>
          <MoreOptionsHeading onClick={this.updateClickOnMoreOptions} isOpen={isMoreOptionsOpen}>
            {t("component.graphing.optionstitle")}
          </MoreOptionsHeading>

          {isMoreOptionsOpen ? (
            <MoreOptionsSettings
              t={t}
              fontSizeList={fontSizeList}
              fractionsFormatList={fractionsFormatList}
              renderingBaseList={renderingBaseList}
            />
          ) : null}
        </MoreOptions>
      </Fragment>
    );
  }
}

AxisLabelsLayoutSettings.propTypes = {
  t: PropTypes.func.isRequired,
  onClickMoreOptions: PropTypes.func.isRequired,
  isMoreOptionsOpen: PropTypes.bool.isRequired,
  fontSizeList: PropTypes.array.isRequired,
  fractionsFormatList: PropTypes.array.isRequired,
  renderingBaseList: PropTypes.array.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(AxisLabelsLayoutSettings);
