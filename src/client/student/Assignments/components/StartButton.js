import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// assets
import lockIcon from "../../assets/lock-icon.svg";
// components
import StartButton from "../../styled/AssignmentCardButton";

const AssignmentButton = ({ startDate, t, startTest, attempted, resume }) => {
  const startButtonText = resume ? t("common.resume") : attempted ? t("common.retake") : t("common.startAssignment");

  return new Date(startDate) > new Date() ? (
    <NotAvailableButton disabled>
      <span>
        <img src={lockIcon} alt="" />
      </span>
      <span data-cy="lockAssignment">{t("common.lockAssignment")}</span>
    </NotAvailableButton>
  ) : (
    <StartButton onClick={startTest}>
      <span data-cy="assignmentButton">{startButtonText}</span>
    </StartButton>
  );
};
AssignmentButton.propTypes = {
  startDate: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  startTest: PropTypes.isRequired,
  attempted: PropTypes.bool.isRequired,
  resume: PropTypes.bool.isRequired
};

const NotAvailableButton = styled(StartButton)`
  display: flex;
  justify-content: space-evenly;
  span {
    img {
      width: 15px;
      height: 15px;
    }
  }
  span {
    color: ${props => props.theme.assignment.cardNotAvailabelBtnTextColor};
  }
  &:hover {
    background-color: ${props => props.theme.assignment.cardNotAvailabelBtnBgColor};
    span {
      color: ${props => props.theme.assignment.cardNotAvailabelBtnTextColor};
    }
  }
`;

export default AssignmentButton;
