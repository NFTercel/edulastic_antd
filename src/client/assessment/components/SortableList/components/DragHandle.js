import React from "react";
import { SortableHandle } from "react-sortable-hoc";

const DragHandle = React.memo(SortableHandle(() => <i className="fa fa-align-justify" />));

export default DragHandle;
