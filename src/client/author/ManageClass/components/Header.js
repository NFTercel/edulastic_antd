import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "antd";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { googleApi } from "@edulastic/api";
// components
import HeaderWrapper from "../../src/mainContent/headerWrapper";
// ducks
import { fetchClassListAction } from "../ducks";

const scopes = [
  "https://www.googleapis.com/auth/classroom.courses",
  "https://www.googleapis.com/auth/classroom.rosters",
  "https://www.googleapis.com/auth/classroom.coursework.me",
  "https://www.googleapis.com/auth/classroom.coursework.students",
  "https://www.googleapis.com/auth/classroom.announcements",
  "https://www.googleapis.com/auth/classroom.guardianlinks.students",
  "https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly",
  "https://www.googleapis.com/auth/classroom.profile.photos",
  "https://www.googleapis.com/auth/classroom.profile.emails",
  "https://www.googleapis.com/auth/userinfo.profile"
].join(" ");

const Header = ({ fetchClassList }) => {
  const handleLoginSucess = data => {
    fetchClassList(data);
  };

  const handleError = err => {
    console.log("error", err);
  };

  return (
    <HeaderWrapper>
      <Title> Manage Class</Title>
      <Button> Start Sync </Button>
      <GoogleLogin
        clientId={process.env.POI_APP_GOOGLE_CLIENT_ID}
        buttonText="Sync Google ClassRoom"
        scope={scopes}
        onSuccess={handleLoginSucess}
        onFailure={handleError}
        prompt="consent"
        responseType="code"
      />
      <Button> Create Class </Button>
    </HeaderWrapper>
  );
};

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.36;
  text-align: left;
  display: flex;
`;

Header.propTypes = {
  fetchClassList: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchClassList: fetchClassListAction }
)(Header);
