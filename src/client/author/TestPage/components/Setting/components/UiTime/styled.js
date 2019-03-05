import styled from "styled-components";
import { Radio, Row } from "antd";

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

  .ant-input {
    height: 32px;
    font-size: 13px;
    border-radius: 4px;

    ::placeholder {
      font-style: italic;
    }
  }

  .ant-select {
    width: 100%;
    font-size: 13px;
    font-weight: 600;
    color: #434b5d;
  }

  .ant-select-arrow-icon {
    svg {
      fill: #00b0ff;
    }
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

export const InputTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #434b5d;
  margin-bottom: 12px;
`;

export const RowWrapper = styled(Row)`
  width: 100%, 
  margin-bottom: 25px
`;

export const CommonText = styled.span`
  font-size: 13px;
  font-weight: 600;
`;
