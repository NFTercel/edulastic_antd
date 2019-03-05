import React from "react";
import PropTypes from "prop-types";
import { FlexContainer, EduButton } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

const CheckAnswerButton = ({ feedbackAttempts, onCheck, t }) => (
  <FlexContainer justifyContent="flex-end" style={{ padding: "15px 0" }}>
    <EduButton disabled={feedbackAttempts <= 0} onClick={onCheck}>
      {t("component.checkAnswer")}
    </EduButton>
  </FlexContainer>
);

CheckAnswerButton.propTypes = {
  feedbackAttempts: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(CheckAnswerButton);
