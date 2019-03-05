import styled from "styled-components";
import { white } from "@edulastic/colors";

const StyledNavLink = styled.div`
  cursor: pointer;
  color: ${white};
  padding: 0 15px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  border: none;
  box-shadow: none;
  align-items: center;
  height: 60px;
  border-radius: 0;
  background: #0288d1;
  background: ${props => (props.active === "true" ? "#057fc1" : "transparent")};
  border-bottom: ${props => (props.active === "true" ? "4px solid #c9c9c9" : "none")};

  :hover {
    border-bottom: 4px solid #c9c9c9;
  }
`;

export default StyledNavLink;
