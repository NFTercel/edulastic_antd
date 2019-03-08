import React from "react";
import PropTypes from "prop-types";
import { SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(({ index }) => <i id={`drag-handler-${index}`} className="fa fa-align-justify" />);

DragHandle.propTypes = {
  index: PropTypes.string
};

export default DragHandle;
