import React from "react";
import { SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(() => <i className="fa fa-align-justify" />);

export default DragHandle;
