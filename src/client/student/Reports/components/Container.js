import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout } from "antd";
import { getCurrentGroup } from "../../Login/ducks";

// actions
import { fetchAssignmentsAction, getAssignmentsSelector } from "../ducks";

// components
import AssignmentCard from "../../sharedComponents/AssignmentCard";

const Content = ({ flag, assignments, fetchAssignments, currentGroup }) => {
  useEffect(() => {
    fetchAssignments(currentGroup);
  }, []);

  return (
    <LayoutContent flag={flag}>
      <Wrapper>
        {assignments.map((item, index) => (
          <AssignmentCard key={index} data={item} type="reports" />
        ))}
      </Wrapper>
    </LayoutContent>
  );
};

export default connect(
  state => ({
    flag: state.ui.flag,
    currentGroup: getCurrentGroup(state),
    assignments: getAssignmentsSelector(state)
  }),
  {
    fetchAssignments: fetchAssignmentsAction
  }
)(Content);

Content.propTypes = {
  flag: PropTypes.bool.isRequired,
  assignments: PropTypes.array,
  fetchAssignments: PropTypes.func.isRequired
};

Content.defaultProps = {
  assignments: []
};

const LayoutContent = styled(Layout.Content)`
  min-height: 100vh;
  padding-bottom: 150px;
  width: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: 30px 30px;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.assignment.cardContainerBgColor};
  padding: 5px 30px;
  position: relative;
  @media screen and (max-width: 1300px) {
    padding: 5px 15px;
  }

  @media screen and (max-width: 767px) {
    padding: 5px 30px;
  }
`;
