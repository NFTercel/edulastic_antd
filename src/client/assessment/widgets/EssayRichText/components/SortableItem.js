import React from "react";
import { SortableElement, SortableHandle } from "react-sortable-hoc";
import { FaBars } from "react-icons/fa";
import { withTheme } from "styled-components";

import { FlexContainer } from "@edulastic/common";

import { QlBlocks } from "../styled/QlBlocks";
import { FlexCon } from "../styled/FlexCon";

const DragHandle = withTheme(
  SortableHandle(({ theme }) => (
    <QlBlocks>
      <FlexContainer
        style={{
          fontSize: theme.widgets.essayRichText.dragHandleFontSize,
          color: theme.widgets.essayRichText.dragHandleColor
        }}
        justifyContent="center"
      >
        <FaBars />
      </FlexContainer>
    </QlBlocks>
  ))
);

const SortableItem = SortableElement(({ item, i, handleActiveChange, validList, theme }) => {
  const { value, param, active } = item;

  return (
    <FlexCon childMarginRight={0} flexDirection="column">
      {value !== "|" ? (
        <QlBlocks
          active={active}
          onClick={e => {
            e.preventDefault();
            handleActiveChange(i);
          }}
          {...(validList.includes(value) ? { value: param } : {})}
          className={`ql-${value}`}
          type="button"
        />
      ) : (
        <QlBlocks
          active={active}
          onClick={e => {
            e.preventDefault();
            handleActiveChange(i);
          }}
          {...(validList.includes(value) ? { value: param } : {})}
          className={`ql-${value}`}
          type="button"
        >
          <div>
            <b
              style={{
                fontSize: theme.widgets.essayRichText.sortableItemFontSize
              }}
            >
              {value}
            </b>
            DIV
          </div>
        </QlBlocks>
      )}

      <DragHandle />
    </FlexCon>
  );
});

export default withTheme(SortableItem);
