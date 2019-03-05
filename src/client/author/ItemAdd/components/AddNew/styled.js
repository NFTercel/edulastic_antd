import { secondaryTextColor, green } from "@edulastic/colors";
import styled from "styled-components";

export const PlusWrapper = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px;
  background-color: #efefef;
  border: solid 2px #e9e9e9;
  height: 360px;

  &:hover svg {
    fill: ${green};
  }
`;

export const Text = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${secondaryTextColor};
`;
