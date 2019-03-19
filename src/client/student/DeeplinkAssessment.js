//@ts-check
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import queryString from "query-string";

import { bootstrapAssessmentAction } from "./Assignments/ducks";

const DeepLink = ({ bootstrap, match }) => {
  console.log("rendering deeplink 2");
  //alert("rendering deeplink 1");
  useEffect(() => {
    const { testType, assignmentId, testActivityId, testId } = match.params;
    let query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.access_token = query.token;
    }
    //alert("rendering deeplink inside effect");

    bootstrap({ testType, assignmentId, testActivityId, testId });
  }, []);
  return <h2>Redirecting...</h2>;
};

export default compose(
  withRouter,
  connect(
    null,
    {
      bootstrap: bootstrapAssessmentAction
    }
  )
)(DeepLink);
