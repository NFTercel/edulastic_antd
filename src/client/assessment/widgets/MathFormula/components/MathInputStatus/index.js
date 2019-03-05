import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./styled/Wrapper";
import { Icon } from "./styled/Icon";
import { IconCheck } from "./styled/IconCheck";
import { IconClose } from "./styled/IconClose";

class MathInputStatus extends React.PureComponent {
  render() {
    const { valid } = this.props;
    return (
      <Wrapper>
        <Icon>
          {valid && <IconCheck />}
          {!valid && <IconClose />}
        </Icon>
      </Wrapper>
    );
  }
}

MathInputStatus.propTypes = {
  valid: PropTypes.bool
};

MathInputStatus.defaultProps = {
  valid: false
};

export default MathInputStatus;
