import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";

export const FlexCon = styled(FlexContainer)`
  border-radius: 4px;
  & > *:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  & > *:last-child {
    border-top: 1px solid ${props => props.theme.widgets.essayRichText.flexConBorderColor}!important;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  border: 1px solid ${props => props.theme.widgets.essayRichText.flexConBorderColor};
  & > button {
    &:focus {
      outline: none;
    }
    border: none;
    padding: 3px 5px;
    svg {
      height: auto !important;
    }
    .ql-stroke {
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2;
    }
    .ql-stroke.ql-thin {
      stroke-width: 1;
    }
  }
`;
