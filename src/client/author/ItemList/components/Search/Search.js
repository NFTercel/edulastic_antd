import React, { Component } from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import { questionType as questionTypes } from "@edulastic/constants";
import { Container, Item, ItemBody, ItemHeader, MainFilterItems } from "./styled";
import selectsData from "../../../TestPage/components/common/selectsData";

class Search extends Component {
  render() {
    const {
      search: { grades, subject, curriculumId, standardIds, questionType, depthOfKnowledge, authorDifficulty },
      curriculums,
      onSearchFieldChange,
      curriculumStandards,
      onStandardSearch
    } = this.props;
    const isStandardsDisabled = !curriculumId;
    const standardsPlaceholder = isStandardsDisabled
      ? "Available with Curriculum"
      : 'Type to Search, for example "k.cc"';

    return (
      <MainFilterItems>
        <Container>
          <Item>
            <ItemHeader>Grades</ItemHeader>
            <Select
              mode="multiple"
              size="large"
              placeholder="All Grades"
              value={grades}
              onChange={onSearchFieldChange("grades")}
            >
              {selectsData.allGrades.map(el => (
                <Select.Option key={el.value} value={el.value}>
                  {el.text}
                </Select.Option>
              ))}
            </Select>
          </Item>
          <Item>
            <ItemHeader>Subject</ItemHeader>
            <ItemBody>
              <Select onSelect={onSearchFieldChange("subject")} value={subject} size="large">
                {selectsData.allSubjects.map(el => (
                  <Select.Option key={el.value} value={el.value}>
                    {el.text}
                  </Select.Option>
                ))}
              </Select>
            </ItemBody>
          </Item>
          <Item>
            <ItemHeader>Curriculum</ItemHeader>
            <ItemBody>
              <Select size="large" onSelect={onSearchFieldChange("curriculumId")} value={curriculumId}>
                <Select.Option key="" value="">
                  All Curriculums
                </Select.Option>
                {curriculums.map(el => (
                  <Select.Option key={el._id} value={el._id}>
                    {el.curriculum}
                  </Select.Option>
                ))}
              </Select>
            </ItemBody>
          </Item>
          <Item>
            <ItemHeader>Standards</ItemHeader>
            <Select
              mode="multiple"
              size="large"
              onSearch={onStandardSearch}
              filterOption={false}
              placeholder={standardsPlaceholder}
              onChange={onSearchFieldChange("standardIds")}
              value={standardIds}
              disabled={isStandardsDisabled}
            >
              {curriculumStandards.map(el => (
                <Select.Option key={el.identifier} value={el.identifier}>
                  {`${el.identifier}: ${el.description}`}
                </Select.Option>
              ))}
            </Select>
          </Item>
          <Item>
            <ItemHeader>Question Type</ItemHeader>
            <ItemBody>
              <Select size="large" onSelect={onSearchFieldChange("questionType")} value={questionType}>
                {questionTypes.selectsData.map(el => (
                  <Select.Option key={el.value} value={el.value}>
                    {el.text}
                  </Select.Option>
                ))}
              </Select>
            </ItemBody>
          </Item>
          <Item>
            <ItemHeader>Depth of Knowledge</ItemHeader>
            <ItemBody>
              <Select size="large" onSelect={onSearchFieldChange("depthOfKnowledge")} value={depthOfKnowledge}>
                {selectsData.allDepthOfKnowledge.map(el => (
                  <Select.Option key={el.value} value={el.value}>
                    {el.text}
                  </Select.Option>
                ))}
              </Select>
            </ItemBody>
          </Item>
          <Item>
            <ItemHeader>Difficulty</ItemHeader>
            <ItemBody>
              <Select size="large" onSelect={onSearchFieldChange("authorDifficulty")} value={authorDifficulty}>
                {selectsData.allAuthorDifficulty.map(el => (
                  <Select.Option key={el.value} value={el.value}>
                    {el.text}
                  </Select.Option>
                ))}
              </Select>
            </ItemBody>
          </Item>
          <Item>
            <ItemHeader>Author</ItemHeader>
            <ItemBody>
              <Select size="large" defaultValue="All Authors">
                <Select.Option value="">All Authors</Select.Option>
                <Select.Option value="author1">Author 1</Select.Option>
                <Select.Option value="author2">Author 2</Select.Option>
              </Select>
            </ItemBody>
          </Item>
          <Item>
            <ItemHeader>Owner</ItemHeader>
            <Select mode="multiple" size="large" placeholder="All Owners" defaultValue={[]}>
              <Select.Option value="owner1">Owner 1</Select.Option>
              <Select.Option value="owner2">Owner 2</Select.Option>
              <Select.Option value="owner3">Owner 3</Select.Option>
            </Select>
          </Item>
        </Container>
      </MainFilterItems>
    );
  }
}

Search.propTypes = {
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
  curriculumStandards: PropTypes.array.isRequired,
  onStandardSearch: PropTypes.func.isRequired
};

export default Search;
