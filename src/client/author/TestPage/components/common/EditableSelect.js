import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { IconCheck, IconPencilEdit } from "@edulastic/icons";
import { greenDark, green } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";
import styled from "styled-components";
import Title from "./Title";

const EditableSelect = ({ placeholder, onChange, defaultValue, options, title }) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <Item>
      <FlexContainer>
        <Title>{title}:</Title>
        {!show && (
          <Fragment>
            <span>{defaultValue.join(", ")}</span>
            <IconPencilEdit
              color={greenDark}
              hoverColor={green}
              style={{ cursor: "pointer" }}
              onClick={handleToggle}
              width={16}
              height={16}
            />
          </Fragment>
        )}
      </FlexContainer>

      {show && (
        <Fragment>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
          >
            {options.map(({ value, text }) => (
              <Select.Option key={value}>{text}</Select.Option>
            ))}
          </Select>
          <IconCheck
            color={greenDark}
            hoverColor={green}
            style={{ cursor: "pointer" }}
            onClick={handleToggle}
            width={16}
            height={16}
          />
        </Fragment>
      )}
    </Item>
  );
};

EditableSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default EditableSelect;

const Item = styled(FlexContainer)`
  margin-bottom: 15px;
`;
