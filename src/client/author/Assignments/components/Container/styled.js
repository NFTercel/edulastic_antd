import { Radio } from "antd";
import { FlexContainer } from "@edulastic/common";
import { mobileWidth, tabletWidth } from "@edulastic/colors";
import styled from "styled-components";
import { Card } from "@edulastic/common";

export const Container = styled.div`
  padding: 20px 35px 20px 35px;
  left: 0;
  right: 0;
  height: 100%;
  overflow: auto;
`;

export const PaginationInfo = styled.span`
  font-weight: 600;
  font-size: 13px;
  display: inline-block;
  @media (max-width: ${tabletWidth}) {
    display: none;
  }
  @media (max-width: 77s0px) {
    display: none;
  }
`;

export const Main = styled.div`
  flex: 1;
  width: 100%;
`;

export const DRadio = styled(Radio)``;

export const StyledCard = styled(Card)`
  border-radius: 5;
  overflow-x: auto;
`;

export const FullFlexContainer = styled(FlexContainer)`
  @media (max-width: 770px) {
    width: 100%;
  }
  justify-content: flex-end;
`;

export const StyledFlexContainer = styled(FlexContainer)`
  @media (max-width: ${tabletWidth}) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  @media (max-width: ${mobileWidth}) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  @media (max-width: 770px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    width: 100%;
  }
`;
