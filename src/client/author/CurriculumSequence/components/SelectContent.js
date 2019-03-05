import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import styled from "styled-components";
import { Dropdown, Menu, Icon, Input } from "antd";
import { mainBlueColor, largeDesktopWidth, desktopWidth } from "@edulastic/colors";
import { FlexContainer, Paper } from "@edulastic/common";
import { searchContentAction, setContentCurriculumAction, toggleCheckedUnitItemAction } from "../ducks";
import SelectContentRow from "./SelectContentRow";
import CloseButtonMobileIcon from "../assets/close-button.svg";

/** @typedef {object} ModuleData
 * @property {String} contentId
 * @property {String} createdDate
 * @property {Object} derivedFrom
 * @property {String} id
 * @property {Number} index
 * @property {String} name
 * @property {String} standards
 * @property {String} type
 */

/** @typedef {object} CreatedBy
 * @property {String} email
 * @property {String} firstName
 * @property {String} id
 * @property {String} lastName
 */

/**
 * @typedef {object} Module
 * @property {String} assigned
 * @property {String} customized
 * @property {ModuleData[]} data
 * @property {String} id
 * @property {String} name
 */

/**
 * @typedef {Object} CurriculumSequence
 * @property {CreatedBy} createdBy
 * @property {String} createdDate
 * @property {Object} derivedFrom
 * @property {String} description
 * @property {String} id
 * @property {Module[]} modules
 * @property {String} status
 * @property {String} thumbnail
 * @property {String} title
 * @property {String} updatedDate
 */

/**
 * @typedef {object} CurriculumSearchResult
 * @property {string} _id
 * @property {string} title
 */

/**
 * @typedef CurriculumProps
 * @property {CurriculumSequence} curriculum
 * @property {CurriculumSequence} destinationCurriculum
 * @property {function} addContentToCurriculumSequence
 * @property {function} onSelectContent
 * @property {number} windowWidth
 * @property {any} dropContent
 * @property {function} onBeginDrag
 * @property {function} searchContentCurriculums
 * @property {CurriculumSearchResult[]} contentCurriculums
 * @property {function} setContentCurriculum
 * @property {function} toggleCheckedUnitItem
 * @property {string[]} checkedUnitItems
 */

/** @extends Component<CurriculumProps> */
class SelectContent extends Component {
  handleSelectContent = () => {
    const { onSelectContent } = this.props;
    onSelectContent();
  };

  componentDidMount() {
    const { searchContentCurriculums } = this.props;
    searchContentCurriculums();
  }

  render() {
    const {
      curriculum,
      destinationCurriculum,
      dropContent,
      onBeginDrag,
      contentCurriculums,
      setContentCurriculum,
      toggleCheckedUnitItem
    } = this.props;
    const { title, modules } = curriculum;

    const menu = (
      <Menu>
        {contentCurriculums.map(curriculumItem => (
          <Menu.Item key={`menu-${curriculumItem._id}`} onClick={() => setContentCurriculum(curriculumItem._id)}>
            {curriculumItem.title}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <CurriculumWrapper>
        <CurriculumHeader>
          <DropdownCloseWrapper>
            <Dropdown overlay={menu} trigger={["click"]}>
              <CurriculumTitle>
                {title} <Icon type="down" />
              </CurriculumTitle>
            </Dropdown>
            <CloseButtonMobile onClick={this.handleSelectContent}>
              <img src={CloseButtonMobileIcon} alt="" />
            </CloseButtonMobile>
          </DropdownCloseWrapper>
          <Input.Search placeholder={`Content in ${title}`} />
        </CurriculumHeader>
        {modules.map(moduleItem => (
          <SelectContentRow
            key={moduleItem.id}
            module={moduleItem}
            destinationCurriculum={destinationCurriculum}
            dropContent={dropContent}
            onBeginDrag={onBeginDrag}
            onToggleCheck={toggleCheckedUnitItem}
          />
        ))}
      </CurriculumWrapper>
    );
  }
}

SelectContent.propTypes = {
  curriculum: PropTypes.shape({
    createdBy: PropTypes.object.isRequired,
    createdDate: PropTypes.string.isRequired,
    derivedFrom: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    modules: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedDate: PropTypes.string.isRequired
  }),
  toggleCheckedUnitItem: PropTypes.any.isRequired,
  onSelectContent: PropTypes.func.isRequired,
  destinationCurriculum: PropTypes.object.isRequired,
  dropContent: PropTypes.any.isRequired,
  onBeginDrag: PropTypes.any.isRequired,
  searchContentCurriculums: PropTypes.func.isRequired,
  contentCurriculums: PropTypes.any.isRequired,
  setContentCurriculum: PropTypes.func.isRequired
};

SelectContent.defaultProps = {
  curriculum: null
};

const DropdownCloseWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CurriculumHeader = styled(FlexContainer)`
  display: flex;
  align-items: center;
  z-index: 1;
  @media only screen and (max-width: ${desktopWidth}) {
    flex-direction: column;
  }
  .ant-input:not(.anticon) {
    @media only screen and (max-width: ${desktopWidth}) {
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .anticon {
    color: ${mainBlueColor};
  }

  .ant-input-affix-wrapper .ant-input-suffix :not(.anticon) {
    @media only screen and (max-width: ${desktopWidth}) {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }

  .ant-input-search {
    margin-left: auto;
    margin-right: 20px;
    display: flex;
  }
  .ant-dropdown-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
CurriculumHeader.displayName = "CurriculumHeader";

const CloseButtonMobile = styled.div`
  display: flex;
  transform: rotate(45deg);
  margin-right: 20px;
  @media only screen and (min-width: ${largeDesktopWidth}) {
    display: none;
  }
`;

const CurriculumTitle = styled.div`
  margin: 20px;
  font-size: 16px;
  font-weight: 700;
  @media only screen and (max-width: ${desktopWidth}) {
    margin-left: 30px;
  }
  .anticon {
    margin-left: 10px;
    color: ${mainBlueColor};
  }
`;

const CurriculumWrapper = styled(Paper)`
  .ant-btn {
    height: 24px;
  }
  & {
    width: 40%;
    padding: 0;
    margin-top: 11px;
    align-self: baseline;
    z-index: 1;
    & ${CloseButtonMobile} {
      visibility: hidden;
    }
    @media only screen and (max-width: ${desktopWidth}) {
      position: fixed;
      margin-top: 0px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      & ${CloseButtonMobile} {
        visibility: visible;
      }
    }
  }
`;

const mapDispatchToProps = dispatch => ({
  searchContentCurriculums() {
    dispatch(searchContentAction());
  },
  setContentCurriculum(id) {
    dispatch(setContentCurriculumAction(id));
  },
  toggleCheckedUnitItem(id) {
    dispatch(toggleCheckedUnitItemAction(id));
  }
});

const enhance = compose(
  connect(
    ({ curriculumSequence }) => ({
      contentCurriculums: curriculumSequence.contentCurriculums
    }),
    mapDispatchToProps
  )
);

export default enhance(SelectContent);
