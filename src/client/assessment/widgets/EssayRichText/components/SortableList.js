import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import { QlFormats } from "../styled/QlFormats";
import SortableItem from "./SortableItem";

const SortableList = SortableContainer(({ items, handleActiveChange, validList }) => (
  <QlFormats>
    {items.map((value, index) => (
      <SortableItem
        item={value}
        i={index}
        index={index}
        validList={validList}
        handleActiveChange={handleActiveChange}
        key={value.id}
      />
    ))}
  </QlFormats>
));

export default SortableList;
