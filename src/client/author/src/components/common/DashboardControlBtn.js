/* eslint-disable */
import styled from "styled-components";

const DashboardControlBtn = styled.button`
  width: ${props => (props.answerbtn ? "157px" : "130px")};
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  position: relative;
  color: ${props => (props.active ? "#ffffff" : props.save ? "#ffffff" : "#878282")};
  margin: 0 10px;
  font-size: 11px;
  outline: none;
  background-color: ${props => {
      if (props.save) return "#1fe3a1";
      if (props.help || props.source) return "#e5e5e5";
      if (props.active) return "#00b0ff";
      return "$ffffff";
    }}
    & > span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    line-height: 1.36;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    box-sizing: border-box;
    padding-left: 5px;
  }

  & i,
  & svg {
    position: absolute;
    top: 0;
    left: 10px;
    height: 100% !important;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${props => (props.active ? "#ffffff" : props.save ? "#057750" : "#878282")};
    fill: ${props => (props.active ? "#ffffff" : props.save ? "#057750" : "#878282")};
  }

  &:hover i,
  &:hover svg,
  &:hover {
    background-color: #3fbef7;
    color: #ffffff;
    fill: #ffffff;
  }
`;

export default DashboardControlBtn;
