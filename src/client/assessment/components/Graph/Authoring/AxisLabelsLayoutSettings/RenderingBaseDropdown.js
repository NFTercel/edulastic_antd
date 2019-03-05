import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { SelectContainer, Select } from "../../common/styled_components";

class RenderingBaseDropdown extends Component {
  changeFractionsFormat = e => {
    const { onChangeRenderingBase } = this.props;
    onChangeRenderingBase(e);
  };

  render() {
    const { t, renderingBaseList, currentItem } = this.props;

    return (
      <SelectContainer>
        <Select value={currentItem.value} onChange={this.changeFractionsFormat}>
          {renderingBaseList.map(item => (
            <option key={item.id} value={item.value}>
              {t(item.value)}
            </option>
          ))}
        </Select>
      </SelectContainer>
    );
  }
}

RenderingBaseDropdown.propTypes = {
  t: PropTypes.func.isRequired,
  renderingBaseList: PropTypes.array.isRequired,
  currentItem: PropTypes.object.isRequired,
  onChangeRenderingBase: PropTypes.func.isRequired
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(RenderingBaseDropdown);
