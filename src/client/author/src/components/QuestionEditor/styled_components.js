import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const Container = styled.div`
  padding: 25px 40px;

  @media (max-width: ${mobileWidth}) {
    padding: 10px 25px;
  }
`;

export default Container;
