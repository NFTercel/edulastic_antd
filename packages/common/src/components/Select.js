import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  white,
  grey,
  blue,
  secondaryTextColor
} from '@edulastic/colors';

const Select = ({ onChange, options, value, style, arrowColor }) => (
  <SelectContainer style={style} arrowColor={arrowColor}>
    <Main
      onChange={e => onChange(e.target.value)}
      defaultValue={value}
      data-cy="selectStyle"
      borderRadius={style.borderRadius}
    >
      {options.map((item, index) => (
        <option data-cy={item.value} key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </Main>
  </SelectContainer>
);

Select.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  style: PropTypes.object,
  arrowColor: PropTypes.string,
};

Select.defaultProps = {
  style: {},
  arrowColor: blue,
};

export default Select;

const Main = styled.select`
  padding: 10px 44px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '4px')};
  background-color: ${white};
  color: ${secondaryTextColor};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.38;
  border: 1px solid ${grey};
  -webkit-appearance: none;
  outline: 0;
`;

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 150px;
  min-height: 40px;
  &:before {
    position: absolute;
    font-family: 'FontAwesome';
    top: 0;
    right: 25px;
    display: flex;
    align-items: center;
    height: 100%;
    color: ${props => props.arrowColor};
    content: '\f0d7';
  }
  @media (max-width: 760px) {
    height: 52px;
    width: 188px;
  }
`;
