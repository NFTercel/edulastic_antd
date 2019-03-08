import React from "react";
import PropTypes from "prop-types";
import { SortableElement } from "react-sortable-hoc";
import { MathFormulaDisplay } from "@edulastic/common";

import { Container } from "../styled/Container";
import { StyledDragHandle } from "../styled/StyledDragHandle";
import { Text } from "../styled/Text";
import DragHandle from "./DragHandle";

const OrderListPreviewItem = SortableElement(({ children, showDragHandle, smallSize }) => (
  <Container>
    {showDragHandle && (
      <StyledDragHandle smallSize={smallSize}>
        <DragHandle smallSize={smallSize} />
      </StyledDragHandle>
    )}
    <Text showDragHandle={showDragHandle} smallSize={smallSize}>
      <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: children }} />
    </Text>
  </Container>
));

OrderListPreviewItem.propTypes = {
  children: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  showDragHandle: PropTypes.bool,
  smallSize: PropTypes.bool
};

OrderListPreviewItem.defaultProps = {
  showDragHandle: true,
  smallSize: false
};

export default OrderListPreviewItem;
