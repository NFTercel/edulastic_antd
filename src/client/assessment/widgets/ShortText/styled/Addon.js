import styled from "styled-components";
import { grey, lightGrey } from "@edulastic/colors";

export const Addon = styled.div`
  background: ${lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  position: absolute;
  right: 1px;
  top: 2px;
  width: 30px;
  height: 36px;

  :hover {
    background: ${grey};
  }
`;
