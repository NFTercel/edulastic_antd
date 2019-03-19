import styled from "styled-components";
import { Button } from "antd";

import { mainBlueColor, white } from "@edulastic/colors";

export const QuestionsWrapper = styled.div`
  position: relative;
  width: 288px;
  height: calc(100vh - 62px);
  margin: ${({ centered }) => (centered ? "0 auto" : "unset")};
  padding: 30px 0;
  padding-bottom: 155px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`;

export const AnswerActionsWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: #fbfafc;
`;

export const AnswerAction = styled(Button)`
  width: 120px;
  height: 40px;
  background: ${({ active }) => (active ? mainBlueColor : "transparent")};
  border: 1px solid ${mainBlueColor};
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ active }) => (active ? white : mainBlueColor)};
  text-transform: uppercase;

  &:hover,
  &:active,
  &:focus {
    background: ${({ active }) => (active ? mainBlueColor : "transparent")};
    color: ${({ active }) => (active ? white : mainBlueColor)};
  }

  &:first-child {
    margin-right: 25px;
  }
`;
