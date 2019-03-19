import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import { fetchAssignmentsAction } from "../TestPage/components/Assign/ducks";
import Header from "./Header";
import MainContent from "./MainContent";

const RegradeTypes = {
  ALL: "All your assignments",
  SCHOOL_YEAR: "Your assignments this school year",
  SPECIFIC: "Pick specific assignments to apply to"
};
const RegradeKeys = ["ALL", "SCHOOL_YEAR", "SPECIFIC"];

const Regrade = ({ assignments, getAssignmentsByTestId }) => {
  const [regradeType, regradeTypeChange] = useState(RegradeKeys[0]);

  useEffect(() => {
    getAssignmentsByTestId("5c8f400104485461e6ef14b8");
    //TODO need to pass test ID from match params
  }, []);

  const handleRegradeTypeSelect = () => {
    const selectedType = event.target.value;
    regradeTypeChange(selectedType);
  };

  return (
    <Fragment>
      <Header />
      <MainContent
        assignments={assignments}
        RegradeTypes={RegradeTypes}
        RegradeKeys={RegradeKeys}
        regradeType={regradeType}
        handleRegradeTypeSelect={handleRegradeTypeSelect}
      />
    </Fragment>
  );
};

export default connect(
  state => ({
    assignments: state.authorTestAssignments.assignments
  }),
  {
    getAssignmentsByTestId: fetchAssignmentsAction
  }
)(Regrade);
