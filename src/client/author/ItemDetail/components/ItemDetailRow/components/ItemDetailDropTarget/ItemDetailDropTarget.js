import React from "react";
import { DropTarget } from "react-dnd";
import { FaArrowDown } from "react-icons/fa";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Types } from "../../../../constants";
import {
  moveItemDetailWidgetAction,
  setItemDetailDraggingAction
} from "../../../../ducks";
import { Container } from "./styled";

const ItemDetailDropTarget = ({ connectDropTarget, isOver, canDrop }) =>
  connectDropTarget(
    <div>
      <Container isOver={isOver} canDrop={canDrop}>
        <FaArrowDown />
      </Container>
    </div>
  );

ItemDetailDropTarget.propTypes = {
  moveItemDetailWidget: PropTypes.func.isRequired,
  widgetIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  setItemDetailDragging: PropTypes.func.isRequired,
  tabIndex: PropTypes.number
};

const itemSource = {
  drop({ moveItemDetailWidget, widgetIndex, rowIndex, tabIndex, setItemDetailDragging }, monitor) {
    const from = monitor.getItem();
    const to = {
      widgetIndex,
      rowIndex,
      tabIndex
    };

    moveItemDetailWidget({
      from,
      to
    });
    setItemDetailDragging(false);
    return { moved: true };
  }
};

function collect(c, monitor) {
  return {
    connectDropTarget: c.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const enhance = compose(
  connect(
    null,
    {
      moveItemDetailWidget: moveItemDetailWidgetAction,
      setItemDetailDragging: setItemDetailDraggingAction
    }
  ),
  DropTarget(Types.WIDGET, itemSource, collect)
);

export default enhance(ItemDetailDropTarget);
