import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const AdaptiveCloze = styled.div`
  borderradius: 5px;
  padding: 30px 120px;
  background: ${props => props.background} & > div {
    width: 640px;
  }

  @media (max-width: ${mobileWidth}) {
    padding: 5px 5px;

    & > div {
      width: 100%;
    }
  }
`;
