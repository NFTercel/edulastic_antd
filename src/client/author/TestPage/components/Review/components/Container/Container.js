import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";
import { compose } from "redux";
import { Paper, withWindowSizes } from "@edulastic/common";
import PreviewModal from "../../../../../src/components/common/PreviewModal";
import HeaderBar from "../HeaderBar/HeaderBar";
import List from "../List/List";
import ItemsTable from "../ReviewItemsTable/ReviewItemsTable";
import { getItemsTypesSelector, getStandardsSelector } from "../../ducks";
import { setTestDataAction } from "../../../../ducks";
import { getSummarySelector } from "../../../Summary/ducks";
import { getQuestionsSelector } from "../../../../../sharedDucks/questions";
import { Calculator, Photo } from "../../../common";
import Breadcrumb from "../../../../../src/components/Breadcrumb";
import { SecondHeader } from "./styled";
// TODO rewrite into  class component and mobile view
class Review extends PureComponent {
  static propTypes = {
    test: PropTypes.object.isRequired,
    onChangeGrade: PropTypes.func.isRequired,
    onChangeSubjects: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired,
    types: PropTypes.any.isRequired,
    standards: PropTypes.object.isRequired,
    summary: PropTypes.array.isRequired,
    current: PropTypes.string.isRequired,
    windowWidth: PropTypes.number.isRequired
  };

  state = {
    isCollapse: false,
    isModalVisible: false,
    item: []
  };

  setSelected = values => {
    const { test, setData } = this.props;
    const newData = cloneDeep(test);

    newData.testItems = newData.testItems.map((item, i) => {
      if (values.includes(i)) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });

    setData(newData);
  };

  handleSelectAll = e => {
    const { rows } = this.props;
    const { checked } = e.target;

    if (checked) {
      this.setSelected(rows.map((row, i) => i));
    } else {
      this.setSelected([]);
    }
  };

  handleRemoveSelected = () => {
    const { test, setData } = this.props;
    const newData = cloneDeep(test);

    newData.testItems = test.testItems.filter(item => !item.selected);

    newData.scoring.testItems = test.scoring.testItems.filter(item => {
      const foundItem = test.testItems.find(({ id }) => id === item._id);
      return !(foundItem && foundItem.selected);
    });

    this.setSelected([]);
    setData(newData);
  };

  handleCollapse = () => {
    this.setState({
      isCollapse: !this.state.isCollapse
    });
  };

  moveTestItems = ({ oldIndex, newIndex }) => {
    const { test, setData } = this.props;
    const newData = cloneDeep(test);

    const [removed] = newData.testItems.splice(oldIndex, 1);
    newData.testItems.splice(newIndex, 0, removed);

    setData(newData);
  };

  handleMoveTo = newIndex => {
    const { test } = this.props;
    const oldIndex = test.testItems.findIndex(item => item.selected);
    this.moveTestItems({ oldIndex, newIndex });
  };

  handleChangePoints = (testItemId, value) => {
    const { test, setData } = this.props;
    const newData = cloneDeep(test);

    const itemIndex = newData.scoring.testItems.findIndex(({ id }) => testItemId === id);

    newData.scoring.testItems[itemIndex].points = value;
    newData.scoring.total = newData.scoring.testItems.reduce((acc, item) => acc + item.points, 0);

    setData(newData);
  };

  setModalVisibility = value => {
    this.setState({
      isModalVisible: value
    });
  };

  handlePreview = data => {
    this.setState({
      item: { id: data }
    });
    this.setModalVisibility(true);
  };

  closeModal = () => {
    this.setModalVisibility(false);
  };

  handleSelectedTest = items => {
    const { test } = this.props;
    const result = items.map(item => test.testItems.findIndex(i => item === i._id));
    this.setSelected(result);
  };

  get tableData() {
    const { summary } = this.props;
    return summary.map(data => ({
      key: data.standard,
      standard: data.standard,
      qs: data.questionsCount,
      points: data.score || 0
    }));
  }

  render() {
    const {
      test,
      current,
      windowWidth,
      rows,
      standards,
      types,
      onChangeGrade,
      onChangeSubjects,
      questions
    } = this.props;
    const { isCollapse, isModalVisible, item } = this.state;
    const totalPoints = test.scoring.total;
    const questionsCount = test.testItems.length;

    const selected = test.testItems.reduce((acc, element, i) => {
      if (element.selected) {
        acc.push(i);
      }
      return acc;
    }, []);

    const breadcrumbData = [
      {
        title: "TESTS LIST",
        to: "/author/tests"
      },
      {
        title: current,
        to: ""
      }
    ];

    const isSmallSize = windowWidth > 993 ? 1 : 0;
    const isMobileSize = windowWidth > 468 ? 1 : 0;

    return (
      <div style={{ paddingTop: 10 }}>
        <Row>
          <Col span={isSmallSize ? 19 : 24} style={{ padding: isMobileSize ? "0 45px" : "0 25px" }}>
            <SecondHeader isMobileSize={isMobileSize}>
              <Breadcrumb data={breadcrumbData} style={{ position: "unset" }} />
              <HeaderBar
                onSelectAll={this.handleSelectAll}
                selectedItems={selected}
                onRemoveSelected={this.handleRemoveSelected}
                onCollapse={this.handleCollapse}
                onMoveTo={this.handleMoveTo}
                windowWidth={windowWidth}
                setCollapse={isCollapse}
              />
            </SecondHeader>
            <Paper>
              {isCollapse ? (
                <ItemsTable
                  items={test.testItems}
                  setSelectedTests={this.handleSelectedTest}
                  selectedTests={selected.map(i => test.testItems[i]._id)}
                />
              ) : (
                <List
                  onChangePoints={this.handleChangePoints}
                  onPreview={this.handlePreview}
                  testItems={test.testItems}
                  rows={rows}
                  standards={standards}
                  selected={selected}
                  setSelected={this.setSelected}
                  onSortEnd={this.moveTestItems}
                  types={types}
                  scoring={test.scoring}
                  questions={questions}
                  useDragHandle
                />
              )}
            </Paper>
          </Col>
          <Col
            span={isSmallSize ? 5 : 24}
            style={{
              padding: isSmallSize ? "0px" : isMobileSize ? "10px 45px" : "10px 25px"
            }}
          >
            <Calculator
              totalPoints={totalPoints}
              questionsCount={questionsCount}
              grades={test.grades}
              subjects={test.subjects}
              onChangeGrade={onChangeGrade}
              onChangeSubjects={onChangeSubjects}
              tableData={this.tableData}
            >
              <Photo url={test.thumbnail} />
            </Calculator>
          </Col>
        </Row>
        <PreviewModal isVisible={isModalVisible} onClose={this.closeModal} data={item} />
      </div>
    );
  }
}

Review.propTypes = {
  test: PropTypes.object.isRequired,
  onChangeGrade: PropTypes.func.isRequired,
  onChangeSubjects: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  types: PropTypes.any.isRequired,
  standards: PropTypes.object.isRequired,
  summary: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired,
  questions: PropTypes.object.isRequired
};

const enhance = compose(
  withWindowSizes,
  connect(
    state => ({
      types: getItemsTypesSelector(state),
      standards: getStandardsSelector(state),
      summary: getSummarySelector(state),
      questions: getQuestionsSelector(state)
    }),
    { setData: setTestDataAction }
  )
);

export default enhance(Review);
