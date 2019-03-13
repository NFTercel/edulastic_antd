import React, { Component } from "react";
import PropTypes from "prop-types";
import { SortableContainer } from "react-sortable-hoc";
import { compose } from "redux";

import OrderListPreviewItem from "./components/OrderListPreviewItem";

class OrderListPreview extends Component {
  render() {
    const { questions, smallSize, listStyle, columns } = this.props;

    return (
      <div data-cy="order-preview-container" style={listStyle}>
        {questions &&
          !!questions.length &&
          questions.map((q, i) => (
            <OrderListPreviewItem columns={columns} showDragHandle smallSize={smallSize} key={i} index={i}>
              {q}
            </OrderListPreviewItem>
          ))}
      </div>
    );
  }
}

OrderListPreview.propTypes = {
  listStyle: PropTypes.object.isRequired,
  questions: PropTypes.array,
  smallSize: PropTypes.bool,
  columns: PropTypes.number
};

OrderListPreview.defaultProps = {
  questions: [],
  smallSize: false,
  columns: 1
};

const enhance = compose(SortableContainer);

export default enhance(OrderListPreview);
