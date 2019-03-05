import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IconQuestion, IconCaretDown } from "@edulastic/icons";
import Profile from "../assets/Profile.png";

const Help = ({ flag }) => (
  <HelpWrapper>
    <HelpCenter>
      <HelpIconWrapper>
        <HelpIcon />
      </HelpIconWrapper>
      <HelpText flag={flag}>Help Center</HelpText>
    </HelpCenter>
    <UserProfile>
      <ProfileWrapper>
        <ProfileImg src={Profile} />
      </ProfileWrapper>
      <ProfileDetail flag={flag}>
        <P color="#057750" font="0.9rem">
          Zack Oliver
        </P>
        <P color="#fff" font="0.7rem">
          student
        </P>
      </ProfileDetail>
      <SelectIcon flag={flag} />
    </UserProfile>
  </HelpWrapper>
);

export default React.memo(Help);

Help.propTypes = {
  flag: PropTypes.bool.isRequired
};

const ProfileWrapper = styled.div`
  width: 47px;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 40px;
`;
const SelectIcon = styled(IconCaretDown)`
  margin-left: auto;
  fill: #fff;
  width: 11px;
  height: 16px;
  display: ${props => (props.flag ? "none" : "block")};
`;
const ProfileDetail = styled.div`
  padding-left: 0.5rem;
  display: ${props => (props.flag ? "none" : "block")};
  & p {
    margin: 0rem;
    padding-bottom: 0.2rem;
    font-weight: 600;
  }
`;

const P = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.font};
`;

const HelpWrapper = styled.div`
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: auto;
`;
const HelpCenter = styled.div`
  padding: 0.5rem 0.5rem;
  border-radius: 2rem;
  display: flex;
  min-height: 3.5rem;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 0.2rem 0.5rem;
  &:hover {
    background: #1fe3a1;
    svg {
      fill: #fff;
    }
  }
`;

const UserProfile = HelpCenter.extend`
  background: #1fe3a1;
  position: relative;
  display: flex;
  align-items: center;
`;

const HelpIconWrapper = styled.span`
  padding-right: 1rem;
  padding-left: 0.5rem;
`;

const HelpIcon = styled(IconQuestion)`
  fill: #1fe3a1;
  width: 25px;
  height: 22px;
`;

const HelpText = styled.span`
  color: #7a7a7a;
  font-size: 0.9rem;
  font-weight: 600;
  display: ${props => (props.flag ? "none" : "block")};
`;
