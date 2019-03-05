import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

const specTarget = {
  drop: (props, monitor) => {
    if (monitor.didDrop()) {
      return;
    }

    return props.drop(props);
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

const DropContainer = ({ connectDropTarget, style, children, className }) =>
  connectDropTarget(
    <div
      style={{
        ...style
      }}
      className={className}
    >
      {children}
    </div>
  );

DropContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  style: PropTypes.object,
  children: PropTypes.node,
  drop: PropTypes.func.isRequired
};

DropContainer.defaultProps = {
  style: {},
  children: undefined
};

export default DropTarget("metal", specTarget, collectTarget)(DropContainer);
