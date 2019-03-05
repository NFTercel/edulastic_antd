import React from "react";
import PropTypes from "prop-types";
import { Button, FooterWrapper } from "./styled";

const Footer = ({ onCancel, onOk, disabled }) => (
  <FooterWrapper justifyContent="space-around">
    <Button key="back" size="large" onClick={onCancel}>
      Cancel
    </Button>
    <Button key="submit" size="large" type="primary" onClick={onOk} data-cy="apply" disabled={disabled}>
      Apply
    </Button>
  </FooterWrapper>
);

Footer.PropTypes = {
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired
};

export default Footer;
