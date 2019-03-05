import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { white } from "@edulastic/colors";
import { IconSave, IconPause, IconLogout } from "@edulastic/icons";

const SaveAndExit = ({ finishTest }) => (
  <Container>
    <StyledButton>
      <SaveIcon />
    </StyledButton>
    <Link to="/home/assignments">
      <StyledButton>
        <PauseIcon />
      </StyledButton>
    </Link>
    <StyledButton data-cy="finishTest" onClick={finishTest}>
      <LogoutIcon />
    </StyledButton>
  </Container>
);

SaveAndExit.propTypes = {
  finishTest: PropTypes.func.isRequired
};

export default SaveAndExit;

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-top: 2px;
`;

const SaveIcon = styled(IconSave)`
  fill: ${white};
  width: 24px;
  height: 24px;
  &:hover {
    fill: #23e7ab;
  }
`;

const PauseIcon = styled(IconPause)`
  fill: ${white};
  width: 24px;
  height: 24px;
  &:hover {
    fill: #23e7ab;
  }
`;

const LogoutIcon = styled(IconLogout)`
  fill: ${white};
  width: 24px;
  height: 24px;
  &:hover {
    fill: #23e7ab;
  }
`;

const StyledButton = styled(Button)`
  width: 45px;
  background: transparent;
  border: none;
  &:hover,
  &:focus {
    background: transparent;
  }
`;
