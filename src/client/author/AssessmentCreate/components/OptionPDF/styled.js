import styled from "styled-components";

import { Paper } from "@edulastic/common";
import { grey, secondaryTextColor, mainBlueColor } from "@edulastic/colors";

export const PaperCreate = styled(Paper)`
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 450px;
  text-align: center;

  .ant-btn {
    width: 225px;
    text-transform: uppercase;
    font-size: 11px;
    min-height: 40px;
    background: ${mainBlueColor};
    border: none;
    border-radius: 4px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${grey};
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const DesriptionBottom = styled.p`
  font-size: 14px;
  padding: 0 23px;
  font-weight: 600;
  color: ${secondaryTextColor};
`;
