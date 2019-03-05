import React, { memo } from "react";
import { SortableContainer } from "react-sortable-hoc";
import SortableItem from "./components/SortableItem";

const SortableList = SortableContainer(({ items, dirty, onRemove, onChange }) => (
  <div>
    {items.map((value, index) => (
      <SortableItem
        key={index}
        index={index}
        cyIndex={`_prefix_${index}`}
        value={value}
        dirty={dirty}
        onRemove={() => onRemove(index)}
        onChange={e => onChange(index, e)}
      />
    ))}
  </div>
));

export default memo(SortableList);
