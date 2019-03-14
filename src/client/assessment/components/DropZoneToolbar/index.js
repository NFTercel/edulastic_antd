import React from "react";
import PropTypes from "prop-types";

import { withNamespaces } from "@edulastic/localization";

import { Container } from "./styled/Container";
import LargeInput from "./components/LargeInput";

const DropZoneToolbar = ({ width, height, altText, handleChange, t }) => (
  <Container>
    <LargeInput
      data-cy="image-width-input"
      type="number"
      label={t("component.hotspot.widthLabel")}
      value={width}
      marginRight={15}
      onChange={handleChange("width")}
    />
    <LargeInput
      data-cy="image-height-input"
      type="number"
      label={t("component.hotspot.heightLabel")}
      value={height}
      marginRight={15}
      onChange={handleChange("height")}
    />
    <LargeInput
      data-cy="image-alternative-input"
      type="text"
      textAlign="left"
      marginRight={15}
      width={245}
      label={t("component.hotspot.altTextLabel")}
      value={altText}
      onChange={handleChange("altText")}
    />
  </Container>
);

DropZoneToolbar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  altText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(DropZoneToolbar);
