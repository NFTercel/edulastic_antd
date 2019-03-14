import styled from "styled-components";

import { white, secondaryTextColor, greenDark, mainBlueColor, green, red } from "@edulastic/colors";

export const QuestionItemWrapper = styled.div`
  margin-bottom: 10px;
  padding: 19px 0 18px 13px;
  background: ${white};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const AnswerForm = styled.div`
  display: flex;
  align-items: center;
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

export const AnswerIndicator = styled.span`
  display: inline-block;
  padding: 8px 15px;

  svg {
    fill: ${({ correct }) => (correct ? green : red)};
    width: 13px;
    height: 13px;

    &:hover {
      fill: ${greenDark};
    }
  }
`;

export const CorrectAnswer = styled.p`
  margin: 15px 0 0 5px;
`;

export const CorrectAnswerTitle = styled.span`
  display: inline-block;
  margin-right: 5px;
  font-size: 11px;
  text-transform: uppercase;
  color: ${secondaryTextColor};
`;

export const CorrectAnswerValue = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: bold;
  color: ${secondaryTextColor};
`;
