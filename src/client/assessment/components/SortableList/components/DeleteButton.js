import React from "react";
import PropTypes from "prop-types";

import { IconTrashWrapper } from "../styled/IconTrashWrapper";
import { IconTrash } from "../styled/IconTrash";

const DeleteButton = ({ cIndex, onDelete }) => (
  <IconTrashWrapper data-cy={`delete${cIndex}`} onClick={onDelete}>
    <IconTrash />
  </IconTrashWrapper>
);

DeleteButton.propTypes = {
  cIndex: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default React.memo(DeleteButton);
