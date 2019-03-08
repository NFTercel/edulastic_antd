import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const ResponseQuestion = styled.div`
  border-radius: 5px;
  background: ${props => props.background};
  padding: 30px 120px;
  @media (max-width: ${mobileWidth}) {
    padding: 10px;

    & > div {
      width: 100%;
    }
  }
`;
