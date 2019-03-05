import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

// components
import ManageHeader from "../../sharedComponents/Header";
import SubHeader from "./SubHeader";
import ManageClassContainer from "./Container";

const Wrapper = styled(Layout)`
  width: 100%;
`;

const ManageClass = () => (
  <Wrapper>
    <ManageHeader titleText="common.manageClassTitle" classSelect={false} showActiveClass={true} />
    <SubHeader />
    <ManageClassContainer />
  </Wrapper>
);

export default ManageClass;
