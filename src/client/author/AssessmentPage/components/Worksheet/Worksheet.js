import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid/v4";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isEmpty } from "lodash";

import { setTestDataAction } from "../../../TestPage/ducks";
import Thumbnails from "../Thumbnails/Thumbnails";
import PDFPreview from "../PDFPreview/PDFPreview";
import Questions from "../Questions/Questions";
import { WorksheetWrapper } from "./styled";

const defaultPreview = 1;

class Worksheet extends React.Component {
  static propTypes = {
    docUrl: PropTypes.string.isRequired,
    annotations: PropTypes.array,
    setTestData: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    review: PropTypes.bool,
    noCheck: PropTypes.bool,
    questions: PropTypes.array.isRequired,
    questionsById: PropTypes.object.isRequired,
    answersById: PropTypes.object.isRequired
  };

  static defaultProps = {
    review: false,
    annotations: [],
    noCheck: false
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
    const { annotations, setTestData } = this.props;
    const annotation = {
      uuid: uuid(),
      type: "point",
      class: "Annotation",
      toolbarMode: "question",
      ...question
    };

    const newAnnotations = [...annotations];

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
    const { docUrl, annotations, review, noCheck, questions, questionsById, answersById } = this.props;

    const thumbnails = new Array(totalPages).fill(defaultPreview);
    const shouldRenderDocument = review ? !isEmpty(docUrl) : true;

    return (
      <WorksheetWrapper>
        {(review ? totalPages > 1 : true) && (
          <Thumbnails
            list={thumbnails}
            url={docUrl}
            onReupload={this.handleReupload}
            onPageChange={this.handleChangePage}
            review={review}
          />
        )}
        {shouldRenderDocument && (
          <PDFPreview
            url={docUrl}
            page={currentPage}
            annotations={annotations}
            onDocumentLoad={this.handleDocumentLoad}
            onDropAnnotation={this.handleAddAnnotation}
          />
        )}
        <Questions
          noCheck={noCheck}
          list={questions}
          questionsById={questionsById}
          answersById={answersById}
          centered={!shouldRenderDocument}
        />
      </WorksheetWrapper>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    null,
    {
      setTestData: setTestDataAction
    }
  )
);

export default enhance(Worksheet);
