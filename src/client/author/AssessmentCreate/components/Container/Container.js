import React from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { debounce } from "lodash";
import qs from "query-string";

import HeaderWrapper from "../../../src/mainContent/headerWrapper";
import Breadcrumb from "../../../src/components/Breadcrumb";
import Title from "../common/Title";
import CreationOptions from "../CreationOptions/CreationOptions";
import DropArea from "../DropArea/DropArea";
import { receiveTestByIdAction, getTestsLoadingSelector } from "../../../TestPage/ducks";
import { createAssessmentRequestAction, getAssessmentCreatingSelector } from "../../ducks";

const breadcrumbStyle = {
  marginLeft: "46px",
  marginTop: "19px",
  position: "static"
};

const breadcrumbs = [
  {
    title: "Assignments",
    to: "/author/assignments"
  },
  {
    title: "New Assessment",
    to: ""
  }
];

const creationMethods = {
  SCRATCH: "scratch",
  LIBRARY: "library",
  PDF: "pdf"
};

class Container extends React.Component {
  static propTypes = {
    createAssessment: PropTypes.func.isRequired,
    receiveTestById: PropTypes.func.isRequired,
    creating: PropTypes.bool.isRequired,
    location: PropTypes.func.isRequired,
    assessmentLoading: PropTypes.bool.isRequired
  };

  state = {
    method: undefined
  };

  componentDidMount() {
    const { location, receiveTestById } = this.props;
    const { assessmentId } = qs.parse(location.search);

    if (assessmentId) {
      receiveTestById(assessmentId);
      this.handleSetMethod(creationMethods.PDF)();
    }
  }

  handleSetMethod = method => () => {
    this.setState({ method });
  };

  handleUploadPDF = debounce(({ file: { originFileObj } }) => {
    const { location, createAssessment } = this.props;
    const { assessmentId } = qs.parse(location.search);

    createAssessment({ file: originFileObj, assessmentId });
  }, 1000);

  handleCreateBlankAssessment = event => {
    event.stopPropagation();

    const { location, createAssessment } = this.props;
    const { assessmentId } = qs.parse(location.search);

    createAssessment({ assessmentId });
  };

  render() {
    const { method } = this.state;
    const { creating, assessmentLoading } = this.props;

    if (assessmentLoading) {
      return <Spin />;
    }

    return (
      <>
        <HeaderWrapper>
          <Title>New Assessment</Title>
        </HeaderWrapper>
        <Breadcrumb data={breadcrumbs} style={breadcrumbStyle} />
        {creating && <Spin />}
        {!method && <CreationOptions onUploadPDF={this.handleSetMethod(creationMethods.PDF)} />}
        {method === creationMethods.PDF && (
          <DropArea onUpload={this.handleUploadPDF} onCreateBlank={this.handleCreateBlankAssessment} />
        )}
      </>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    state => ({
      creating: getAssessmentCreatingSelector(state),
      assessmentLoading: getTestsLoadingSelector(state)
    }),
    {
      createAssessment: createAssessmentRequestAction,
      receiveTestById: receiveTestByIdAction
    }
  )
);

export default enhance(Container);
