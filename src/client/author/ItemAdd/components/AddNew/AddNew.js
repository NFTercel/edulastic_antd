import React from "react";
import PropTypes from "prop-types";
import { IconPlus } from "@edulastic/icons";
import { greenDark, green } from "@edulastic/colors";
import { withNamespaces } from "@edulastic/localization";
import { PlusWrapper, Text } from "./styled";

const AddNew = ({ moveNew, t, style }) => (
  <PlusWrapper onClick={moveNew} style={style}>
    <IconPlus color={greenDark} width={60} height={60} style={{ marginBottom: 35 }} hoverColor={green} />
    &nbsp;
    <Text>{t("component.itemdetail.addnew.addnew")}</Text>
  </PlusWrapper>
);

AddNew.propTypes = {
  moveNew: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  style: PropTypes.object
};

AddNew.defaultProps = {
  style: {}
};

export default withNamespaces("author")(AddNew);
