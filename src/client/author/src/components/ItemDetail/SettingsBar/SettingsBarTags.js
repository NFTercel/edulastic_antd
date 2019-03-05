import React from "react";
import styled from "styled-components";
import { grey, textColor, red } from "@edulastic/colors";
import { IconClose } from "@edulastic/icons";
import PropTypes from "prop-types";

const SettingsBarTags = ({ tags, onRemove }) => (
  <Container>
    {tags.map((tag, i) => (
      <Tag key={i}>
        <span>{tag}</span>{" "}
        <Icon onClick={onRemove}>
          <IconClose width={8} height={8} color={textColor} hoverColor={red} />
        </Icon>
      </Tag>
    ))}
  </Container>
);

SettingsBarTags.propTypes = {
  tags: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default SettingsBarTags;

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid #e9e9e9;
  padding: 15px;
`;

const Tag = styled.div`
  border-radius: 10px;
  border: 1px solid ${grey};
  color: ${textColor};
  min-width: 105px;
  padding: 5px 10px;
  min-height: 25px;
  text-align: center;
  display: inline-flex;
  margin-right: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.div`
  margin-left: 10px;
  display: inline-flex;
  cursor: pointer;
`;
