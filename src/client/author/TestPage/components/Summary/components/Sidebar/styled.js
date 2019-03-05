import styled from "styled-components/";
import { greenDark, secondaryTextColor, white } from "@edulastic/colors";

export const Block = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 30px;
  margin-bottom: 25px;

  :last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .ant-input {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
    padding-left: 20px;
  }

  .ant-select-selection__choice {
    height: 23px !important;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background: #d1f0ff;
    margin-top: 7px !important;
  }

  .ant-select-selection__rendered {
    padding-left: 20px;
  }

  .ant-select-selection__choice__content {
    font-size: 11px;
    letter-spacing: 0.2px;
    color: #0083be;
    font-weight: bold;
    height: 23px;
    display: flex;
    align-items: center;
  }

  .ant-select-remove-icon svg {
    fill: #0083be;
  }

  textarea {
    height: 116px;
  }
`;

export const MainTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${secondaryTextColor};
  letter-spacing: 0.2px;
  margin-bottom: 10px;
`;

export const Avatar = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${greenDark};
  color: ${white};
  font-size: 22px;
  font-weight: 700;
`;

export const Title = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #4aac8b;
  margin-right: 3px;
`;

export const TitleContent = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #444444;
`;
