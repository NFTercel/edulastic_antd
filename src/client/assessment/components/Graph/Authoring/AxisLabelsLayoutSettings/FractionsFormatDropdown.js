import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { SelectContainer, Select } from "../../common/styled_components";

class FractionsFormatDropdown extends Component {
  changeFractionsFormat = e => {
    const { onChangeFractionsFormat } = this.props;
    onChangeFractionsFormat(e);
  };

  render() {
    const { t, fractionsFormatList, currentItem } = this.props;

    return (
      <SelectContainer>
        <Select value={currentItem.value} onChange={this.changeFractionsFormat}>
          {fractionsFormatList.map(item => (
            <option key={item.id} value={item.value}>
              {t(item.value)}
            </option>
          ))}
        </Select>
      </SelectContainer>
    );
  }
}

FractionsFormatDropdown.propTypes = {
  t: PropTypes.func.isRequired,
  fractionsFormatList: PropTypes.array.isRequired,
  currentItem: PropTypes.object.isRequired,
  onChangeFractionsFormat: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(FractionsFormatDropdown);
