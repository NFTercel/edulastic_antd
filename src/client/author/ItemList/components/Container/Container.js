import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Pagination, Spin } from "antd";
import { Paper, withWindowSizes } from "@edulastic/common";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { Container, Element, ListItems } from "./styled";
import Item from "../Item/Item";
import ItemFilter from "../ItemFilter/ItemFilter";
import ListHeader from "../../../src/components/common/ListHeader";
import { createTestItemAction } from "../../../src/actions/testItem";
import {
  getDictCurriculumsAction,
  getDictStandardsForCurriculumAction,
  clearDictStandardsAction
} from "../../../src/actions/dictionaries";
import {
  getTestItemsSelector,
  getTestsItemsCountSelector,
  getTestsItemsLimitSelector,
  getTestsItemsPageSelector,
  getTestItemsLoadingSelector,
  receiveTestItemsAction
} from "../../../TestPage/components/AddItems/ducks";
import { getItemsTypesSelector } from "../../../TestPage/components/Review/ducks";
import { getTestItemCreatingSelector } from "../../../src/selectors/testItem";
import { getCurriculumsListSelector, getStandardsListSelector } from "../../../src/selectors/dictionaries";

export const getClearSearchState = () => ({
  subject: "",
  curriculumId: "",
  standardIds: [],
  questionType: "",
  depthOfKnowledge: "",
  authorDifficulty: "",
  grades: []
});

// container the main entry point to the component
class Contaier extends Component {
  state = {
    search: getClearSearchState()
  };

  componentDidMount() {
    const { receiveItems, curriculums, getCurriculums } = this.props;
    receiveItems();
    if (curriculums.length === 0) {
      getCurriculums();
    }
  }

  handleSearch = () => {
    const { search } = this.state;
    const { limit, receiveItems } = this.props;
    receiveItems(search, 1, limit);
  };

  handleClearSearch = () => {
    this.setState(
      {
        search: getClearSearchState()
      },
      this.handleSearch
    );
  };

  handleSearchFieldChangeCurriculumId = value => {
    const { search } = this.state;
    const { clearDictStandards } = this.props;
    clearDictStandards();
    this.setState(
      {
        search: {
          ...search,
          curriculumId: value,
          standardIds: []
        }
      },
      this.handleSearch
    );
  };

  handleSearchFieldChange = fieldName => value => {
    const { search } = this.state;
    if (fieldName === "curriculumId") {
      this.handleSearchFieldChangeCurriculumId(value);
    } else {
      this.setState(
        {
          search: {
            ...search,
            [fieldName]: value
          }
        },
        this.handleSearch
      );
    }
  };

  handleCreate = async () => {
    const { createItem } = this.props;
    createItem({
      rows: [
        {
          tabs: [],
          dimension: "100%",
          widgets: []
        }
      ]
    });
  };

  handlePaginationChange = page => {
    const { search } = this.state;
    const { receiveItems, limit } = this.props;
    receiveItems(search, page, limit);
  };

  renderPagination = () => {
    const { windowWidth, count, page } = this.props;
    return (
      <Pagination
        simple={windowWidth <= 768 && true}
        showTotal={(total, range) => `${range[0]} to ${range[1]} of ${total}`}
        onChange={this.handlePaginationChange}
        defaultPageSize={10}
        total={count}
        current={page}
      />
    );
  };

  renderItems = () => {
    const { loading, items, itemTypes, history, windowWidth } = this.props;

    if (loading) {
      return <Spin size="large" />;
    }
    return items.map(item => (
      <Item key={item._id} item={item} types={itemTypes[item._id]} history={history} windowWidth={windowWidth} />
    ));
  };

  render() {
    const { windowWidth, creating, t, curriculums, getCurriculumStandards, curriculumStandards } = this.props;
    const { search } = this.state;

    return (
      <div>
        <ListHeader
          onCreate={this.handleCreate}
          creating={creating}
          windowWidth={windowWidth}
          title={t("component.itemlist.header.itemlist")}
        />
        <Container>
          <ItemFilter
            onSearchFieldChange={this.handleSearchFieldChange}
            onSearch={this.handleSearch}
            onClearSearch={this.handleClearSearch}
            windowWidth={windowWidth}
            search={search}
            curriculums={curriculums}
            getCurriculumStandards={getCurriculumStandards}
            curriculumStandards={curriculumStandards}
          />
          <ListItems>
            {windowWidth > 468 && this.renderPagination()}
            <Element>
              <Paper padding={windowWidth > 768 ? "25px 39px" : "0px"}>{this.renderItems()}</Paper>
            </Element>
            {this.renderPagination()}
          </ListItems>
        </Container>
      </div>
    );
  }
}

Contaier.propTypes = {
  items: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  receiveItems: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  createItem: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  creating: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  itemTypes: PropTypes.object.isRequired,
  curriculums: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      curriculum: PropTypes.string.isRequired,
      grades: PropTypes.array.isRequired,
      subject: PropTypes.string.isRequired
    })
  ).isRequired,
  getCurriculums: PropTypes.func.isRequired,
  getCurriculumStandards: PropTypes.func.isRequired,
  curriculumStandards: PropTypes.array.isRequired,
  clearDictStandards: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const enhance = compose(
  withWindowSizes,
  withNamespaces("author"),
  connect(
    state => ({
      items: getTestItemsSelector(state),
      limit: getTestsItemsLimitSelector(state),
      page: getTestsItemsPageSelector(state),
      count: getTestsItemsCountSelector(state),
      loading: getTestItemsLoadingSelector(state),
      creating: getTestItemCreatingSelector(state),
      itemTypes: getItemsTypesSelector(state),
      curriculums: getCurriculumsListSelector(state),
      curriculumStandards: getStandardsListSelector(state)
    }),
    {
      receiveItems: receiveTestItemsAction,
      createItem: createTestItemAction,
      getCurriculums: getDictCurriculumsAction,
      getCurriculumStandards: getDictStandardsForCurriculumAction,
      clearDictStandards: clearDictStandardsAction
    }
  )
);

export default enhance(Contaier);
