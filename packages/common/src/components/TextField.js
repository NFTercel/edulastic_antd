import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { grey, mainBlueColor } from '@edulastic/colors';

class TextField extends Component {
  state = {
    referenceEditable: false
  };

  onIconClick = () => {
    const { referenceEditable } = this.state;
    this.setState({ referenceEditable: !referenceEditable });
  };

  render() {
    const {
      icon,
      height,
      style,
      containerStyle,
      onChange,
      onBlur,
      ...restProps
    } = this.props;
    const { referenceEditable } = this.state;
    return (
      <Container height={height} style={containerStyle}>
        <Field
          disabled={!referenceEditable}
          type="text"
          style={style}
          referenceEditable={referenceEditable}
          {...restProps}
          onChange={onChange}
          onBlur={e => {
            this.onIconClick();
            onBlur(e);
          }}
        />
        {icon && <Icon onClick={this.onIconClick}>{icon}</Icon>}
      </Container>
    );
  }
}

TextField.propTypes = {
  icon: PropTypes.any,
  height: PropTypes.string,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
};

TextField.defaultProps = {
  icon: null,
  height: '45px',
  style: {},
  containerStyle: {},
  onBlur: () => {}
};

export default TextField;

const Container = styled.span`
  position: relative;
  height: ${({ height }) => height};
  width: 100%;
`;

const Icon = styled.span`
  position: absolute;
  right: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  top: 0;

  &:hover {
    cursor: pointer;
  }
`;

const Field = styled.input`
  border: 1px solid ${props => (props.referenceEditable ? mainBlueColor : grey)};
  border-radius: 4px;
  min-height: 100%;
  width: 100%;
  padding: 10px 35px;
  color: #7a7a7a;
  outline: none;
  font-size: 13px;
  letter-spacing: 0.2px;
  ::placeholder {
    font-style: italic;
    color: #b1b1b1;
  }
`;
