import React, { Component } from "react";
import PropTypes from "prop-types";
import { Select, Button } from "antd";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { intersection as _intersection, flatten as _flatten, pick as _pick } from "lodash";
import { ThemeProvider } from "styled-components";

import { themes } from "../../themes";
import { Subtitle } from "../../styled/Subtitle";

import {
  getDictCurriculumsAction,
  getDictStandardsForCurriculumAction,
  clearDictStandardsAction
} from "../../../author/src/actions/dictionaries";
import {
  setQuestionAlignmentAddRowAction,
  setQuestionAlignmentRemoveRowAction,
  setQuestionDataAction,
  getQuestionDataSelector
} from "../../../author/QuestionEditor/ducks";
import selectsData from "../../../author/TestPage/components/common/selectsData";

import {
  addAlignmentAction,
  getQuestionAlignmentSelector,
  removeAlignmentAction
} from "../../../author/sharedDucks/questions";

import { getCurriculumsListSelector, getStandardsListSelector } from "../../../author/src/selectors/dictionaries";

import { RowContainer } from "./styled/RowContainer";
import { ItemBody } from "./styled/ItemBody";
import { CurruculumName } from "./styled/CurruculumName";
import { Buttons } from "./styled/Buttons";
import { ButtonSave } from "./styled/ButtonSave";
import { SecondBlockContainer } from "./styled/SecondBlockContainer";
import { Container } from "./styled/Container";
import { ShowAlignmentRowsContainer } from "./styled/ShowAlignmentRowsContainer";
import { AddButtonContainer } from "./styled/AddButtonContainer";
import { IconTrash } from "./styled/IconTrash";
import { IconPencilEdit } from "./styled/IconPencilEdit";
import { SelectSuffixIcon } from "./styled/SelectSuffixIcon";
import { groupByDomains } from "../../utils/helpers";

const handleFilter = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

// todo: move to author folder
class QuestionMetadata extends Component {
  static propTypes = {
    getCurriculums: PropTypes.func.isRequired,
    curriculums: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        curriculum: PropTypes.string.isRequired,
        grades: PropTypes.array.isRequired,
        subject: PropTypes.string.isRequired
      })
    ).isRequired,
    curriculumStandards: PropTypes.array.isRequired,
    alignment: PropTypes.arrayOf(
      PropTypes.shape({
        curriculumId: PropTypes.string.isRequired,
        curriculum: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        standards: PropTypes.arrayOf(
          PropTypes.shape({
            _id: PropTypes.string.isRequired,
            level: PropTypes.string.isRequired,
            identifier: PropTypes.string.isRequired,
            tloId: PropTypes.string,
            eloId: PropTypes.string,
            subEloId: PropTypes.string
          })
        )
      })
    ),
    questionData: PropTypes.shape({
      depthOfKnowledge: PropTypes.string,
      authorDifficulty: PropTypes.string
    }).isRequired,
    getCurriculumStandards: PropTypes.func.isRequired,
    addAlignment: PropTypes.func.isRequired,
    removeAlignment: PropTypes.func.isRequired,
    clearDictStandards: PropTypes.func.isRequired,
    setQuestionData: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  static defaultProps = {
    alignment: []
  };

  state = {
    isEditRow: false,
    grades: [],
    curriculum: undefined,
    curriculumId: undefined,
    subject: undefined,
    standards: []
  };

  handleEditRow = (index, rowData) => () => {
    const domains = rowData.domain;
    const standards = [];
    domains.forEach(domain => {
      if (domain.standards) {
        standards.push(...domain.standards);
      }
    });
    const grades = _intersection(standards.map(standard => standard.grades));
    this.setState({
      isEditRow: true,
      grades: _flatten(grades),
      curriculum: rowData.curriculum,
      curriculumId: rowData.curriculumId,
      subject: rowData.subject,
      standards
    });
    const { clearDictStandards, removeAlignment } = this.props;
    clearDictStandards();
    removeAlignment(rowData.curriculumId);
  };

  handleDeleteRow = curriculumId => () => {
    const { removeAlignment } = this.props;
    removeAlignment(curriculumId);
  };

  handleCurriculumSelect = (curriculumId, option) => {
    const { curriculum, subject } = option.props.obj;
    this.setState({
      curriculum,
      curriculumId,
      subject,
      standards: []
    });
  };

  handleGradeChange = grades => {
    this.setState({ grades });
  };

  handleStandardSearch = searchStr => {
    const { getCurriculumStandards } = this.props;
    const { grades, curriculumId } = this.state;
    if (curriculumId && searchStr.length >= 2) {
      getCurriculumStandards(curriculumId, grades, searchStr);
    }
  };

  handleStandardSelect = (chosenStandardsArr, option) => {
    const { standards } = this.state;
    const newStandard = _pick(option.props.obj, [
      "_id",
      "level",
      "grades",
      "identifier",
      "tloId",
      "tloDescription",
      "eloId",
      "subEloId",
      "description"
    ]);
    const newStandards = [...standards, newStandard];
    this.setState({ standards: newStandards });
  };

  handleStandardDeselect = removedElement => {
    const { standards } = this.state;
    const newStandards = standards.filter(el => el.identifier !== removedElement);
    this.setState({ standards: newStandards });
  };

  handleSaveRow = () => {
    const { addAlignment } = this.props;
    const { curriculum, curriculumId, standards, subject, grades } = this.state;
    const domains = groupByDomains(standards, grades);

    const alignment = {
      curriculum,
      curriculumId,
      subject,
      domains
    };

    addAlignment(alignment);
    this.setState({
      isEditRow: false,
      grades: [],
      curriculum: undefined,
      curriculumId: undefined,
      subject: undefined,
      standards: []
    });
  };

  handleAdd = () => {
    this.setState({ isEditRow: true });
  };

  handleQuestionDataSelect = fieldName => value => {
    const { questionData, setQuestionData } = this.props;
    const newQuestionData = {
      ...questionData,
      [fieldName]: value
    };
    setQuestionData(newQuestionData);
  };

  componentDidMount() {
    const { curriculums, getCurriculums } = this.props;
    if (curriculums.length === 0) {
      getCurriculums();
    }
  }

  renderShowAlignmentRow(row, index) {
    const { curriculum, domains } = row;
    const { t } = this.props;
    let standardsArr = [];
    domains.forEach(item => {
      standardsArr = [...standardsArr, ...item.standards];
    });

    return (
      <RowContainer key={index}>
        <ItemBody>
          <CurruculumName>{curriculum}</CurruculumName>
        </ItemBody>
        <ItemBody>
          <Select
            mode="multiple"
            style={{ width: 600 }}
            placeholder={t("component.options.selectStandards")}
            filterOption={false}
            value={standardsArr}
            disabled
          >
            {standardsArr.map(el => (
              <Select.Option key={el} value={el}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </ItemBody>
        <ItemBody>
          <Buttons>
            <Button htmlType="button" onClick={this.handleEditRow(index, row)} shape="circle">
              <IconPencilEdit />
            </Button>
            <Button htmlType="button" onClick={this.handleDeleteRow(row.curriculumId)} shape="circle">
              <IconTrash />
            </Button>
          </Buttons>
        </ItemBody>
      </RowContainer>
    );
  }

  renderEditAlignmentRow() {
    const { curriculums, curriculumStandards, alignment, t } = this.props;
    const { curriculumId, subject, standards, grades } = this.state;
    const standardsArr = standards.map(el => el.identifier);
    const alignmentCurriculumsArr = alignment.map(el => el.curriculumId);
    const availableCurriculums = curriculums.filter(el => !alignmentCurriculumsArr.includes(el._id));
    return (
      <RowContainer>
        <ItemBody>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={t("component.options.selectCurriculum")}
            optionFilterProp="children"
            onSelect={this.handleCurriculumSelect}
            filterOption={handleFilter}
            value={curriculumId}
            suffixIcon={<SelectSuffixIcon type="caret-down" />}
          >
            {availableCurriculums.map(el => (
              <Select.Option key={el._id} value={el._id} obj={el}>
                {el.curriculum}
              </Select.Option>
            ))}
          </Select>
        </ItemBody>
        <ItemBody>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder={t("component.options.selectSubject")}
            optionFilterProp="children"
            filterOption={handleFilter}
            value={subject}
            suffixIcon={<SelectSuffixIcon type="caret-down" />}
          >
            {curriculumId && (
              <Select.Option key={subject} value={subject}>
                {subject}
              </Select.Option>
            )}
          </Select>
        </ItemBody>
        <ItemBody>
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder={t("component.options.selectGrade")}
            onChange={this.handleGradeChange}
            value={grades}
          >
            {curriculumId &&
              selectsData.allGrades.map(el => (
                <Select.Option key={el.value} value={el.value}>
                  {el.text}
                </Select.Option>
              ))}
          </Select>
        </ItemBody>
        <ItemBody>
          <Select
            onSearch={this.handleStandardSearch}
            mode="multiple"
            style={{ width: 200 }}
            placeholder={t("component.options.selectStandards")}
            onSelect={this.handleStandardSelect}
            onDeselect={this.handleStandardDeselect}
            filterOption={false}
            value={standardsArr}
          >
            {curriculumStandards.map(el => (
              <Select.Option key={el.identifier} value={el.identifier} obj={el}>
                {`${el.identifier}: ${el.description}`}
              </Select.Option>
            ))}
          </Select>
        </ItemBody>
        <ButtonSave>
          <Button htmlType="button" type="primary" onClick={this.handleSaveRow}>
            <span>{t("component.options.save")}</span>
          </Button>
        </ButtonSave>
      </RowContainer>
    );
  }

  renderEditSecondBlock() {
    const {
      questionData: { depthOfKnowledge, authorDifficulty },
      t
    } = this.props;
    return (
      <SecondBlockContainer>
        <ItemBody>
          <div>
            <b>{t("component.options.depthOfKnowledge")}</b>
          </div>
          <Select
            style={{ width: 200 }}
            placeholder={t("component.options.selectDOK")}
            onSelect={this.handleQuestionDataSelect("depthOfKnowledge")}
            value={depthOfKnowledge}
            suffixIcon={<SelectSuffixIcon type="caret-down" />}
          >
            {selectsData.allDepthOfKnowledge.map(el => (
              <Select.Option key={el.value} value={el.value}>
                {el.text}
              </Select.Option>
            ))}
          </Select>
        </ItemBody>
        <ItemBody>
          <div>
            <b>{t("component.options.difficultyLevel")}</b>
          </div>
          <Select
            style={{ width: 200 }}
            placeholder={t("component.options.selectDifficulty")}
            onSelect={this.handleQuestionDataSelect("authorDifficulty")}
            value={authorDifficulty}
            suffixIcon={<SelectSuffixIcon type="caret-down" />}
          >
            {selectsData.allAuthorDifficulty.map(el => (
              <Select.Option key={el.value} value={el.value}>
                {el.text}
              </Select.Option>
            ))}
          </Select>
        </ItemBody>
      </SecondBlockContainer>
    );
  }

  render() {
    const { alignment, t } = this.props;
    const { isEditRow } = this.state;
    return (
      <ThemeProvider theme={themes.default}>
        <div>
          <Container>
            <Subtitle>{t("component.options.associatedStandards")}</Subtitle>
            <ShowAlignmentRowsContainer>
              {alignment.map((el, index) => this.renderShowAlignmentRow(el, index))}
            </ShowAlignmentRowsContainer>
            {isEditRow && this.renderEditAlignmentRow()}
            <AddButtonContainer>
              <Button htmlType="button" icon="plus" type="primary" onClick={this.handleAdd} disabled={isEditRow}>
                <span>{t("component.options.newcurriculum")}</span>
              </Button>
            </AddButtonContainer>
          </Container>
          <Container>{this.renderEditSecondBlock()}</Container>
        </div>
      </ThemeProvider>
    );
  }
}

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    state => ({
      curriculums: getCurriculumsListSelector(state),
      curriculumStandards: getStandardsListSelector(state),
      alignment: getQuestionAlignmentSelector(state),
      questionData: getQuestionDataSelector(state)
    }),
    {
      getCurriculums: getDictCurriculumsAction,
      getCurriculumStandards: getDictStandardsForCurriculumAction,
      setQuestionAlignmentAddRow: setQuestionAlignmentAddRowAction,
      setQuestionAlignmentRemoveRow: setQuestionAlignmentRemoveRowAction,
      setQuestionData: setQuestionDataAction,
      clearDictStandards: clearDictStandardsAction,
      addAlignment: addAlignmentAction,
      removeAlignment: removeAlignmentAction
    }
  )
);

export default enhance(QuestionMetadata);
