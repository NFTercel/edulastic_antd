import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

// components
import Header from "../../sharedComponents/Header";
import SubHeader from "./SubHeader";
import AssignmentContainer from "./Container";

const Wrapper = styled(Layout)`
  width: 100%;
`;

const Assignments = () => {
  return (
    <Wrapper>
      <Header titleText="common.assignmentsTitle" />
      <SubHeader />
      <AssignmentContainer />
    </Wrapper>
  );
};

export default Assignments;
