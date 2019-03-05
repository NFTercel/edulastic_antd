import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";
import Tags from "../../../../src/components/common/Tags";

const ClassCell = ({ group, data }) => {
  let students;
  if (!students || !students.length) {
    students = ["All students"];
  }

  const classNames = group
    .map(({ _id, name }) => {
      if (Array.isArray(data) && data.includes(_id)) {
        return name;
      }
      return null;
    })
    .filter(Boolean)
    .join(" ");

  return (
    <FlexContainer>
      <span>{classNames}</span>
      <TagsContainer>{students && !!students.length && <Tags tags={students} type="secondary" />}</TagsContainer>
    </FlexContainer>
  );
};

ClassCell.propTypes = {
  group: PropTypes.array,
  data: PropTypes.array
};

ClassCell.defaultProps = {
  group: [],
  data: []
};

export default ClassCell;

const TagsContainer = styled.div`
  margin-left: 5px;
`;
