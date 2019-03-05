import React from "react";
import { DragSource } from "react-dnd";

import { Index } from "../styled/Index";
import { IconClose } from "../styled/IconClose";
import { IconCheck } from "../styled/IconCheck";

function collectSource(connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const specSource = {
  beginDrag(props) {
    return { item: props.item };
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    const itemCurrent = monitor.getItem();

    const itemTo = monitor.getDropResult();

    props.onDrop(itemCurrent, itemTo);
  }
};

const DragItem = ({ connectDragSource, item, isDragging, flag, correct, preview, renderIndex, getStyles }) =>
  item &&
  connectDragSource(
    <div style={getStyles({ isDragging, flag, preview, correct })}>
      {preview && <Index correct={correct}>{renderIndex + 1}</Index>}
      <div dangerouslySetInnerHTML={{ __html: item }} />
      {preview && (
        <div style={{ marginRight: 15 }}>
          {correct && <IconCheck />}
          {!correct && <IconClose />}
        </div>
      )}
    </div>
  );

export default DragSource("item", specSource, collectSource)(DragItem);
