import React from "react";
import PropTypes from "prop-types";

import Thumbnails from "../Thumbnails/Thumbnails";
import PDFPreview from "../PDFPreview/PDFPreview";
import Questions from "../Questions/Questions";
import { WorksheetWrapper } from "./styled";

const defaultPreview = { preview: "" };

class Worksheet extends React.Component {
  static propTypes = {
    documentUrl: PropTypes.string,
    annotations: PropTypes.array,
    onAddAnnotation: PropTypes.func.isRequired,
    onReupload: PropTypes.func.isRequired
  };

  state = {
    currentPage: 1,
    totalPages: 1
  };

  handleChangePage = nextPage => {
    this.setState({ currentPage: nextPage });
  };

  handleDocumentLoad = ({ numPages }) => {
    this.setState({ totalPages: numPages });
  };

  render() {
    const { currentPage, totalPages } = this.state;
    const { documentUrl, annotations, onAddAnnotation, onReupload } = this.props;
    const thumbnails = new Array(totalPages).fill(defaultPreview);

    return (
      <WorksheetWrapper>
        <Thumbnails list={thumbnails} url={documentUrl} onReupload={onReupload} onPageChange={this.handleChangePage} />
        <PDFPreview
          url={documentUrl}
          page={currentPage}
          annotations={annotations}
          onDocumentLoad={this.handleDocumentLoad}
          onDropAnnotation={onAddAnnotation}
        />
        <Questions />
      </WorksheetWrapper>
    );
  }
}

export default Worksheet;
