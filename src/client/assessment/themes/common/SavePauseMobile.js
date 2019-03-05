import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Icon } from "antd";
import Profile from "../../../student/assets/Profile.png";

const SavePauseMobile = ({ openSavePauseModal, isVisible }) => (
  <SavePauseMobileButton onClick={openSavePauseModal}>
    <img src={Profile} alt="Profile" />
    <Icon type={isVisible ? "caret-up" : "caret-down"} />
  </SavePauseMobileButton>
);

SavePauseMobile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  openSavePauseModal: PropTypes.func.isRequired
};

export default SavePauseMobile;

const SavePauseMobileButton = styled(Button)`
  height: 40px;
  width: 90px;
  display: flex;
  align-items: center;
  margin-left: auto;
  background: #1fe3a1;
  justify-content: space-between;
  border: none;
  color: #fff;
  &:active,
  &:focus {
    border: none;
    background: #1fe3a1;
  }
  img {
    height: 30px;
    float: left;
  }
`;
