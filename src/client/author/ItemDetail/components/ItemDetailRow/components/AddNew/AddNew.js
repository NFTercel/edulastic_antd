import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { withNamespaces } from "@edulastic/localization";
import { Container } from "./styled";

const AddNew = ({ onClick, t }) => (
  <Container>
    <Button icon="plus" type="primary" onClick={onClick}>
      <span>{t("component.itemDetail.addNew")}</span>
    </Button>
  </Container>
);

AddNew.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("author")(AddNew);
