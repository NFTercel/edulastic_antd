import React from "react";
import PropTypes from "prop-types";

import ThumbnailsItem from "../ThumbnailsItem/ThumbnailsItem";
import { ThumbnailsWrapper, ReuploadButtonWrapper, ReuploadButton, ThumbnailsList } from "./styled";

const Thumbnails = ({ list, onPageChange, url, onReupload }) => (
  <ThumbnailsWrapper>
    <ThumbnailsList>
      {list.map((item, key) => (
        <ThumbnailsItem key={key} page={key + 1} onClick={() => onPageChange(key + 1)} url={url} />
      ))}
    </ThumbnailsList>
    <ReuploadButtonWrapper>
      <ReuploadButton onClick={onReupload}>Reupload PDF</ReuploadButton>
    </ReuploadButtonWrapper>
  </ThumbnailsWrapper>
);

Thumbnails.propTypes = {
  list: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onReupload: PropTypes.func.isRequired,
  url: PropTypes.string
};

export default Thumbnails;
