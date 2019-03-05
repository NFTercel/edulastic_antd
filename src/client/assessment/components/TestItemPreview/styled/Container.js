import styled from "styled-components";
import { Paper } from "@edulastic/common";
import { SMALL_DESKTOP_WIDTH } from "../../../constants/others";

export const Container = styled.div`
  display: ${props => (props.width > SMALL_DESKTOP_WIDTH ? "flex" : "block")};
`;
