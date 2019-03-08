import React from "react";
import PropTypes from "prop-types";
import { Document, Page } from "react-pdf";

import { ThumbnailsItemWrapper, PageNumber, PagePreview } from "./styled";

const ThumbnailsItem = ({ page, onClick, url }) => (
  <ThumbnailsItemWrapper onClick={onClick}>
    <PagePreview>
      {url && (
        <Document file={url} renderMode="canvas">
          <Page pageNumber={page} renderTextLayer={false} />
        </Document>
      )}
    </PagePreview>
    <PageNumber>{page}</PageNumber>
  </ThumbnailsItemWrapper>
);

ThumbnailsItem.propTypes = {
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  url: PropTypes.string
};

export default ThumbnailsItem;
