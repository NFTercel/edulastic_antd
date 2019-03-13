import React, { PureComponent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { withRouter } from "react-router-dom";
import { cloneDeep } from "lodash";
import uuidv4 from "uuid/v4";
import { withWindowSizes } from "@edulastic/common";
import { Content } from "./styled";

import TestPageHeader from "../TestPageHeader/TestPageHeader";
import {
  createTestAction,
  receiveTestByIdAction,
  setTestDataAction,
  updateTestAction,
  setDefaultTestDataAction,
  getTestSelector,
  getTestItemsRowsSelector,
  getTestsCreatingSelector,
  getTestsLoadingSelector
} from "../../ducks";
import { getSelectedItemSelector } from "../AddItems/ducks";
import { getUserSelector } from "../../../src/selectors/user";
import SourceModal from "../../../QuestionEditor/components/SourceModal/SourceModal";
import ShareModal from "../../../src/components/common/ShareModal";

import AddItems from "../AddItems";
import Review from "../Review";
import Summary from "../Summary";
import Assign from "../Assign";
import Setting from "../Setting";

class Container extends PureComponent {
  propTypes = {
    createTest: PropTypes.func.isRequired,
    updateTest: PropTypes.func.isRequired,
    receiveTestById: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    setDefaultData: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    rows: PropTypes.array.isRequired,
    creating: PropTypes.bool.isRequired,
    windowWidth: PropTypes.number.isRequired,
    selectedRows: PropTypes.object,
    test: PropTypes.object,
    user: PropTypes.object,
    isTestLoading: PropTypes.bool.isRequired
  };

  static defaultProps = {
    test: null,
    selectedRows: {},
    user: {}
  };

  state = {
    current: "addItems",
    showModal: false,
    showShareModal: false
  };

  componentDidMount() {
    const { match, receiveTestById, setDefaultData } = this.props;
    if (match.params.id) {
      receiveTestById(match.params.id);
    } else {
      setDefaultData();
    }
  }

  handleNavChange = value => () => {
    if (value === "source") {
      this.setState({
        showModal: true
      });
      return;
    }
    this.setState({
      current: value
    });
  };

  handleAddItems = testItems => {
    const { test, setData } = this.props;
    const newTest = cloneDeep(test);

    newTest.testItems = testItems;
    newTest.scoring.testItems = testItems.map(item => {
      const foundItem = newTest.scoring.testItems.find(({ id }) => item && item._id === id);
      if (!foundItem) {
        return {
          id: item ? item._id : uuidv4(),
          points: 0
        };
      }
      return foundItem;
    });
    setData(newTest);
  };

  handleChangeGrade = grades => {
    const { setData, test } = this.props;
    setData({ ...test, grades });
  };

  handleChangeSubject = subjects => {
    const { setData, test } = this.props;
    setData({ ...test, subjects });
  };

  renderContent = () => {
    const { test, setData, rows, isTestLoading } = this.props;
    if (isTestLoading) {
      return <Spin />;
    }
    const { current } = this.state;
    const selectedItems = test.testItems.map(({ _id = uuidv4() }) => _id);
    switch (current) {
      case "addItems":
        return <AddItems onAddItems={this.handleAddItems} selectedItems={selectedItems} current={current} />;
      case "summary":
        return (
          <Summary onShowSource={this.handleNavChange("source")} setData={setData} test={test} current={current} />
        );
      case "review":
        return (
          <Review
            test={test}
            rows={rows}
            onChangeGrade={this.handleChangeGrade}
            onChangeSubjects={this.handleChangeSubject}
            current={current}
          />
        );
      case "settings":
        return <Setting current={current} onShowSource={this.handleNavChange("source")} />;
      case "assign":
        return <Assign test={test} setData={setData} current={current} />;
      default:
        return null;
    }
  };

  handleSave = async () => {
    const { selectedRows, user, test, updateTest, createTest } = this.props;
    const testItems = selectedRows.data;
    const newTest = cloneDeep(test);

    newTest.createdBy = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    newTest.testItems = testItems || [];
    newTest.scoring.testItems = testItems.map(item => {
      const foundItem = newTest.scoring.testItems.find(({ id }) => item && item._id === id);
      if (!foundItem) {
        return {
          id: item ? item._id : uuidv4(),
          points: 0
        };
      }
      return foundItem;
    });
    if (test._id) {
      updateTest(test._id, newTest);
    } else {
      createTest(newTest);
    }
  };

  onShareModalChange = () => {
    this.setState({
      showShareModal: !this.state.showShareModal
    });
  };

  handleApplySource = source => {
    const { setData } = this.props;
    try {
      const data = JSON.parse(source);
      setData(data);
      this.setState({
        showModal: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  setShowModal = value => () => {
    this.setState({
      showModal: value
    });
  };

  renderModal = () => {
    const { test } = this.props;
    const { showModal } = this.state;

    if (showModal) {
      return (
        <SourceModal onClose={this.setShowModal(false)} onApply={this.handleApplySource}>
          {JSON.stringify(test, null, 4)}
        </SourceModal>
      );
    }
  };

  render() {
    const { creating, windowWidth, test } = this.props;
    const { showShareModal, current } = this.state;
    return (
      <>
        {this.renderModal()}
        <ShareModal isVisible={showShareModal} onClose={this.onShareModalChange} />
        <TestPageHeader
          onChangeNav={this.handleNavChange}
          current={current}
          onSave={this.handleSave}
          onShare={this.onShareModalChange}
          title={test.title}
          creating={creating}
          windowWidth={windowWidth}
        />
        <Content>{this.renderContent()}</Content>
      </>
    );
  }
}

const enhance = compose(
  withRouter,
  withWindowSizes,
  connect(
    state => ({
      test: getTestSelector(state),
      rows: getTestItemsRowsSelector(state),
      creating: getTestsCreatingSelector(state),
      selectedRows: getSelectedItemSelector(state),
      user: getUserSelector(state),
      isTestLoading: getTestsLoadingSelector(state)
    }),
    {
      createTest: createTestAction,
      updateTest: updateTestAction,
      receiveTestById: receiveTestByIdAction,
      setData: setTestDataAction,
      setDefaultData: setDefaultTestDataAction
    }
  )
);

export default enhance(Container);
