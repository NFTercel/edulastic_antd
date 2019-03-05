import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

// components
import Header from "./Header";
import LoginContainer from "./Container";

import loginBg from "../../assets/bg-login.png";

const Wrapper = styled(Layout)`
  width: 100%;
`;

const Login = () => (
  <Wrapper>
    <LoginWrapper>
      <Header />
      <LoginContainer />
    </LoginWrapper>
  </Wrapper>
);

export default Login;

const LoginWrapper = styled.div`
  background: #999999 url(${loginBg});
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;
