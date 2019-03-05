import React, { Fragment } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

import { FlexContainer } from "@edulastic/common";

import { Subtitle } from "../../../styled/Subtitle";
import withAddButton from "../../../components/HOC/withAddButton";
import QuillSortableList from "../../../components/QuillSortableList";

import { IconTrash } from "../styled/IconTrash";

const List = withAddButton(QuillSortableList);

const Group = ({
  item,
  index,
  onAddInner,
  onChange,
  onRemove,
  onSortEnd,
  onTitleChange,
  headText,
  groupHeadText,
  onRemoveInner,
  firstFocus,
  text,
  prefix,
  theme
}) => (
  <Fragment>
    <FlexContainer alignItems="baseline" justifyContent="space-between" style={{ width: "100%" }}>
      <Subtitle>{`${groupHeadText}${index + 1}`}</Subtitle>
      <IconTrash onClick={onRemove(index)} />
    </FlexContainer>
    <Subtitle
      fontSize={theme.widgets.classification.subtitleFontSize}
      color={theme.widgets.classification.subtitleColor}
      padding="0 0 16px 0"
    >
      {headText}
    </Subtitle>
    <Input size="large" value={item.title} onChange={e => onTitleChange(index, e.target.value)} />
    <Subtitle>{text}</Subtitle>
    <div style={{ marginBottom: 30 }}>
      <List
        prefix={prefix}
        items={item.responses}
        firstFocus={firstFocus}
        onAdd={onAddInner(index)}
        onSortEnd={onSortEnd(index)}
        onChange={onChange(index)}
        onRemove={onRemoveInner(index)}
        useDragHandle
        columns={1}
      />
    </div>
  </Fragment>
);

Group.propTypes = {
  item: PropTypes.object.isRequired,
  onAddInner: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  firstFocus: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  headText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  groupHeadText: PropTypes.string.isRequired,
  onRemoveInner: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTheme(Group);
