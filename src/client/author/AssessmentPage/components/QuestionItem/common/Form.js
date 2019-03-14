import styled from "styled-components";

import { white, secondaryTextColor, mainBlueColor, green, red } from "@edulastic/colors";

const getBackground = ({ selected, checked, correct }) =>
  selected ? (checked ? (correct ? green : red) : mainBlueColor) : white;

const getBorder = ({ selected, checked, correct }) =>
  selected ? (checked ? (correct ? green : red) : mainBlueColor) : "#eee";

export const QuestionOption = styled.span`
  display: inline-block;
  min-width: 36px;
  height: 36px;
  padding-top: 10px;
  border: 1px solid ${getBorder};
  border-radius: 18px;
  font-size: 10px;
  text-align: center;
  color: ${({ selected }) => (selected ? white : secondaryTextColor)};
  background: ${getBackground};
  cursor: ${({ review }) => (review ? "pointer" : "default")};

  &:not(:first-child) {
    margin-left: 9px;
  }
`;

export const QuestionText = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 10px 0;
`;
