import React, { memo } from "react";
import { SortableElement } from "react-sortable-hoc";
import PropTypes from "prop-types";

import { CustomQuillComponent, FlexContainer } from "@edulastic/common";

import { SortableItemContainer } from "../styled/SortableItemContainer";
import { Label } from "../styled/Label";
import { IconTrash } from "../styled/IconTrash";
import DragHandle from "./DragHandle";

const QuillSortableItem = SortableElement(({ value, onRemove, rOnly, onChange, firstFocus, columns, indx, label }) => (
  <SortableItemContainer columns={columns}>
    {label && <Label>{label}</Label>}
    <FlexContainer style={{ flex: 1 }}>
      <div className="main">
        <DragHandle index={indx} />
        <CustomQuillComponent
          readOnly={rOnly}
          firstFocus={firstFocus}
          toolbarId={`id${indx}`}
          onChange={onChange}
          showResponseBtn={false}
          value={value}
          style={{ minHeight: "auto", padding: 10 }}
        />
      </div>
      {onRemove && <IconTrash data-cy={`delete${indx}`} onClick={onRemove} />}
    </FlexContainer>
  </SortableItemContainer>
));

QuillSortableItem.propTypes = {
  columns: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  rOnly: PropTypes.bool,
  firstFocus: PropTypes.bool
};

QuillSortableItem.defaultProps = {
  rOnly: false,
  firstFocus: false
};

export default memo(QuillSortableItem);
