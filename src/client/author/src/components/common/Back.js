import styled from "styled-components";
import { Link } from "react-router-dom";

const Back = styled(Link)`
  color: ${props => props.textcolor};
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;

  :hover {
    color: ${props => props.hovercolor};
  }
`;

export default Back;
