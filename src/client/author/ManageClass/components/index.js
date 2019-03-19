import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// actions
import { fetchGroupsAction, getGroupsSelector } from "../../sharedDucks/groups";

// components
import Header from "./Header";
import ClassSelector from "./ClassSelector";
import ClassList from "./ClassList";

const ManageClass = ({ fetchGroups, groups }) => {
  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ClassSelector />
      <ClassList groups={groups} />
    </React.Fragment>
  );
};

ManageClass.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired
};

export default connect(
  state => ({
    groups: getGroupsSelector(state)
  }),
  {
    fetchGroups: fetchGroupsAction
  }
)(ManageClass);
