/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Menu } from "antd";
import { test } from "@edulastic/constants";
import simpleIcon from "../../assets/icon.svg";
import classIcon from "../../assets/manage-class.svg";
import copyItem from "../../assets/copy-item.svg";
import viewIcon from "../../assets/view.svg";
import infomationIcon from "../../assets/information.svg";
import responsiveIcon from "../../assets/responses.svg";
import toolsIcon from "../../assets/printing-tool.svg";
import devIcon from "../../assets/dev.svg";
import googleIcon from "../../assets/Google Classroom.svg";
import { Link } from "react-router-dom";
import { assignmentApi } from "@edulastic/api";

import { Container, StyledMenu, StyledLink, SpaceElement, ActionButtonWrapper, ActionButton } from "./styled";

const { releaseGradeLabels } = test;
const { duplicateAssignment } = assignmentApi;
const ActionMenu = (onOpenReleaseScoreSettings, currentAssignment, history) => {
  const showRleaseGrade =
    currentAssignment.releaseScore === releaseGradeLabels.DONT_RELEASE || !currentAssignment.releaseScore;
  const currentTestId = currentAssignment.testId;
  const currentAssignmentId = currentAssignment._id;
  const MenuItems = [];
  const createDuplicateAssignment = () => {
    duplicateAssignment(currentAssignment.testId).then(test => {
      const duplicateTestId = test._id;
      history.push(`/author/tests/${duplicateTestId}`);
    });
  };

  MenuItems.push(
    <ActionButtonWrapper>
      <ActionButton>Actions</ActionButton>
    </ActionButtonWrapper>
  );
  MenuItems.push(
    <Menu.Item>
      <StyledLink target="_blank" rel="noopener noreferrer">
        <img alt="icon" src={simpleIcon} />
        <SpaceElement />
        Add/Edit Assignment
      </StyledLink>
    </Menu.Item>
  );
  MenuItems.push(
    <Menu.Item>
      <Link style={{ marginTop: 2 }} to={`/author/tests/${currentAssignment.testId}/editAssigned`}>
        <img alt="icon" src={classIcon} />
        <SpaceElement />
        Edit Assessment
      </Link>
    </Menu.Item>
  );
  MenuItems.push(
    <Menu.Item onClick={createDuplicateAssignment}>
      <StyledLink target="_blank" rel="noopener noreferrer">
        <img alt="icon" src={copyItem} />
        <SpaceElement />
        Duplicate
      </StyledLink>
    </Menu.Item>
  );
  MenuItems.push(
    <Menu.Item>
      <StyledLink target="_blank" rel="noopener noreferrer">
        <img alt="icon" src={viewIcon} />
        <SpaceElement />
        Preview
      </StyledLink>
    </Menu.Item>
  );
  MenuItems.push(
    <Menu.Item>
      <StyledLink target="_blank" rel="noopener noreferrer">
        <img alt="icon" src={infomationIcon} />
        <SpaceElement />
        View Details
      </StyledLink>
    </Menu.Item>
  );
  {
    showRleaseGrade &&
      MenuItems.push(
        <Menu.Item onClick={() => onOpenReleaseScoreSettings(currentTestId, currentAssignmentId)}>
          <StyledLink target="_blank" rel="noopener noreferrer">
            <img alt="icon" src={responsiveIcon} />
            <SpaceElement />
            Release Grades
          </StyledLink>
        </Menu.Item>
      );
  }

  MenuItems.push(
    <Menu.Item>
      <StyledLink target="_blank" rel="noopener noreferrer">
        <img alt="icon" src={toolsIcon} />
        <SpaceElement />
        Print
      </StyledLink>
    </Menu.Item>
  );
  MenuItems.push(
    <Menu.Item>
      <StyledLink target="_blank" rel="noopener noreferrer">
        <img alt="icon" src={devIcon} />
        <SpaceElement />
        Embed
      </StyledLink>
    </Menu.Item>
  );
  MenuItems.push(
    <Menu.Item>
      <StyledLink target="_blank" rel="noopener noreferrer">
        <img alt="icon" src={googleIcon} />
        <SpaceElement />
        GClassroom
      </StyledLink>
    </Menu.Item>
  );
  return (
    <Container>
      <StyledMenu>{MenuItems}</StyledMenu>
    </Container>
  );
};

export default ActionMenu;
