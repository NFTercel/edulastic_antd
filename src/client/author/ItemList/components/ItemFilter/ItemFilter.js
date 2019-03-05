import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Affix, Col } from "antd";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Container,
  Title,
  Clear,
  FilterButton,
  FixedFilters,
  Header,
  HeaderRow,
  MainFilter,
  MainFilterHeader,
  SearchField,
  SearchIcon,
  StyledModal,
  StyledModalContainer,
  StyledModalTitle,
  TextFieldSearch,
  TextFieldStyled
} from "./styled";
import TestFiltersNav from "../../../src/components/common/TestFilters/TestFiltersNav";
import Search from "../Search/Search";
import { SMALL_DESKTOP_WIDTH, MAX_MOBILE_WIDTH } from "../../../src/constants/others";

const items = [
  { icon: "book", key: "library", text: "Entire Library" },
  { icon: "folder", key: "byMe", text: "Authored by me" },
  { icon: "copy", key: "coAuthor", text: "I am a Co-Author" },
  { icon: "reload", key: "previously", text: "Previously Used" },
  { icon: "heart", key: "favorites", text: "My Favorites" }
];

class ItemFilter extends Component {
  state = {
    isShowFilter: false
  };

  showFilterHandler = () => {
    this.setState({ isShowFilter: true });
  };

  closeSearchModal = () => {
    this.setState({ isShowFilter: false });
  };

  handleStandardSearch = searchStr => {
    const {
      getCurriculumStandards,
      search: { grades, curriculumId }
    } = this.props;
    if (curriculumId && searchStr.length >= 2) {
      getCurriculumStandards(curriculumId, grades, searchStr);
    }
  };

  renderFullTextSearch = () => {
    const { onSearch, windowWidth } = this.props;
    const { isShowFilter } = this.state;
    const placeholder = "Search by skills and keywords";

    const desktopSearch = (
      <Header>
        <HeaderRow>
          <Col lg={24} md={18} xs={18}>
            <TextFieldSearch
              onChange={e => onSearch(e.target.value)}
              type="search"
              icon={<SearchIcon type="search" />}
              containerStyle={{ marginRight: 20 }}
              placeholder={placeholder}
            />
          </Col>
          <Col span={6}>
            <FilterButton>
              <Button onClick={this.showFilterHandler}>{!isShowFilter ? "SHOW FILTERS" : "HIDE FILTERS"}</Button>
            </FilterButton>
          </Col>
        </HeaderRow>
      </Header>
    );

    const mobileSearch = (
      <Header style={{ padding: "0 25px" }}>
        <SearchField>
          <TextFieldStyled
            onChange={e => onSearch(e.target.value)}
            height="50px"
            type="search"
            icon={<SearchIcon type="search" />}
            containerStyle={{ marginRight: 20 }}
            placeholder={placeholder}
          />
        </SearchField>
        <FilterButton>
          <Button style={{ height: "50px", borderRadius: "4px" }} onClick={() => this.showFilterHandler()}>
            {!isShowFilter ? "SHOW FILTERS" : "HIDE FILTERS"}
          </Button>
        </FilterButton>
      </Header>
    );

    return windowWidth > MAX_MOBILE_WIDTH ? desktopSearch : mobileSearch;
  };

  render() {
    const { windowWidth, onClearSearch, search, curriculums, onSearchFieldChange, curriculumStandards } = this.props;
    const { isShowFilter } = this.state;

    return (
      <Container>
        <FixedFilters>
          <StyledModal open={isShowFilter} onClose={this.closeSearchModal} center>
            <StyledModalContainer>
              <StyledModalTitle>Filters</StyledModalTitle>
              <Search
                search={search}
                curriculums={curriculums}
                onSearchFieldChange={onSearchFieldChange}
                curriculumStandards={curriculumStandards}
                onStandardSearch={this.handleStandardSearch}
              />
            </StyledModalContainer>
          </StyledModal>
          {this.renderFullTextSearch()}
          <MainFilter isVisible={isShowFilter}>
            {windowWidth > SMALL_DESKTOP_WIDTH && (
              <Affix>
                <PerfectScrollbar style={{ paddingRight: 15 }}>
                  <MainFilterHeader>
                    <Title>Filters</Title>
                    <Clear onClick={onClearSearch}>Clear all</Clear>
                  </MainFilterHeader>
                  <TestFiltersNav items={items} />
                  <Search
                    search={search}
                    curriculums={curriculums}
                    onSearchFieldChange={onSearchFieldChange}
                    curriculumStandards={curriculumStandards}
                    onStandardSearch={this.handleStandardSearch}
                  />
                </PerfectScrollbar>
              </Affix>
            )}
          </MainFilter>
        </FixedFilters>
      </Container>
    );
  }
}

ItemFilter.propTypes = {
  search: PropTypes.object.isRequired,
  curriculums: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      curriculum: PropTypes.string.isRequired,
      grades: PropTypes.array.isRequired,
      subject: PropTypes.string.isRequired
    })
  ).isRequired,
  onSearchFieldChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  getCurriculumStandards: PropTypes.func.isRequired,
  curriculumStandards: PropTypes.array.isRequired
};

export default ItemFilter;
