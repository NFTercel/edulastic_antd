import React, { Component } from "react";
import PropTypes from "prop-types";
import { SortableContainer } from "react-sortable-hoc";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";

import { Button, withWindowSizes } from "@edulastic/common";
import OrderListResponseItem from "../OrderListResponseItem/OrderListResponseItem";

class OrderListResponse extends Component {
  render() {
    const { questions, onQuestionsChange, onDeleteQuestion, onAddQuestion, t, style, windowWidth } = this.props;
    return (
      <div style={style}>
        {questions.map((q, i) => (
          <OrderListResponseItem
            key={i}
            index={i}
            onQuestionsChange={value => onQuestionsChange(value, i)}
            onDeleteQuestion={() => onDeleteQuestion(i)}
          >
            {q.text}
          </OrderListResponseItem>
        ))}
        <Button
          style={{ minWidth: windowWidth <= 480 ? "100%" : 130 }}
          onClick={onAddQuestion}
          variant="extendedFab"
          outlined
          type="button"
          color="primary"
        >
          {t("component.graphing.addnewpossibleresponsebtn")}
        </Button>
      </div>
    );
  }
}

OrderListResponse.propTypes = {
  questions: PropTypes.array.isRequired,
  onQuestionsChange: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired,
  onAddQuestion: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  style: PropTypes.object,
  windowWidth: PropTypes.number.isRequired
};

OrderListResponse.defaultProps = {
  style: {}
};

const enhance = compose(
  withWindowSizes,
  withNamespaces("assessment"),
  SortableContainer
);

export default enhance(OrderListResponse);
