import styled from "styled-components";
import { Popover, Icon, Modal } from "antd";
import { mobileWidth, tabletWidth } from "@edulastic/colors";

export const Container = styled.div`
  padding: 10px 15px 14px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #fff;
    padding: 10px 15px 10px 15px;
  }
  @media (max-width: 770px) {
    background-color: #fff;
    border-radius: 5px;
    padding: 9px 25px 11px 25px;
  }
`;

export const FilterImg = styled.img`
  margin-right: 15px;
  width: 17px;
`;

export const MainContainer = styled.div`
  width: 260px;
  text-align: center;
  padding: 10px;
  @media (max-width: ${mobileWidth}) {
    width: 100%;
    padding: 30px;
  }
  @media (max-width: ${tabletWidth}) {
    width: 100%;
    padding: 30px;
  }
`;

export const StyledPopover = styled(Popover)`
  @media (max-width: ${mobileWidth}) {
    display: none;
  }
  @media (max-width: ${tabletWidth}) {
    display: none;
  }
`;

export const StyledBoldText = styled.p`
  fontweight: bold;
  margin: 15px 0px 10px 0px;
  text-align: left;
`;

export const StyledParagraph = styled.p`
  margin: 15px 0px 10px 0px;
  text-align: left;
`;

export const ModalContent = styled.div`
  display: none;
  @media (max-width: ${mobileWidth}) {
    display: block;
  }
  @media (max-width: ${tabletWidth}) {
    display: block;
  }
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
