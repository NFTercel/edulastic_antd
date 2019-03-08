import styled from "styled-components";

import { white, green } from "@edulastic/colors";

export const Status = styled.span`
  display: inline-block;
  width: 95px;
  height: 18px;
  margin-left: 18px;
  color: ${white};
  background: #0e93dc;
  font-size: 9px;
  text-transform: uppercase;
  border-radius: 4px;
  text-align: center;
  padding-top: 3px;
  margin-top: 4px;
`;

export const SaveWrapper = styled.div`
  .ant-btn {
    display: flex;
    justify-content: space-between;
    width: 147px;
    height: 40px;
    text-transform: uppercase;
    background: ${green};
    font-size: 11px;
    font-weight: 600;

    svg {
      fill: ${white};
    }
  }
`;
