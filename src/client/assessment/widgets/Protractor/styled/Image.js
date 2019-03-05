import styled from "styled-components";
import ProtractorImg from "../assets/protractor.svg";

export const Image = styled.div`
  background: url(${ProtractorImg}) no-repeat;
  background-size: cover;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
