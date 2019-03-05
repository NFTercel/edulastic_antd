import React from "react";
import styled from "styled-components";
import { blue, secondaryTextColor } from "@edulastic/colors";
import PropTypes from "prop-types";
import { FlexContainer } from "@edulastic/common";
import { Select } from "antd";

const TestFilters = ({ children, onChange, style, filterData, state, clearFilter }) => (
  <Container style={style}>
    <FilerHeading justifyContent="space-between">
      <Title>Filters</Title>
      <ClearAll onClick={clearFilter}>Clear all</ClearAll>
    </FilerHeading>
    {children}

    {filterData.map(filterItem => (
      <>
        <SubTitle>{filterItem.title}</SubTitle>
        <Select
          onSearch={filterItem.onSearch && filterItem.onSearch}
          mode={filterItem.mode}
          size={filterItem.size}
          placeholder={filterItem.placeholder}
          filterOption={filterItem.filterOption}
          defaultValue={filterItem.mode === "multiple" ? undefined : filterItem.data[0].text}
          value={state[filterItem.onChange]}
          onChange={value => onChange(filterItem.onChange, value)}
          disabled={filterItem.disabled}
        >
          {filterItem.data.map(({ value, text }) => (
            <Select.Option value={value} key={value}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </>
    ))}
  </Container>
);

TestFilters.propTypes = {
  children: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  style: PropTypes.object,
  state: PropTypes.object.isRequired,
  filterOption: PropTypes.bool,
  filterData: PropTypes.array
};

TestFilters.defaultProps = {
  children: null,
  filterOption: true,
  filterData: [],
  style: {}
};

export default TestFilters;

const Container = styled.div`
  padding: 27px 0;

  .ant-select {
    width: 100%;
    min-width: 100%;
  }

  .ant-select-selection {
    background: transparent;
  }

  .ant-select-lg {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }

  .ant-select-selection__choice {
    border-radius: 5px;
    border: solid 1px #c8e8f6;
    background-color: #c8e8f6;
    height: 23.5px;
  }

  .ant-select-selection__choice__content {
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #0083be;
    opacity: 1;
  }

  .ant-select-remove-icon {
    svg {
      fill: #0083be;
    }
  }

  .ant-select-arrow-icon {
    font-size: 14px;
    svg {
      fill: #00b0ff;
    }
  }

  @media (min-width: 993px) {
    padding-right: 35px;
  }
`;

const FilerHeading = styled(FlexContainer)`
  margin-bottom: 10px;
`;

const Title = styled.span`
  color: #4aac8b;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const ClearAll = styled.span`
  color: #00b0ff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  :hover {
    color: ${blue};
  }
`;

const SubTitle = styled.div`
  margin: 12px 0 5px;
  color: ${secondaryTextColor};
  font-size: 13px;
  font-weight: 600;
`;
