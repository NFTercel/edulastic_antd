import { blue, darkBlueSecondary, mobileWidth, white } from "@edulastic/colors";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeaderWrapper from "../../../src/mainContent/headerWrapper";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${darkBlueSecondary};
  padding: 0px 40px;
  height: 62px;

  @media (max-width: ${mobileWidth}) {
    margin-bottom: 20px;
    margin-top: 20px;
    flex-direction: column;
    height: 135px;
  }
`;

export const MobileContainer = styled(HeaderWrapper)`
  display: flex;
  flex-direction: column;
  padding: 16px 10px 0px 40px;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${mobileWidth}) {
    flex-direction: column;
  }
`;

export const RightSide = styled.div`
  text-align: right;
  flex: 1;
  position: relative;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.36;
  color: ${white};

  @media (max-width: ${mobileWidth}) {
    font-size: 16px !important;
  }
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

export const ReferenceText = styled.div`
  margin-left: 94.5px;
  color: ${white};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

export const ReferenceValue = styled.div`
  margin-left: 11px;
  font-size: 13px;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${white};
`;
