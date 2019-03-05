import React, { useRef } from "react";
import { cloneDeep, get } from "lodash";
import PropTypes from "prop-types";
import { helpers } from "@edulastic/common";

import Draggable from "./components/Draggable";

const DropArea = ({ updateData, item }) => {
  const dropAreaRef = useRef();

  const _dragStop = index => (e, d) => {
    const newItem = cloneDeep(item);
    newItem.responses[index].top = d.y;
    newItem.responses[index].left = d.x;
    updateData(newItem.responses);
  };

  const _resize = index => (e, direction, ref) => {
    const newItem = cloneDeep(item);
    newItem.responses[index].width = ref.style.width;
    newItem.responses[index].height = ref.style.height;
    updateData(newItem.responses);
  };

  const _delete = index => e => {
    e.stopPropagation();
    const newItem = cloneDeep(item);
    newItem.responses.splice(index, 1);
    updateData(newItem.responses);
  };

  const _click = index => () => {
    const newItem = cloneDeep(item);

    newItem.responses = newItem.responses.map((res, i) => {
      res.active = false;

      if (i === index) {
        res.active = true;
      }

      return res;
    });

    updateData(newItem.responses);
  };

  const _addNew = e => {
    const isContainer = e.target === dropAreaRef.current;

    if (!isContainer) {
      return;
    }

    const newItem = cloneDeep(item);
    const newResponseContainer = {};
    const elemRect = dropAreaRef.current.getBoundingClientRect();
    const width = get(item, "ui_style.width", 150);
    const height = get(item, "ui_style.height", 40);

    newResponseContainer.top = e.clientY - elemRect.top;
    newResponseContainer.left = e.clientX - elemRect.left;
    newResponseContainer.width = width;
    newResponseContainer.height = height;
    newResponseContainer.active = true;
    newItem.responses = newItem.responses.map(res => {
      res.active = false;
      return res;
    });
    newItem.responses.push(newResponseContainer);
    updateData(newItem.responses);
  };

  const getIndex = index => {
    const stemNumeration = get(item, "ui_style.stemnumeration");
    return helpers.getNumeration(index, stemNumeration);
  };

  return (
    <div
      ref={dropAreaRef}
      style={{
        height: "100%",
        position: "absolute",
        cursor: "crosshair",
        top: 0,
        left: 0,
        width: item.imageWidth || 600
      }}
      onClick={_addNew}
    >
      {item.responses.map((response, i) => (
        <Draggable
          response={response}
          key={i}
          index={getIndex(i)}
          background={item.background}
          showDashedBorder={get(item, "responseLayout.showdashedborder", false)}
          onDragStop={_dragStop(i)}
          onResize={_resize(i)}
          onDelete={_delete(i)}
          onClick={_click(i)}
        />
      ))}
    </div>
  );
};

DropArea.propTypes = {
  updateData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default DropArea;
