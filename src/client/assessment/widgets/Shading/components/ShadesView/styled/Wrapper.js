import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  padding: 1px 0;
  border: ${props => (props.border === "outer" ? `2px solid ${props.theme.widgets.shading.liBorderColor}` : "none")};
  margin-top: ${({ marginTop }) => marginTop || 40}px;

  @media (max-width: ${mobileWidth}) {
    li {
      margin: 0px;
    }
  }
`;
