import styled from "styled-components";

import { Card } from "@edulastic/common";
import { green, secondaryTextColor, lightGreySecondary, lightBlueSecondary, white } from "@edulastic/colors";

import { BtnAction } from "../../../TableList/styled";

export const AssignmentThumbnail = styled.div`
  width: calc(100vw - 42px - 82px);
  height: 48px;
  background: ${green};
  border-radius: 5px;
  margin-bottom: 19px;
  text-align: center;
  display: inline-block;
`;

export const AssignmentWrapper = styled(Card)`
  padding: 16px 21px 25px 21px;
  text-align: center;

  &:first-child {
    margin-left: 20px;
  }

  &:last-child {
    margin-right: 26px;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }

  .ant-card-body {
    padding: 0;
  }
`;

export const AssignmentTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${secondaryTextColor};
  text-align: center;
  margin-bottom: 25px;
`;

export const AssignmentDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
`;

export const ExpandedRow = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 15px;
`;

export const ExpandRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${lightGreySecondary};
  overflow: hidden;
  height: ${props =>
    props.animationEnabled ? (props.expanded ? (props.doubleRow ? "83px" : "49px") : "15px") : "15px"};
  opacity: ${props => (props.expanded ? "1" : "0")};
  pointer-events: ${props => (props.expanded ? "all" : "none")};
  transition: all 200ms ease-out;

  &:not(:last-child) {
    margin-bottom: 6px;
  }
`;

export const ExpandRowTopContent = styled.div`
  display: flex;
  width: 100%;
`;

export const ExpandRowTopContentItem = styled.div`
  width: 50%;
`;

export const ExpandButton = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  color: ${lightBlueSecondary};
  font-weight: 600;
  font-size: 11px;

  span {
    display: inline-block;
    margin-bottom: 10px;
  }

  svg {
    width: 12px;
    transform: ${props => (props.expanded ? "rotate(90deg)" : "rotate(-90deg)")};
  }
`;

export const AssignmentStatus = styled.span`
  display: inline-block;
  color: ${white};
  font-size: 10px;
  text-transform: uppercase;
  text-align: center;
  line-height: 24px;
  width: 111px !important;
  height: 24px;
  border-radius: 4px;
  background: ${({ type }) => (type === "IN PROGRESS" ? "#F9942D" : type === "SUBMITTED" ? "#5EB500" : "#AAAFB5")};
`;

export const AssignmentNavigation = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 12px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;

    img {
      height: 21px;
      width: 40px;
    }
  }
`;

export const MobileActionButton = styled(BtnAction)`
  width: 244px;
  max-width: 100%;
  height: 32px;
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 34px;
`;
