import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";
import { blue } from "@edulastic/colors";

export const Item = styled(FlexContainer)`
  cursor: pointer;
  margin-right: 20px;
  color: ${blue};
  position: relative;
`;

export const Container = styled(FlexContainer)`
  justify-content: space-between;
  padding-bottom: 22px;
  margin-top: ${props => (props.windowWidth > 468 ? "0px" : "15px")};
`;
