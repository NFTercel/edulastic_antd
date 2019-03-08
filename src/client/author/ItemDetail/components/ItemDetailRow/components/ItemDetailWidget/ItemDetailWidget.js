import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "antd";
import { IconMoveArrows, IconPencilEdit, IconTrash } from "@edulastic/icons";
import { white } from "@edulastic/colors";
import { DragSource } from "react-dnd";
import { withNamespaces } from "@edulastic/localization";

import QuestionWrapper from "../../../../../../assessment/components/QuestionWrapper";
import { Types } from "../../../../constants";
import { setItemDetailDraggingAction } from "../../../../ducks";
import { getQuestionByIdSelector } from "../../../../../sharedDucks/questions";
import { Container, Buttons } from "./styled";

const ItemDetailWidget = ({
  widget,
  onEdit,
  onDelete,
  isDragging,
  connectDragSource,
  connectDragPreview,
  t,
  question
}) =>
  connectDragPreview &&
  connectDragSource &&
  connectDragPreview(
    <div>
      <Container isDragging={isDragging}>
        <div>
          {widget.widgetType === "question" && (
            <QuestionWrapper
              testItem
              type={widget.type}
              view="preview"
              questionId={widget.reference}
              data={{ ...question, smallSize: true }}
            />
          )}
        </div>

        <Buttons>
          {connectDragSource(
            <div>
              <Button title={t("move")} move shape="circle">
                <IconMoveArrows color={white} style={{ fontSize: 11 }} width={16} height={16} />
              </Button>
            </div>
          )}
          <Button title={t("edit")} onClick={onEdit} shape="circle">
            <IconPencilEdit color={white} width={16} height={16} />
          </Button>
          <Button title={t("delete")} onClick={onDelete} shape="circle">
            <IconTrash color={white} width={16} height={16} />
          </Button>
        </Buttons>
      </Container>
    </div>
  );

ItemDetailWidget.propTypes = {
  widget: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  widgetIndex: PropTypes.number.isRequired
};

const itemSource = {
  beginDrag({ setItemDetailDragging, widgetIndex, rowIndex }) {
    setTimeout(() => {
      setItemDetailDragging(true);
    }, 0);
    return {
      rowIndex,
      widgetIndex
    };
  },
  endDrag({ setItemDetailDragging }) {
    setItemDetailDragging(false);
    return {};
  }
};

function collect(c, monitor) {
  return {
    connectDragSource: c.dragSource(),
    connectDragPreview: c.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const enhance = compose(
  withNamespaces("default"),
  connect(
    (state, { widget }) => ({ question: getQuestionByIdSelector(state, widget.reference) }),
    { setItemDetailDragging: setItemDetailDraggingAction }
  ),
  DragSource(Types.WIDGET, itemSource, collect)
);

export default enhance(ItemDetailWidget);
