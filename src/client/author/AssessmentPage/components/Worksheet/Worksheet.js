import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid/v4";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { getTestEntitySelector, setTestDataAction } from "../../../TestPage/ducks";
import Thumbnails from "../Thumbnails/Thumbnails";
import PDFPreview from "../PDFPreview/PDFPreview";
import Questions from "../Questions/Questions";
import { WorksheetWrapper } from "./styled";

const defaultPreview = { preview: "" };

class Worksheet extends React.Component {
  static propTypes = {
    assessment: PropTypes.object.isRequired,
    setTestData: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    review: PropTypes.bool
  };

  static defaultProps = {
    review: false
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

  handleAddAnnotation = question => {
    const { assessment, setTestData } = this.props;
    const annotation = {
      uuid: uuid(),
      type: "point",
      class: "Annotation",
      toolbarMode: "question",
      ...question
    };

    const newAnnotations = [...assessment.annotations];

    const annotationIndex = newAnnotations.findIndex(item => item.questionId === question.questionId);

    if (annotationIndex > -1) {
      newAnnotations.splice(annotationIndex, 1);
    }

    newAnnotations.push(annotation);

    const updatedAssessment = {
      annotations: newAnnotations
    };

    setTestData(updatedAssessment);
  };

  handleReupload = () => {
    const {
      match: {
        params: { assessmentId }
      },
      history
    } = this.props;
    history.push(`/author/assessments/create?assessmentId=${assessmentId}`);
  };

  render() {
    const { currentPage, totalPages } = this.state;
    const {
      assessment: { docUrl, annotations },
      review
    } = this.props;

    const thumbnails = new Array(totalPages).fill(defaultPreview);

    return (
      <WorksheetWrapper>
        <Thumbnails
          list={thumbnails}
          url={docUrl}
          onReupload={this.handleReupload}
          onPageChange={this.handleChangePage}
          review={review}
        />
        <PDFPreview
          url={docUrl}
          page={currentPage}
          annotations={annotations}
          onDocumentLoad={this.handleDocumentLoad}
          onDropAnnotation={this.handleAddAnnotation}
        />
        <Questions />
      </WorksheetWrapper>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    state => ({
      assessment: getTestEntitySelector(state)
    }),
    {
      setTestData: setTestDataAction
    }
  )
);

export default enhance(Worksheet);
