import { white, darkBlueSecondary, mobileWidth } from "@edulastic/colors";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  margin-bottom: 70px;
  background: ${darkBlueSecondary};
  padding: 0px 40px;
  height: 62px;

  @media (max-width: ${mobileWidth}) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.36;
  color: ${white};
`;
