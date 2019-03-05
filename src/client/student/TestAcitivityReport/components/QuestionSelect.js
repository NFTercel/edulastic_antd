import React from "react";
import styled from "styled-components";
import { Select, Button, Icon } from "antd";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentItemSelector, getItemCountSelector, setCurrentItemAction } from "../../sharedDucks/TestItem";

const { Option } = Select;

/*
 * @params count {Number} - create options based on the count
 */
const createOptions = count => {
  const options = [];
  for (let i = 1; i <= count; i++) {
    options.push(`Question ${i}/${count}`);
  }
  return options;
};
const QuestionSelect = ({ count, current, setCurrentItem }) => {
  const options = createOptions(count || 1);
  const defaultVal = options[current];

  return (
    <QuestionListWrapper>
      <Select defaultValue={defaultVal}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => setCurrentItem(index)}>
            {option}
          </Option>
        ))}
      </Select>
      <ButtonContainer>
        <StyledButton>
          <Icon type="left" />
        </StyledButton>
        {options.map((_, index) => (
          <StyledNumberButton enabled={current === index} onClick={() => setCurrentItem(index)}>
            {index + 1}
          </StyledNumberButton>
        ))}
        <StyledButton>
          <Icon type="right" />
        </StyledButton>
      </ButtonContainer>
    </QuestionListWrapper>
  );
};
export default connect(
  state => ({
    current: getCurrentItemSelector(state),
    count: getItemCountSelector(state)
  }),
  {
    setCurrentItem: setCurrentItemAction
  }
)(QuestionSelect);

QuestionSelect.propTypes = {
  current: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setCurrentItem: PropTypes.func.isRequired
};

const QuestionListWrapper = styled.div`
  display: flex;
  height: 35px;
  justify-content: space-between;

  .ant-select {
    width: 145px;
    @media (max-width: 768px) {
      height: 40px;
    }
  }
  .ant-select-selection {
    display: flex;
    align-items: center;
  }
  .ant-select-selection__rendered {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }
  .anticon-down {
    svg {
      fill: #00b0ff;
    }
  }
`;

const StyledButton = styled(Button)`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    background: transparent;
    color: #fff;
    &:hover,
    &:focus {
      background: transparent;
    }
  }
`;

const StyledNumberButton = styled(Button)`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  background: ${props => (props.enabled ? "#00b0ff" : "#fff")};
  color: ${props => (props.enabled ? "#fff" : "#4d4f5c")};
  &:hover,
  &:focus {
    background: #00b0ff;
    color: #fff;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: 15px;
`;
