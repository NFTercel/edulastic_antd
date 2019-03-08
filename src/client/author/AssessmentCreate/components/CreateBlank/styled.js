import styled from "styled-components";

import { darkGrey, mainBlueColor } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";

export const Description = styled.p`
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${darkGrey};
  margin-top: 5px !important;
`;

export const CreateBlankContainer = styled(FlexContainer)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 60%;

  .ant-btn {
    width: 225px;
    text-transform: uppercase;
    font-size: 11px;
    min-height: 40px;
    margin-top: 50px;
    background: ${mainBlueColor};
    border: none;
    border-radius: 4px;
  }
`;
