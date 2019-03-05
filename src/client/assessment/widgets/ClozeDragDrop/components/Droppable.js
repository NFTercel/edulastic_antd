import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

const specTarget = {
  drop: (props, monitor) => {
    if (monitor.didDrop()) {
      return;
    }

    return props.drop();
  }
};

function collectTarget(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  };
}

const Droppable = ({ connectDropTarget, children }) =>
  connectDropTarget(
    <div
      style={{
        top: -5,
        display: "inline-flex"
      }}
    >
      {children}
    </div>
  );

Droppable.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  children: PropTypes.node
};

Droppable.defaultProps = {
  children: undefined
};

export default DropTarget("item", specTarget, collectTarget)(Droppable);
