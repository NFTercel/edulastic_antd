import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { message } from "antd";

import { fetchAssignmentsAction } from "../TestPage/components/Assign/ducks";
import { setRegradeSettingsDataAction } from "../TestPage/ducks";
import Header from "./Header";
import MainContent from "./MainContent";
import { get } from "lodash";

const RegradeTypes = {
  ALL: "All your assignments",
  SCHOOL_YEAR: "Your assignments this school year",
  SPECIFIC: "Pick specific assignments to apply to"
};
const RegradeKeys = ["ALL", "SCHOOL_YEAR", "SPECIFIC"];

const Regrade = ({ assignments, getAssignmentsByTestId, match, setRegradeSettings, districtId }) => {
  useEffect(() => {
    const oldTestId = match.params.oldTestId;
    getAssignmentsByTestId(oldTestId);
  }, []);

  const settings = {
    newTestId: match.params.newTestId,
    assignmentList: [],
    districtId,
    options: {
      removedQuestion: "DISCARD",
      addedQuestion: "SKIP",
      correctAnsChanged: "SKIP",
      choicesChanged: "SKIP"
    }
  };

  const [regradeSettings, regradeSettingsChange] = useState(settings);
  const [assigmentOptions, setAssignmentOptions] = useState(RegradeKeys[0]);

  const onUpdateSettings = (key, value) => {
    const newState = {
      ...regradeSettings,
      options: {
        ...regradeSettings.options,
        [key]: value
      }
    };
    regradeSettingsChange(newState);
  };

  const handleSettingsChange = (key, value) => {
    const newState = {
      ...regradeSettings,
      [key]: value
    };
    regradeSettingsChange(newState);
  };

  const onApplySettings = () => {
    if (regradeSettings.assignmentList.length > 0) {
      setRegradeSettings(regradeSettings);
    } else {
      message.error("Assignment must contain at least 1 items");
    }
  };
  return (
    <Fragment>
      <Header onApplySettings={onApplySettings} />
      <MainContent
        assignments={assignments}
        RegradeTypes={RegradeTypes}
        RegradeKeys={RegradeKeys}
        onUpdateSettings={onUpdateSettings}
        regradeSettings={regradeSettings}
        handleSettingsChange={handleSettingsChange}
        setAssignmentOptions={setAssignmentOptions}
        assigmentOptions={assigmentOptions}
        regradeSettingsChange={regradeSettingsChange}
      />
    </Fragment>
  );
};

export default connect(
  state => ({
    assignments: state.authorTestAssignments.assignments,
    districtId: get(state, ["user", "user", "orgData", "districtId"])
  }),
  {
    getAssignmentsByTestId: fetchAssignmentsAction,
    setRegradeSettings: setRegradeSettingsDataAction
  }
)(Regrade);
