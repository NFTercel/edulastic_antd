import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

// components
import ProfileHeader from "./Header";
import ProfileContainer from "./Container";

const Wrapper = styled(Layout)`
  width: 100%;
`;

const UserProfile = () => (
  <Wrapper>
    <ProfileHeader />
    <ProfileContainer />
  </Wrapper>
);

export default UserProfile;
