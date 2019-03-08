import styled from "styled-components";
import { greenDark, secondaryTextColor, white, green } from "@edulastic/colors";
import { WithMathFormula } from "@edulastic/common";

export const GraphToolbar = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 88px;
  padding: 0;
  background-color: rgba(230, 230, 230, 0.23);
  font-size: ${props => (props.fontSize ? props.fontSize : 14)}px;

  ul {
    list-style: none;
  }

  ul li {
    margin: 2px 1px 0 0;
  }
`;

export const ToolbarLeft = styled.ul`
  display: flex;
  max-width: 100%;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
`;

export const ToolbarRight = styled.ul`
  display: flex;
  align-items: center;
  min-width: 93px;
  height: 100%;
  margin: 0;
  margin-left: auto;
  padding: 0;
`;

export const ToolbarItem = styled.div`
  width: 100%;
  height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ToolbarItemLabel = styled.span`
  color: ${props => (props.color ? props.color : `${secondaryTextColor}`)}
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
`;

export const ToolbarItemIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  width: auto;
  height: auto;
  min-width: 23px;
  min-height: 24px;
  margin-bottom: 5px;
`;

export const ToolBtn = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 93px;
  height: 84px;
  background-color: transparent;
  color: ${secondaryTextColor};
  cursor: pointer;
  display: inline-block;
  line-height: 1.5em;
  transition: background-color 0.1s ease-in;
  user-select: none;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0);

  svg {
    color: ${secondaryTextColor};
    stroke: ${secondaryTextColor};
    fill: ${secondaryTextColor};
  }

  &:hover {
    background-color: ${white};
  }

  &:active {
    background-color: ${white};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.06);
  }

  &.active {
    background-color: ${white};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.06);

    .dd-header-title svg {
      color: ${greenDark};
      stroke: ${greenDark};
      fill: ${greenDark};
    }

    .tool-btn-icon svg {
      color: ${greenDark};
      stroke: ${greenDark};
      fill: ${greenDark};
    }
  }
`;

export const GraphWrapper = styled.div`
  width: ${props => (props.width ? `${props.width}px` : "100%")};
  border-radius: 4px;
  border: ${props => (props.border ? 1 : 0)}px solid ${props => props.borderColor};
`;

export const JSXBox = styled.div`
  background-color: ${white};
  position: relative;
  overflow: hidden;

  border: 1px solid #e8e8e8;
  border-radius: 0;
  margin: ${props => (props.margin ? props.margin : 0)}px;
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 108%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 150px;
  margin: 1px 0 0;
  list-style: none;
  user-select: none;
  white-space: nowrap;
  border: 0;
  padding: 20px 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  z-index: 10;

  &:before {
    position: absolute;
    top: -10px;
    left: 50%;
    content: "";
    transform: translateX(-50%);
    z-index: 11;
    width: 12px;
    height: 10px;
    border-style: solid;
    border-width: 0 12px 10px 12px;
    border-color: transparent transparent #fff transparent;
  }
`;

export const GroupToolBtn = styled.li`
  padding: 0.6em 1.6em;
  background-color: ${white};
  width: 100%;
  line-height: 1.5em;
  transition: background-color 0.1s ease-in;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;
  color: ${secondaryTextColor};
  box-shadow: none;

  svg {
    color: ${secondaryTextColor};
    stroke: ${secondaryTextColor};
    fill: ${secondaryTextColor};
  }

  &:hover {
    background-color: ${green};
    color: ${white};

    svg {
      color: ${white};
      stroke: ${white};
      fill: ${white};
    }
  }

  &.active {
    background-color: ${green};
    color: ${white};

    svg {
      color: ${white};
      stroke: ${white};
      fill: ${white};
    }
  }
`;

export const DropdownArrowWrapper = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
  display: flex;
  left: 50%;
  align-items: center;
  justify-content: center;
  max-width: 12px;
  max-height: 12px;
  z-index: 11;
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 19px;
  font-size: 16px;
`;

export const LabelTop = WithMathFormula(styled.div`
  height: 20px;
  line-height: 20px;
  top: 0;
  left: 0;
  text-align: center;
  position: absolute;
  width: 100%;
`);
export const LabelBottom = WithMathFormula(styled.div`
  height: 20px;
  line-height: 20px;
  bottom: 0;
  left: 0;
  text-align: center;
  position: absolute;
  width: 100%;
`);
export const LabelRight = WithMathFormula(styled.div`
  height: 20px;
  line-height: 20px;
  transform: rotate(90deg);
  transform-origin: top right;
  bottom: 0;
  left: 0;
  text-align: center;
  position: absolute;
  width: 100%;
  padding-left: 40px;
`);
export const LabelLeft = WithMathFormula(styled.div`
  height: 20px;
  line-height: 20px;
  transform: rotate(-90deg);
  transform-origin: top left;
  bottom: 0;
  left: 0;
  text-align: center;
  position: absolute;
  width: 100%;
  padding-right: 40px;
`);

export const Title = WithMathFormula(styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.5em;
  display: block;
  padding: 1em 0;
`);
