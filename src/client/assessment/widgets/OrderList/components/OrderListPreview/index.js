import React, { Component } from "react";
import PropTypes from "prop-types";
import { SortableContainer } from "react-sortable-hoc";
import { compose } from "redux";

import OrderListPreviewItem from "./components/OrderListPreviewItem";

class OrderListPreview extends Component {
  render() {
    const { questions, smallSize } = this.props;

    return (
      <div>
        {questions &&
          !!questions.length &&
          questions.map((q, i) => (
            <OrderListPreviewItem showDragHandle smallSize={smallSize} key={i} index={i}>
              {q}
            </OrderListPreviewItem>
          ))}
      </div>
    );
  }
}

OrderListPreview.propTypes = {
  questions: PropTypes.array,
  smallSize: PropTypes.bool
};

OrderListPreview.defaultProps = {
  questions: [],
  smallSize: false
};

const enhance = compose(SortableContainer);

export default enhance(OrderListPreview);
