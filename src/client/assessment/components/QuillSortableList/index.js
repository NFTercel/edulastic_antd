import React, { memo } from "react";
import { SortableContainer } from "react-sortable-hoc";
import { FlexContainer } from "@edulastic/common";

import QuillSortableItem from "./components/QuillSortableItem";

// todo: union with SortableList
const QuillSortableList = SortableContainer(
  ({ items, readOnly, firstFocus, onRemove, onChange, prefix = "prefix", columns = 1, label = "" }) => (
    <FlexContainer style={{ flexWrap: "wrap" }} justifyContent="space-between">
      {items.map((value, index) => (
        <QuillSortableItem
          key={index}
          index={index}
          label={label ? `${label} ${index + 1}` : ""}
          indx={prefix + index}
          value={value}
          firstFocus={firstFocus}
          rOnly={readOnly}
          columns={columns}
          onRemove={() => onRemove(index)}
          onChange={val => (typeof onChange === "function" ? onChange(index, val) : () => {})}
        />
      ))}
    </FlexContainer>
  )
);

export default memo(QuillSortableList);
