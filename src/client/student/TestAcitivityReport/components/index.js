import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//components
import TestAcivityHeader from "../../sharedComponents/Header";
import TestActivitySubHeader from "./SubHeader";
import ReportListContent from "./Container";
import MainContainer from "../../styled/mainContainer";
//actions
import { loadTestActivityReportAction } from "../ducks";

const ReportListContainer = ({ flag, match, location, loadReport, loadTestActivityReport }) => {
  useEffect(() => {
    loadTestActivityReport({ testActivityId: match.params.id });
  }, []);
  return (
    <MainContainer flag={flag}>
      <TestAcivityHeader titleText="common.reportsTitle" />
      <TestActivitySubHeader title={location.title} />
      <ReportListContent title={location.title} />
    </MainContainer>
  );
};

const enhance = compose(
  withRouter,
  connect(
    ({ ui }) => ({
      flag: ui.flag
    }),
    {
      loadTestActivityReport: loadTestActivityReportAction
    }
  )
);

export default enhance(ReportListContainer);

ReportListContainer.propTypes = {
  flag: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};
