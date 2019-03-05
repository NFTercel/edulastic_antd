import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const Wrapper = styled.div`
  display: block;
  position: relative;
  padding: 1px 0;
  margin-top: ${({ marginTop }) => marginTop || 40}px;

  @media (max-width: ${mobileWidth}) {
    li {
      margin: 0px;
    }
  }
`;
