import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { themes } from "../../themes";

import SummaryHeader from "./Header";
import SummaryTest from "./Content";

import { finishTestAcitivityAction } from "../../../assessment/actions/test";
import SubmitConfirmation from "../../../assessment/themes/common/SubmitConfirmation";

const SummaryContainer = ({ finishTest, history }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handlerConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const closeTest = () => {
    history.push("/home/assignments");
  };

  return (
    <ThemeProvider theme={themes.default}>
      <MainContainer>
        <SubmitConfirmation isVisible={showConfirmationModal} onClose={closeConfirmationModal} finishTest={closeTest} />
        <SummaryHeader showConfirmationModal={handlerConfirmationModal} />
        <SummaryTest finishTest={finishTest} />
      </MainContainer>
    </ThemeProvider>
  );
};

const enhance = compose(
  withRouter,
  connect(
    null,
    {
      finishTest: finishTestAcitivityAction
    }
  )
);

export default enhance(SummaryContainer);

SummaryContainer.propTypes = {
  finishTest: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired
};

const MainContainer = styled.div`
   {
    width: 100%;
    @media (min-width: 1200px) {
      display: flex;
      flex-direction: column;
    }
  }
`;
