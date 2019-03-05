import styled from "styled-components";
import { lightGrey, tabletWidth } from "@edulastic/colors";

export const CorrectAnswerHeader = styled.div`
  padding: 10px;
  /* background: ${lightGrey}; */
  display: inline-flex;
  align-items: center;

  @media (max-width: ${tabletWidth}) {
    width: 100%;
  }
`;
