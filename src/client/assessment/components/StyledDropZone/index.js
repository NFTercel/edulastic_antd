import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { withNamespaces } from "@edulastic/localization";

import { Container } from "./styled/Container";
import { ZoneTitle } from "./styled/ZoneTitle";
import { Underlined } from "./styled/Underlined";
import { Loading } from "./styled/Loading";
import { IconUpload } from "./styled/IconUpload";

const StyledDropZone = ({ thumb, loading, isDragActive, t }) => (
  <Container isDragActive={isDragActive} childMarginRight={0} justifyContent="center" flexDirection="column">
    {loading ? (
      <Loading type="loading" />
    ) : (
      thumb || (
        <Fragment>
          <IconUpload isDragActive={isDragActive} />
          <ZoneTitle>{t("component.dropZone.dragDrop")}</ZoneTitle>
          <ZoneTitle altColor>{t("component.dropZone.yourOwnImage")}</ZoneTitle>
          <ZoneTitle isComment>
            {t("component.dropZone.or")} <Underlined>{t("component.dropZone.browse")}</Underlined>: PNG, JPG, GIF
            (1024KB MAX.)
          </ZoneTitle>
        </Fragment>
      )
    )}
  </Container>
);

StyledDropZone.propTypes = {
  thumb: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  isDragActive: PropTypes.any,
  t: PropTypes.func.isRequired
};

StyledDropZone.defaultProps = {
  thumb: null,
  isDragActive: false
};

export default withNamespaces("assessment")(StyledDropZone);
