import { Progress } from "antd";
import styled from "styled-components";

export const StyledProgress = styled(Progress)`
  margin: 0 30px 15px 30px;
  .ant-progress-text {
    margin-top: -7px !important;
    font-weight: bold;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
`;

export const StyledProgressDiv = styled.div`
  display: flex;
  position: relative;
`;

export const GraphDescription = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 10px;
  color: #b1b1b1;
  margin: 3px 0 0 0;
  padding: 0;
  text-transform: uppercase;
  position: absolute;
  width: 100%;
  top: 50%;
`;

export const GraphText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1em;
`;
