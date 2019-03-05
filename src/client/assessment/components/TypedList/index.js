import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import { isObject } from "lodash";

import { FlexContainer } from "@edulastic/common";

import CustomGroup from "./components/CustomGroup";
import withAddButton from "../HOC/withAddButton";

import TypedListItem from "./components/TypedListItem";

const TypedList = SortableContainer(
  ({ type, selectData, items = [], onRemove, onChange, prefix = "prefix", columns = 1 }) => (
    <FlexContainer style={{ flexWrap: "wrap" }} justifyContent="space-between">
      {items.map((value, index) => {
        if (isObject(value)) {
          return <CustomGroup onRemove={() => onRemove(index)} onChange={val => onChange(index, val)} value={value} />;
        }

        return (
          <TypedListItem
            key={index}
            type={type}
            selectData={selectData}
            index={index}
            indx={prefix + index}
            value={value}
            columns={columns}
            onRemove={() => onRemove(index)}
            onChange={val => (typeof onChange === "function" ? onChange(index, val) : () => {})}
          />
        );
      })}
    </FlexContainer>
  )
);

export default withAddButton(TypedList);
