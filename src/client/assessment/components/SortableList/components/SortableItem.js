import React, { memo } from "react";
import { SortableElement } from "react-sortable-hoc";
import { IconTrash } from "@edulastic/icons";
import { red, greenDark } from "@edulastic/colors";

import { SortableItemContainer } from "../styled/SortableItemContainer";
import DragHandle from "./DragHandle";
import FocusInput from "./FocusInput";

const SortableItem = SortableElement(({ cyIndex, value, dirty, onRemove, onChange }) => (
  <SortableItemContainer data-cy={`choice${cyIndex}`}>
    <div className="main">
      <DragHandle />
      <div>
        <FocusInput
          style={{ background: "transparent" }}
          data-cy={`edit${cyIndex}`}
          type="text"
          dirty={dirty}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
    <IconTrash
      style={{ cursor: "pointer" }}
      cIndex={cyIndex}
      onClick={onRemove}
      color={greenDark}
      hoverColor={red}
      width={20}
      height={20}
    />
  </SortableItemContainer>
));
export default memo(SortableItem);
