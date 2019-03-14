import React from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin } from "antd";

import { white } from "@edulastic/colors";
import { IconSelected, IconAddItems, IconReview, IconSettings } from "@edulastic/icons";

import {
  receiveTestByIdAction,
  getTestEntitySelector,
  getTestsLoadingSelector,
  setTestDataAction,
  updateTestAction
} from "../../../TestPage/ducks";
import { getQuestionsArraySelector } from "../../../sharedDucks/questions";
import { getItemDetailByIdAction, updateItemDetailByIdAction } from "../../../src/actions/itemDetail";
import { changeViewAction } from "../../../src/actions/view";
import { getItemDetailSelector } from "../../../src/selectors/itemDetail";
import { getViewSelector } from "../../../src/selectors/view";
import Header from "../Header/Header";
import Worksheet from "../Worksheet/Worksheet";

const tabs = {
  DESCRIPTION: "description",
  WORKSHEET: "edit",
  REVIEW: "review",
  SETTINGS: "settings"
};

const buttons = [
  {
    icon: <IconSelected color={white} width={16} height={16} />,
    value: tabs.DESCRIPTION,
    text: "Description"
  },
  {
    icon: <IconAddItems color={white} width={16} height={16} />,
    value: tabs.WORKSHEET,
    text: "Worksheet"
  },
  {
    icon: <IconReview color={white} width={16} height={16} />,
    value: tabs.REVIEW,
    text: "Review"
  },
  {
    icon: <IconSettings color={white} width={16} height={16} />,
    value: tabs.SETTINGS,
    text: "Settings"
  }
];

class Container extends React.Component {
  static propTypes = {
    receiveTestById: PropTypes.func.isRequired,
    receiveItemDetailById: PropTypes.func.isRequired,
    assessment: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    updateItemDetailById: PropTypes.func.isRequired,
    currentTestItem: PropTypes.object.isRequired,
    updateTest: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired,
    currentTab: PropTypes.string.isRequired
  };

  componentDidMount() {
    const { match, receiveTestById } = this.props;

    receiveTestById(match.params.assessmentId);
  }

  componentWillReceiveProps(next) {
    const { receiveItemDetailById, assessment } = this.props;

    if (!assessment._id && next.assessment._id) {
      const [testItem] = next.assessment.testItems;
      receiveItemDetailById(testItem._id);
    }
  }

  handleChangeCurrentTab = tab => () => {
    const { changeView } = this.props;
    changeView(tab);
  };

  handleSave = (status = "draft") => () => {
    const { questions, assessment, currentTestItem, updateItemDetailById, updateTest } = this.props;
    const [testItem] = assessment.testItems;

    const updatedTestItem = {
      ...currentTestItem,
      data: {
        ...currentTestItem.data,
        questions
      }
    };

    const newAssessment = {
      ...assessment,
      status
    };

    updateTest(assessment._id, newAssessment, true);
    updateItemDetailById(testItem._id, updatedTestItem, true);
  };

  renderContent() {
    const { currentTab } = this.props;

    switch (currentTab) {
      case tabs.WORKSHEET:
        return <Worksheet key="worksheet" />;
      case tabs.REVIEW:
        return <Worksheet key="review" review />;
      default:
        return null;
    }
  }

  render() {
    const {
      loading,
      assessment: { title, status },
      currentTab
    } = this.props;

    if (loading) {
      return <Spin />;
    }

    return (
      <>
        <Header
          onTabChange={this.handleChangeCurrentTab}
          currentTab={currentTab}
          tabs={buttons}
          title={title}
          status={status}
          onSave={this.handleSave}
        />
        {this.renderContent()}
      </>
    );
  }
}

const enhance = compose(
  withRouter,
  connect(
    state => ({
      assessment: getTestEntitySelector(state),
      loading: getTestsLoadingSelector(state),
      questions: getQuestionsArraySelector(state),
      currentTestItem: getItemDetailSelector(state),
      currentTab: getViewSelector(state)
    }),
    {
      receiveTestById: receiveTestByIdAction,
      receiveItemDetailById: getItemDetailByIdAction,
      updateItemDetailById: updateItemDetailByIdAction,
      setTestData: setTestDataAction,
      updateTest: updateTestAction,
      changeView: changeViewAction
    }
  )
);

export default enhance(Container);
