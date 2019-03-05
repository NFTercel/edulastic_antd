import styled from "styled-components";
import { Select } from "antd";

export const PointerSelect = styled(Select)`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
`;
