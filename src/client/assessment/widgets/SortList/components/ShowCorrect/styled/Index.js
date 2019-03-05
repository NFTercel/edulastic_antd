import styled from "styled-components";
import { FlexRow } from "./FlexRow";

export const Index = styled(FlexRow)`
  align-items: center;
  justify-content: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 40px;
  height: 40px;
  color: ${props => props.theme.widgets.sortList.correctAnswersIndexColor};
  background-color: ${props => props.theme.widgets.sortList.correctAnswersIndexBgColor};
`;
