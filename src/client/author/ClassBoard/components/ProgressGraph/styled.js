import { Progress } from "antd";
import styled from "styled-components";

export const StyledProgress = styled(Progress)`
  margin: 0 30px 15px 30px;
  .ant-progress-text {
    color: #434b5d;
    font-size: 35px;
    margin-top: -7px !important;
    font-weight: bold;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
`;
export const StyledDivF = styled.div``;

export const StyledProgressDiv = styled.div`
  display: flex;
  position: relative;
`;

export const GraphDescription = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 11px;
  color: #b1b1b1;
  margin: 3px 0 0 0;
  padding: 0;
  text-transform: uppercase;
  position: absolute;
  width: 100%;
  top: 50%;
`;

export const GraphInfo = styled.div`
  text-align: center;
  color: #434b5d;
  font-weight: 600;
  font-size: 13px;
  padding: 6px 17px;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;
