import React from "react";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";

function collectSource(connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const specSource = {
  beginDrag(props) {
    const item = { item: props.obj, index: props.index };
    return item;
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    const itemCurrent = monitor.getItem();

    const itemTo = monitor.getDropResult();
    const data = props.data || "";
    let [, fromContainerIndex, fromRespIndex] = data.split("_");

    fromContainerIndex = parseInt(fromContainerIndex, 10);
    fromRespIndex = parseInt(fromRespIndex, 10);

    props.onDrop(
      {
        fromContainerIndex: Number.isNaN(fromContainerIndex) ? undefined : fromContainerIndex,
        fromRespIndex: Number.isNaN(fromRespIndex) ? undefined : fromRespIndex,
        item: props.item,
        index: itemCurrent.index
      },
      itemTo.index
    );
  }
};

const DragItem = ({ connectDragSource, data, children, style }) =>
  data &&
  connectDragSource(
    <div
      style={{
        ...style
      }}
    >
      {children}
    </div>
  );

DragItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  data: PropTypes.any,
  isDragging: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  active: PropTypes.bool.isRequired,
  smallSize: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired
};

DragItem.defaultProps = {
  data: null
};

export default DragSource("metal", specSource, collectSource)(DragItem);
