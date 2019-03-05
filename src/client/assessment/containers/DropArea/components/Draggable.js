import React from "react";
import PropTypes from "prop-types";
import { IconTrash } from "@edulastic/icons";
import { green, red, white } from "@edulastic/colors";
import { FlexContainer } from "@edulastic/common";

import { IndexBox, CustomRnd, Pointer } from "../styled";

const Draggable = ({ response, onDragStop, onResize, onDelete, onClick, index, background, showDashedBorder }) => (
  <CustomRnd
    background={background}
    showDashedBorder={showDashedBorder}
    bounds="parent"
    onClick={onClick}
    onDragStop={onDragStop}
    onResize={onResize}
    position={{ x: response.left, y: response.top }}
    size={{ width: response.width, height: response.height }}
  >
    <FlexContainer justifyContent="space-between" style={{ height: "100%" }}>
      <IndexBox isActive={response.active}>{index}</IndexBox>
      <IconTrash onClick={onDelete} color={green} hoverColor={red} width={16} height={16} />
    </FlexContainer>
    {response.pointerPosition && response.pointerPosition !== "none" && <Pointer position={response.pointerPosition} />}
  </CustomRnd>
);

Draggable.propTypes = {
  response: PropTypes.object.isRequired,
  onDragStop: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  background: PropTypes.string,
  showDashedBorder: PropTypes.bool
};

Draggable.defaultProps = {
  background: white,
  showDashedBorder: false
};

export default Draggable;
