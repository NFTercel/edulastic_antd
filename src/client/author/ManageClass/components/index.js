import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// actions
import { fetchGroupsAction, getGroupsSelector } from "../../sharedDucks/groups";
import { setModalAction, syncClassAction } from "../ducks";
// components
import Header from "./Header";
import ClassList from "./ClassList";
import ClassSelectModal from "./ClassSelectModal";

const ManageClass = ({ fetchGroups, setModal, groups, isModalVisible, googleCourseList, syncClass }) => {
  useEffect(() => {
    fetchGroups();
  }, []);

  const closeModal = () => setModal(false);
  const selectedGroups = groups.filter(i => !!i.code).map(i => i.code);

  return (
    <React.Fragment>
      <Header />
      <ClassSelectModal
        visible={isModalVisible}
        close={closeModal}
        groups={googleCourseList}
        syncClass={syncClass}
        selectedGroups={selectedGroups}
      />
      <ClassList groups={groups} />
    </React.Fragment>
  );
};

ManageClass.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  syncClass: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  isModalVisible: PropTypes.func.isRequired,
  googleCourseList: PropTypes.array.isRequired
};

export default connect(
  state => ({
    groups: getGroupsSelector(state),
    isModalVisible: state.manageClass.showModal,
    googleCourseList: state.manageClass.googleCourseList
  }),
  {
    fetchGroups: fetchGroupsAction,
    setModal: setModalAction,
    syncClass: syncClassAction
  }
)(ManageClass);
