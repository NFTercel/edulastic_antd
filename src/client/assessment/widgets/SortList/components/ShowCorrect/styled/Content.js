import styled from "styled-components";
import { WithMathFormula } from "@edulastic/common";
import { FlexRow } from "./FlexRow";

export const Content = WithMathFormula(styled(FlexRow)`
  align-items: center;
  padding-right: 36px;
  padding-left: 36px;
  white-space: nowrap;
`);
