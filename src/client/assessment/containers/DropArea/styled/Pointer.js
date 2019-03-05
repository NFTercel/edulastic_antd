import styled from "styled-components";
import { black } from "@edulastic/colors";

const getPosition = position => {
  switch (position) {
    case "top":
      return `
        top: -13px;
        left: 0;
        right: 0;
        transform: rotate(90deg);
      `;
    case "bottom":
      return `
        bottom: -13px;
        left: 0;
        right: 0;
        transform: rotate(-90deg);
      `;
    case "left":
      return `
        left: -10px;
        top: 0;
        bottom: 0;
      `;
    case "right":
      return `
        right: -10px;
        top: 0;
        bottom: 0;
        transform: rotate(180deg);
      `;
    default:
      return null;
  }
};

const Pointer = styled.div`
  position: absolute;
  margin: auto;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid ${black};
  transition: border linear 0.1s;

  ${props => getPosition(props.position)}

  :after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #47525d;
    left: -11px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

export default Pointer;
