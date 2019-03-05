import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";
import { mobileWidth, tabletWidth } from "@edulastic/colors";
import { Button, Icon, Collapse, Modal, Row } from "antd";

export const Container = styled.div`
  padding: 30;
  left: 0;
  right: 0;
  height: 100%;
  .ant-collapse {
    border: 0px !important;
  }
  .ant-collapse-item {
    border: 1px solid #d9d9d9 !important;
    margin-top: 10px !important;
    border-radius: 5px !important;
  }
  .ant-collapse > .ant-collapse-item:last-child,
  .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    border-radius: 5px !important;
  }
`;

export const BtnAction = styled(Button)`
  color: #12a6e8;
  border-color: #12a6e8;
  width: 100%;
  :active {
    background-color: #12a6e8;
    color: #fff;
  }
  :hover {
    background-color: #12a6e8;
    color: #fff;
  }
`;

export const BtnProgress = styled(Button)`
  color: #d1a422;
  background-color: #deba5b;
  border: 0px;
  width: 100%;
  font-size: 12px;
  font-weight: bold;
`;
export const GrayFont = styled.p`
  color: grey;
  font-size: 1.1rem;
`;
export const BtnSubmitted = styled(Button)`
  color: #8750ac;
  background-color: #e7c8fb;
  border: 0px;
  width: 100%;
  font-size: 12px;
  font-weight: bold;
`;
export const SortClassContainer = styled(FlexContainer)`
  justify-content: space-between;
`;
export const BtnStarted = styled(Button)`
  color: #0686c0;
  background-color: #c8ebfb;
  border: 0px;
  width: 100%;
  font-size: 12px;
  font-weight: bold;
`;
export const StyledCollapse = styled(Collapse)`
  display: none;
  background-color: #ffffff;
  .ant-collapse-content {
    border: 0px;
  }
  @media (max-width: ${tabletWidth}) {
    display: block;
  }
`;
export const ClassHeaderCollapse = styled(Collapse)`
  display: none;
  background-color: #ffffff;
  .ant-collapse-item {
    border: 0px !important;
  }
  @media (max-width: ${tabletWidth}) {
    display: block;
  }
`;
export const HeaderDiv = styled.div`
  display: flex;
  padding-right: 20px;
`;
export const StyledBox = styled.p`
  width: 90px;
  height: 55px;
  background-color: rgb(0, 216, 218);
  border-radius: 8px;
  @media (max-width: 500px) {
    width: 26%;
  }
`;

export const HeaderContent = styled.div`
  display: none;
  @media (max-width: ${mobileWidth}) {
    width: 100%;
    padding: 20px 10px 10px 24px;
    display: inline-block;
    flex-direction: row;
    align-items: space-between;
    background-color: #fafefd;
  }
  @media (max-width: ${tabletWidth}) {
    width: 100%;
    padding: 20px 10px 10px 24px;
    display: inline-block;
    flex-direction: row;
    align-items: space-between;
    background-color: #fafefd;
  }
`;
export const FilterHeader = styled.p`
  color: #4aab8b;
  font-size: 25px;
  text-align: left;
  display: inline-block;
  padding-left: -40px;
  width: 92%;
`;

export const StyledCloseIcon = styled(Icon)`
  color: #4aab8b;
  font-weight: bolder;
  font-size: 22px;
  cursor: pointer;
`;
export const StyledModal = styled(Modal)`
  @media (max-width: ${mobileWidth}) {
    position: absolute;
    top: -10px;
    left: -10px;
    .ant-modal-body {
      padding: 0px !important;
    }
  }
  @media (max-width: ${tabletWidth}) {
    position: absolute;
    top: -10px;
    left: -10px;
    .ant-modal-body {
      padding: 0px !important;
    }
  }
`;
export const StyledTextBox = styled.div`
  margin-left: 15px;
`;
export const StyledTextFirst = styled.div`
  font-size: 0.8em;
  padding-top: 10px;
  @media (max-width: 500px) {
    font-size: 0.7em;
  }
`;
export const StyledTextSecond = styled.div`
  font-size: 1.2em;
`;
export const PanelDiv = styled.div`
  height: 68px;
`;
export const PanelTableTitle = styled.div`
  display: inline-block;
  width: 50%;
  height: inherit;
`;
export const PanelTableName = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 0.8em;
`;
export const PanelTableValue = styled.div`
  text-align: center;
  font-size: 1.3em;
`;
export const PanelClass = styled.div`
  padding: 20px 0px 10px 0px;
  margin-bottom: 10px;
  width: 100%;
`;
export const FullRow = styled(Row)`
  width: 100%;
`;
