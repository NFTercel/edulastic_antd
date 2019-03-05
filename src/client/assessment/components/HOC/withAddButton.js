import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { EduButton } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

const withAddButton = WrappedComponent => {
  const withAddButtonHocComponent = ({ buttonText, onAdd, t, ...props }) => (
    <Fragment>
      <WrappedComponent {...props} />
      <EduButton onClick={onAdd} type="primary">
        {buttonText || t("component.options.addNewChoice")}
      </EduButton>
    </Fragment>
  );

  withAddButtonHocComponent.propTypes = {
    buttonText: PropTypes.string,
    onAdd: PropTypes.func,
    t: PropTypes.func.isRequired
  };

  withAddButtonHocComponent.defaultProps = {
    buttonText: "",
    onAdd: () => {}
  };

  return withNamespaces("assessment")(withAddButtonHocComponent);
};

export default withAddButton;
