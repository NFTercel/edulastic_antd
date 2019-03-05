import styled, { css } from "styled-components";
import { Row, Switch, Radio, Col, Modal } from "antd";
import { EduButton, FlexContainer } from "@edulastic/common";
import { white, blue, lightGrey, mainTextColor } from "@edulastic/colors";
const RadioGroup = Radio.Group;

// Edit Modal styled
export const Button = styled(EduButton)`
  width: 30%;
`;

export const FooterWrapper = styled(FlexContainer)`
  padding: 10px 0;
`;

export const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

export const StyledRowLabel = styled(Row)`
  margin-bottom: 15px;
`;

export const SettingBtnOpen = css`
  background: ${white};
  box-shadow: 0px -6px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0px 0px;
`;

export const SettingsBtn = styled.span`
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: ${blue};
  padding: 20px 40px;
  ${props => props.isVisible && SettingBtnOpen}
`;

export const ModalWrapper = styled(Modal)`
  background: ${lightGrey};
  padding: 15px 30px;
  border-radius: 8px;
  color: ${mainTextColor};
  .ant-modal-header,
  .ant-modal-footer,
  .ant-modal-content {
    background: transparent;
    border: none;
    box-shadow: none;
    padding-left: 0;
  }
  .ant-modal-body {
    padding: 20px 0 0;
  }
  .ant-modal-close-x {
    width: 36px;
    height: 36px;
    line-height: 46px;
  }
  .ant-modal-close-x .anticon svg {
    font-size: 20px;
    color: ${mainTextColor};
  }
  .ant-modal-title {
    font-size: 20px;
    font-weight: 600;
    color: ${mainTextColor};
  }
  .ant-select-selection {
    height: 40px;
  }
  .ant-select-selection__placeholder,
  .ant-select-search__field__placeholder {
    line-height: 28px;
  }
  .ant-select-selection--multiple > ul > li,
  .ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
    margin-top: 7px;
  }
  span.ant-radio + * {
    padding-left: 15px;
    padding-right: 25px;
  }
`;
export const InitOptions = styled.div`
  background: ${white};
  box-shadow: 2px 3px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;
  border-radius: 8px;
  padding: 20px 40px;
`;

// Settings styled

export const AlignRight = styled(RadioGroup)`
  float: right;
`;

export const AlignSwitchRight = styled(Switch)`
  float: right;
`;

export const StyledRowSettings = styled.div`
  ${props => !props.islast && "border-bottom: 1px solid rgba(128, 128, 128, 0.25);"}
  padding: 15px 0px;
  font-size: 10px;
  display: flex;
  align-items: center;
`;

export const FlexItem = styled(Col)`
  display: flex;
  justify-content: center;
`;

export const TbleHeader = styled(Row)`
  margin: 18px 0;
`;

export const SettingsWrapper = styled.div`
  background: ${white};
  padding: 20px 40px 10px 40px;
  box-shadow: 2px 3px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  border-radius: 0px 8px 8px 8px;
  margin-top: -3px;
`;
