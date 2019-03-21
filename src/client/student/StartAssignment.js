import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { launchAssignmentFromLinkAction } from "./Assignments/ducks";

const StartAssignment = ({ match, launchAssignment }) => {
  useEffect(() => {
    const { assignmentId, groupId } = match.params;
    launchAssignment({ assignmentId, groupId });
  }, []);
  return <div> Initializing Assignment... </div>;
};

StartAssignment.propTypes = {
  match: PropTypes.object.isRequired,
  launchAssignment: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    launchAssignment: launchAssignmentFromLinkAction
  }
)(StartAssignment);
