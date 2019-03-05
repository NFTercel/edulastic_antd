import styled from "styled-components";

export const Pointer = styled.div`
  position: absolute;
  top: 0;
  width: 16px;
  left: 0;
  text-align: center;
  line-height: 0px;
  display: none;

  &.right {
    width: 16px;
    display: block;
    top: calc(50% - 8px);
    right: -20px;
    left: unset;
    transform: rotate(90deg);
  }
  &.left {
    left: -20px;
    display: block;
    top: calc(50% - 8px);
    transform: rotate(-90deg);
  }
  &.top {
    top: -20px;
    left: calc(50% - 8px);
    display: block;
  }
  &.bottom {
    display: block;
    left: calc(50% - 8px);
    bottom: -20px;
    transform: rotate(180deg);
  }
`;
