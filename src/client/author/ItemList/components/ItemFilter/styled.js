import { Icon, Row } from "antd";
import { blue, boxShadowDefault, desktopWidth, greenDark, mainBlueColor, textColor } from "@edulastic/colors";
import { TextField } from "@edulastic/common";
import styled from "styled-components";
import Modal from "react-responsive-modal";

export const Container = styled.div`
  width: 250px;

  @media (max-width: ${desktopWidth}) {
    width: 100%;
  }
`;

export const FixedFilters = styled.div`
  position: fixed;
  width: 250px;
  top: 85px;
  padding-right: 15px;

  @media (max-width: ${desktopWidth}) {
    width: 100%;
    position: relative;
    top: auto;
    padding-right: 0;
  }
`;

export const Header = styled.div`
  display: flex;
`;

export const HeaderRow = styled(Row)`
  width: 100%;
`;

export const SearchField = styled.div`
  box-shadow: ${boxShadowDefault};
  border-radius: 10px;
`;

export const TextFieldStyled = styled(TextField)`
  padding: 16px;
  padding-right: 68px;
  outline: none;
`;

export const TextFieldSearch = styled(TextField)`
  height: 40px;
  padding: 10px 10px;

  span {
    right: 8px;
  }

  .ant-input-search-icon {
    color: ${mainBlueColor};
    font-size: 15px;
    &:hover {
      color: ${mainBlueColor};
    }
  }

  @media (max-width: ${desktopWidth}) {
    height: 40px;
  }
`;

export const SearchIcon = styled(Icon)`
  color: ${mainBlueColor};
  font-size: 15px;
`;

export const FilterButton = styled.div`
  display: none;
  flex: 1;
  height: 40px;
  box-shadow: ${boxShadowDefault};
  border-radius: 10px;

  .ant-btn {
    height: 40px;
    border-radius: 10px;
    width: 100%;

    span {
      font-size: 11px;
      font-weight: 600;
      color: ${textColor};
    }
  }

  @media (max-width: ${desktopWidth}) {
    display: block;
    margin-left: 10px;
  }
`;

export const MainFilter = styled.div`
  margin-top: 17px;
  z-index: 0;

  .scrollbar-container {
    overflow: auto;
    height: calc(100vh - 195px);

    ::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: ${desktopWidth}) {
    position: relative;
    display: ${props => (props.isVisible ? "block" : "none")};
    padding: 0px 25px 0px 19px;
  }
`;

export const MainFilterHeader = styled.div`
  display: flex;

  @media (max-width: ${desktopWidth}) {
    display: none;
  }
`;

export const Title = styled.span`
  font-size: 14px;
  letter-spacing: 0.3px;
  color: ${greenDark};
  font-weight: 600;
  flex: 1;
`;

export const Clear = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${blue};
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const StyledModal = styled(Modal)`
  width: 100%;
  height: 100%;

  svg {
    fill: red;
  }
`;

export const StyledModalContainer = styled.div`
  width: calc(100vw - 80px);
`;

export const StyledModalTitle = styled.div`
  font-size: 22px;
  color: ${greenDark};
  font-weight: 600;
`;
