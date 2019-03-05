import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { Select } from "@edulastic/common";

class FontSizeDropdown extends Component {
  changeFontSize = e => {
    const { onChangeFontSize } = this.props;
    onChangeFontSize(e);
  };

  render() {
    const { fontSizeList, currentItem } = this.props;

    return (
      <Select style={{ width: "77%" }} value={currentItem.value} onChange={this.changeFontSize} options={fontSizeList}>
      </Select>
    );
  }
}

FontSizeDropdown.propTypes = {
  fontSizeList: PropTypes.array.isRequired,
  currentItem: PropTypes.object.isRequired,
  onChangeFontSize: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(FontSizeDropdown);
