import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { white } from "@edulastic/colors";
import { GoogleLogin } from "react-google-login";
// components
import { Title, IconManageClass, CreateClassButton, SyncButtons, CreateIcon, ButtonsWrapper } from "./styled";
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
      <Title>
        <IconManageClass color={white} width={20} height={20} /> <span>Manage Class</span>
      </Title>
      <ButtonsWrapper>
        <GoogleLogin
          clientId={process.env.POI_APP_GOOGLE_CLIENT_ID}
          buttonText="Sync with Google Classroom"
          render={renderProps => <SyncButtons onClick={renderProps.onClick}>Sync with Google Classroom</SyncButtons>}
          scope={scopes}
          onSuccess={handleLoginSucess}
          onFailure={handleError}
          prompt="consent"
          responseType="code"
        />
        <CreateClassButton>
          <CreateIcon color={white} /> Create Class{" "}
        </CreateClassButton>
      </ButtonsWrapper>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  fetchClassList: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchClassList: fetchClassListAction }
)(Header);
