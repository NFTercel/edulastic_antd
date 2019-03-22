import styled from "styled-components";
import { Popover, Icon, Modal, Input, Checkbox } from "antd";

import { mobileWidth, tabletWidth, lightBlueSecondary, white, lightGreySecondary } from "@edulastic/colors";

export const Container = styled.div`
  padding: 9px 38px 9px 11px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 2px 7px 0 rgba(201, 208, 219, 0.5);
  border-radius: 5px;
  color: ${props => (props.active ? white : lightBlueSecondary)};
  margin-right: 0 !important;
  padding-bottom: 8px;
  width: 120px;
  height: 28px;
  background: ${props => (props.active ? lightBlueSecondary : white)};
  font-weight: 600;
  font-size: 12px;
  user-select: none;
  text-transform: uppercase;

  img {
    filter: ${props => (props.active ? "brightness(0) invert(1)" : "none")};
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
  padding: 16px 19px;
  margin-top: -48px;
  margin-right: -20px;
  background: ${white};
  box-shadow: 0px 2px 8px 1px rgba(163, 160, 160, 0.2);
  border-radius: 5px;

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
  font-weight: 600;
  font-size: 12px;
  margin: 15px 0px 10px 0px;
  text-align: left;
`;

export const StyledParagraph = styled.p`
  display: inline-block;
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

export const FilterInput = styled(Input.Search)`
  .ant-input {
    border: none;
    background: ${lightGreySecondary};
  }

  .ant-input-search-icon {
    color: ${lightBlueSecondary};
  }
`;

export const FilterCheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FilterCheckbox = styled(Checkbox)`
  font-weight: 600;
  font-size: 12px;

  .ant-checkbox-wrapper {
    white-space: nowrap;
  }
`;

export const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
