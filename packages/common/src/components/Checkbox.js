import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue, white, grey, secondaryTextColor } from '@edulastic/colors';

const Checkbox = ({ onChange, checked, label, style, className }) => (
  <Container data-cy="multi" onClick={onChange} style={style} className={className}>
    <Input type="checkbox" checked={checked} onChange={() => {}} />
    <span />
    {label && (
      <span style={{ fontSize: 13, fontWeight: 600, color: secondaryTextColor }} className="label">
        {label}
      </span>
    )}
  </Container>
);

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};

Checkbox.defaultProps = {
  style: {},
  label: '',
  className: '',
  checked: false
};

export default Checkbox;

const Input = styled.input`
  display: none;

  + span {
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    vertical-align: middle;
    background: ${white} left top no-repeat;
    border: solid 1px ${grey};
    cursor: pointer;
    margin-right: 43px;
  }

  &:checked + span {
    background: ${blue};
    border-color: ${blue};
  }

  + span:after {
    display: block;
    content: '';
    position: absolute;
    left: 5px;
    top: 1px;
    width: 4px;
    height: 9px;
    border: solid ${white};
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Container = styled.span`
  cursor: pointer;
`;
