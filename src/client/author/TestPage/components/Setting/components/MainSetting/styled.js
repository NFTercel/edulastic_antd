import { Anchor, Radio, Select } from "antd";
import styled from "styled-components";
import { mobileWidth } from "@edulastic/colors";

export const StyledAnchor = styled(Anchor)`
  .ant-anchor-link {
    padding: 20px 30px;
  }

  .ant-anchor-link-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #b1b1b1;
  }

  .ant-anchor-link-title-active {
    color: #00b0ff;
  }

  .ant-anchor-ink-ball {
    border: 2px solid #00b0ff;
  }
`;

export const Block = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid lightgrey;

  .ant-input {
    height: 40px;
    font-size: 13px;
    border-radius: 4px;

    ::placeholder {
      font-style: italic;
    }
  }
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #4aac8b;
`;

export const Body = styled.div`
  margin-top: 30px;
  margin-bottom: 22px;
`;

export const FlexBody = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 22px;
`;

export const Description = styled.div`
  font-size: 13px;
  color: #444444;
  margin-bottom: 30px;
`;

export const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;

  span {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }

  .ant-radio {
    margin-right: 25px;
  }

  .ant-radio-wrapper {
    margin-bottom: 18px;
  }
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;

  span {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }

  .ant-radio {
    margin-right: 25px;
  }

  .ant-radio-wrapper {
    margin-bottom: 18px;
    margin-right: 40px;
  }
`;
export const GenerateReportSelect = styled(Select)`
  height: 40px;
`;
export const TestTypeSelect = styled(GenerateReportSelect)`
  width: 80%;
  margin-right: 30px;
`;

export const BlueText = styled.span`
  color: #00b0ff;
  font-weight: 600;
`;

export const BandsText = styled.span`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.3px;
  color: #4aac8b;
`;

export const NormalText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #434b5d;
`;

export const InputTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #434b5d;
  margin-bottom: 12px;
`;

export const AdvancedSettings = styled.div``;

export const AdvancedButton = styled.div`
  display: flex;
  justify-content: space-between;

  .ant-btn {
    height: 40px;
    width: 225px;
    font-size: 11px;
    font-weight: 600;
    color: #00b0ff;
    border: 1px solid;
  }
`;

export const Line = styled.div`
  border-top: 1px solid #00b0ff;
  width: calc((100% - 285px) / 2);
  position: relative;
  top: 20px;
`;

export const RadioWrapper = styled(Block)`
  @media (max-width: ${mobileWidth}) {
    .ant-row {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #e8e8e8;
      padding-top: 20px;

      &:first-child {
        margin-top: 20px;
      }

      .ant-col-8 {
        text-align: center;
        margin-bottom: 20px;
      }
    }
  }
`;
