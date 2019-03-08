import React from "react";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { CHECK, SHOW, CLEAR } from "../../../../constants/constantsForQuestions";

import DragHandle from "../DragHandle";
import { Container } from "./styled/Container";
import { StyledDragHandle } from "./styled/StyledDragHandle";
import { Text } from "./styled/Text";
import { FlexCenter } from "./styled/FlexCenter";
import { WithIndex } from "./styled/WithIndex";
import { TextEmpty } from "./styled/TextEmpty";
import { IconCheck } from "./styled/IconCheck";
import { IconClose } from "./styled/IconClose";
import { MathFormulaDisplay } from "@edulastic/common";

function collectSource(connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const specSource = {
  beginDrag(props) {
    const item = { item: props.obj, index: props.index };
    props.onClick({});
    return item;
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    const itemCurrent = monitor.getItem();

    const itemTo = monitor.getDropResult();

    props.onDrop(itemCurrent, itemTo, props.flag);
  }
};

const DragItem = ({
  connectDragSource,
  obj,
  isDragging,
  onClick,
  active,
  smallSize,
  correct,
  previewTab,
  index,
  theme
}) => {
  const showPreview = previewTab === CHECK || previewTab === SHOW;

  return obj ? (
    connectDragSource(
      <div
        onClick={() => (active ? onClick("") : onClick(obj))}
        style={{
          opacity: isDragging ? 0 : 1,
          background: active ? theme.widgets.sortList.dragItemActiveBgColor : theme.widgets.sortList.dragItemBgColor,
          borderRadius: 4
        }}
      >
        <Container smallSize={smallSize}>
          {!showPreview && (
            <StyledDragHandle smallSize={smallSize}>
              <DragHandle smallSize={smallSize} />
            </StyledDragHandle>
          )}

          <Text checkStyle={!active && showPreview} correct={correct} smallSize={smallSize}>
            <FlexCenter>
              {showPreview ? <WithIndex>{index + 1}</WithIndex> : ""}
              <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: obj }} />
            </FlexCenter>
            {showPreview && (
              <div>
                {correct && <IconCheck />}
                {!correct && <IconClose />}
              </div>
            )}
          </Text>
        </Container>
      </div>
    )
  ) : (
    <div>
      <TextEmpty smallSize={smallSize} />
    </div>
  );
};

DragItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  obj: PropTypes.any,
  isDragging: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  smallSize: PropTypes.bool.isRequired,
  correct: PropTypes.bool,
  previewTab: PropTypes.string,
  index: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
};

DragItem.defaultProps = {
  obj: null,
  correct: false,
  previewTab: CLEAR
};

const enhance = compose(
  DragSource("item", specSource, collectSource),
  withTheme
);

export default enhance(DragItem);
