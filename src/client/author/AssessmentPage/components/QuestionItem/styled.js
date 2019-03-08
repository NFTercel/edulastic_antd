import styled from "styled-components";

import { white, secondaryTextColor, greenDark } from "@edulastic/colors";

export const QuestionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 19px 0 18px 13px;
  background: ${white};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const QuestionNumber = styled.span`
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: ${({ dragging }) => (dragging ? "#aaafb8" : "white")};
  background: ${({ dragging }) => (dragging ? "transparent" : "#aaafb8")};
  border: 2px ${({ dragging }) => (dragging ? "dashed" : "solid")} #aaafb8;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  text-align: center;
  padding-top: 6px;
`;

export const QuestionForm = styled.div`
  display: flex;
  width: 180px;
  margin-left: 13px;
`;

export const QuestionOption = styled.span`
  display: inline-block;
  min-width: 36px;
  height: 36px;
  padding-top: 10px;
  border: 1px solid #eee;
  border-radius: 18px;
  font-size: 10px;
  text-align: center;
  color: ${secondaryTextColor};

  &:not(:first-child) {
    margin-left: 9px;
  }
`;

export const EditButton = styled.span`
  display: inline-block;
  padding: 8px 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  svg {
    fill: ${greenDark};
    width: 13px;
    height: 13px;

    &:hover {
      fill: ${greenDark};
    }
  }
`;

export const QuestionText = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 10px 0;
`;
