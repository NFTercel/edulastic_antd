import React from "react";
import { textColor, red } from "@edulastic/colors";
import { IconClose } from "@edulastic/icons";
import PropTypes from "prop-types";
import { Container, Icon, Tag } from "./styled";

const SettingsBarTags = ({ tags, onRemove }) => (
  <Container>
    {tags.map((tag, i) => (
      <Tag key={i}>
        <span>{tag}</span>{" "}
        <Icon onClick={onRemove}>
          <IconClose idth={8} height={8} color={textColor} hoverColor={red} />
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
