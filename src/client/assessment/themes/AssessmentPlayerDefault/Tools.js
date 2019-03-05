import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import ColorPicker from "rc-color-picker";
import styled from "styled-components";

import { mainBlueColor, white, darkBlueSecondary, secondaryTextColor } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";
import { drawTools } from "@edulastic/constants";
import {
  IconPencilEdit,
  IconTrash,
  IconRedo,
  IconUndo,
  IconLine,
  IconBreakingLine,
  IconSquare,
  IconTriangle,
  IconCircleWithPoints,
  IconLetters,
  IconRoot,
  IconSquareTriangle,
  IconSelected
} from "@edulastic/icons";

const customizeIcon = icon => styled(icon)`
  fill: ${white};
  width: 20px;
  height: 20px;
  margin-left: -5px;
  margin-top: 5px;
  &:hover {
    fill: ${white};
  }
`;

const Trash = customizeIcon(IconTrash);

const Redo = customizeIcon(IconRedo);

const Undo = customizeIcon(IconUndo);

const Pencil = customizeIcon(IconPencilEdit);

const LineIcon = customizeIcon(IconLine);

const BreakingLineIcon = customizeIcon(IconBreakingLine);

const SquareIcon = customizeIcon(IconSquare);

const TriangleIcon = customizeIcon(IconTriangle);

const CircleWithPointsIcon = customizeIcon(IconCircleWithPoints);

const LettersIcon = customizeIcon(IconLetters);

const RootIcon = customizeIcon(IconRoot);

const SquareTriangleIcon = customizeIcon(IconSquareTriangle);

const SelectedIcon = customizeIcon(IconSelected);

const buttonsList = [
  { mode: drawTools.FREE_DRAW, icon: <Pencil /> },
  { mode: drawTools.DRAW_SIMPLE_LINE, icon: <LineIcon /> },
  { mode: drawTools.DRAW_BREAKING_LINE, icon: <BreakingLineIcon /> },
  { mode: drawTools.DRAW_SQUARE, icon: <SquareIcon /> },
  { mode: drawTools.DRAW_TRIANGLE, icon: <TriangleIcon /> },
  { mode: drawTools.DRAW_CIRCLE, icon: <CircleWithPointsIcon /> },
  { mode: drawTools.DRAW_TEXT, icon: <LettersIcon /> },
  { mode: "none", icon: <RootIcon /> },
  { mode: "none", icon: <SquareTriangleIcon /> },
  { mode: "none", icon: <SelectedIcon /> }
];

const Tools = ({
  onToolChange,
  activeMode,
  onFillColorChange,
  fillColor,
  currentColor,
  deleteMode,
  onColorChange,
  undo,
  redo
}) => {
  const getAlpha = color => {
    const regexValuesFromRgbaColor = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;

    return color.match(regexValuesFromRgbaColor) !== null
      ? +color.match(regexValuesFromRgbaColor).slice(-1) * 100
      : 100;
  };

  const showFillColorArray = [drawTools.DRAW_SQUARE, drawTools.DRAW_CIRCLE, drawTools.DRAW_TRIANGLE];

  const activeTool = buttonsList.find(button => button.mode === activeMode);

  return (
    <ToolBox activeMode={activeMode} justifyContent="center">
      {activeMode === "" && (
        <FlexContainer childMarginRight={0} justifyContent="flex-end" flexDirection="column">
          {buttonsList.map((button, i) => (
            <StyledButton key={i} onClick={onToolChange(button.mode)} enable={activeMode === button.mode}>
              {button.icon}
            </StyledButton>
          ))}
        </FlexContainer>
      )}
      {activeMode !== "" && (
        <FlexContainer style={{ width: "50px" }} childMarginRight={0} flexDirection="column">
          <BackButton onClick={onToolChange("")} justifyContent="center" style={{ flex: 0.18 }}>
            Back
          </BackButton>
          <Separator />
          {activeTool && (
            <StyledButton onClick={onToolChange("")} enable>
              {activeTool.icon}
            </StyledButton>
          )}
          <FlexContainer childMarginRight={0} flexDirection="column">
            <StyledButton onClick={undo}>
              <Undo />
            </StyledButton>
            <StyledButton onClick={redo}>
              <Redo />
            </StyledButton>
            <StyledButton onClick={onToolChange("deleteMode")} enable={deleteMode}>
              <Trash />
            </StyledButton>
          </FlexContainer>
          <Separator />
          <FlexContainer childMarginRight={0} flexDirection="column" justifyContent="center">
            <FlexContainer flexDirection="column" childMarginRight={0} id="tool">
              <FlexContainer flexDirection="column" childMarginRight={0}>
                {showFillColorArray.includes(activeMode) && (
                  <Block>
                    <Label>Fill</Label>
                    <ColorPicker
                      animation="slide-up"
                      color={fillColor}
                      style={{ zIndex: 100000 }}
                      alpha={getAlpha(fillColor)}
                      onChange={onFillColorChange}
                    />
                  </Block>
                )}
                {activeMode !== drawTools.DRAW_TEXT ? (
                  <Block>
                    <Label>Line</Label>
                    <ColorPicker
                      style={{ zIndex: 100000 }}
                      animation="slide-up"
                      color={currentColor}
                      alpha={getAlpha(currentColor)}
                      onChange={onColorChange}
                    />
                  </Block>
                ) : (
                  <Block>
                    <Label>Text</Label>
                    <ColorPicker
                      style={{ zIndex: 100000 }}
                      animation="slide-up"
                      color={currentColor}
                      alpha={getAlpha(currentColor)}
                      onChange={onColorChange}
                    />
                  </Block>
                )}
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      )}
    </ToolBox>
  );
};

Tools.propTypes = {
  onToolChange: PropTypes.func.isRequired,
  activeMode: PropTypes.string.isRequired,
  currentColor: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  onFillColorChange: PropTypes.func.isRequired,
  fillColor: PropTypes.string.isRequired,
  deleteMode: PropTypes.bool.isRequired
};

export default Tools;

const ToolBox = styled(FlexContainer)`
  width: 50px;
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: ${mainBlueColor};
  z-index: 10000;
  border-radius: 4px;
  padding: 10px 0;
`;

const Block = styled.div`
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: ${white};
  white-space: nowrap;
`;

const BackButton = styled(FlexContainer)`
  font-weight: 600;
  font-size: 12px;
  height: 40px;
  width: 40px;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  color: ${white};
`;

const Separator = styled.span`
  display: block;
  width: 70%;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 0;
  opacity: 0.4;
  border-bottom: 1px solid ${secondaryTextColor};
`;

const StyledButton = styled(Button)`
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: none !important;
  background: ${props => (props.enable ? darkBlueSecondary : "transparent")};
  height: 40px;
  width: 40px;
  border: none !important;
  &:focus,
  &:hover {
    background: ${props => (props.enable ? darkBlueSecondary : "transparent")};
  }
`;
