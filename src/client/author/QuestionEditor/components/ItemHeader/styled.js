import { blue, darkBlue, darkBlueSecondary, mobileWidth, white } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";

export const Container = styled(HeaderWrapper)`
  background: ${darkBlue};
  padding: 0px 40px;
  height: 62px;
  display: flex;
  align-items: center;
  background: ${darkBlueSecondary};

  @media (max-width: ${mobileWidth}) {
    margin-bottom: 20px;
    margin-top: 20px;
    height: 100px;
  }
`;

export const ExtraFlex = styled(FlexContainer)`
  @media (max-width: ${mobileWidth}) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${mobileWidth}) {
    padding-bottom: 15px;
    padding-top: 8px;
  }
`;

export const RightSide = styled.div`
  text-align: right;
  flex: 1;
  position: relative;
`;

export const Title = styled.div`
  font-size: 22px;
  white-space: nowrap;
  font-weight: 700;
  line-height: 1.36;
  color: ${white};
  @media (max-width: ${mobileWidth}) {
    font-size: 18px;
  }
`;

export const ToggleButton = styled.div`
  color: #fff;
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
`;

export const Back = styled(Link)`
  color: ${white};
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;

  :hover {
    color: ${blue};
  }
`;

export const TitleNav = styled.div`
  display: flex;
  width: 200px;
`;
