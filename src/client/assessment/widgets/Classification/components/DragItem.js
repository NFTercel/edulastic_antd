import React from "react";
import { DragSource } from "react-dnd";
import { withTheme } from "styled-components";

import { FlexContainer } from "@edulastic/common";

import { IconCheck } from "../styled/IconCheck";
import { IconClose } from "../styled/IconClose";
import { IndexBox } from "../styled/IndexBox";
import { getStyles } from "../utils";

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

const DragItem = ({ connectDragSource, item, isDragging, valid, preview, renderIndex, theme }) =>
  item &&
  connectDragSource(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px 15px 10px 15px",
        opacity: isDragging ? 0 : 1
      }}
    >
      {preview && valid !== undefined && (
        <IndexBox preview={preview} valid={valid}>
          {renderIndex + 1}
        </IndexBox>
      )}
      <div
        style={getStyles(
          isDragging,
          valid && preview
            ? theme.widgets.classification.dragItemValidBgColor
            : preview && valid !== undefined
            ? theme.widgets.classification.dragItemNotValidBgColor
            : theme.widgets.classification.dragItemBgColor,
          valid && preview
            ? theme.widgets.classification.dragItemValidBorderColor
            : preview && valid !== undefined
            ? theme.widgets.classification.dragItemNotValidBorderColor
            : theme.widgets.classification.dragItemBorderColor,
          preview && valid !== undefined
            ? {
                paddingRight: 15,
                paddingLeft: 15,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }
            : { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }
        )}
      >
        <FlexContainer
          alignItems="center"
          justifyContent="space-between"
          style={{
            width: "100%",
            fontWeight: theme.widgets.classification.dragItemFontWeight
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: item }} />
          {preview && valid !== undefined && (
            <div>
              {valid && <IconCheck />}
              {!valid && <IconClose />}
            </div>
          )}
        </FlexContainer>
      </div>
    </div>
  );

export default withTheme(DragSource("item", specSource, collectSource)(DragItem));
