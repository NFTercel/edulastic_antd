import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { uniqueId } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";

import * as moment from "moment";
import { Button, Modal, Input, Cascader, Radio, Icon } from "antd";
import { FlexContainer } from "@edulastic/common";
import {
  white,
  greenSecondary,
  greenThird,
  titleColor,
  mobileWidth,
  middleMobileWidth,
  smallMobileWidth,
  tabletWidth,
  desktopWidth,
  largeDesktopWidth,
  extraDesktopWidth
} from "@edulastic/colors";
import {
  IconShare,
  IconDiskette,
  IconGraduationCap,
  IconBook,
  IconPlus,
  IconMoveTo,
  IconCollapse
} from "@edulastic/icons";
import Curriculum from "./Curriculum";
import SelectContent from "./SelectContent";
import {
  changeGuideAction,
  setGuideAction,
  setPublisherAction,
  saveGuideAlignmentAction,
  setSelectedItemsForAssignAction,
  setDataForAssignAction,
  createAssignmentAction,
  saveCurriculumSequenceAction,
  addNewUnitAction
} from "../ducks";
/* eslint-enable */
import EditModal from "../../TestPage/components/Assign/components/EditModal/EditModal";
import { fetchGroupsAction, getGroupsSelector, fetchMultipleGroupMembersAction } from "../../sharedDucks/groups";
import AddUnitModalBody from "./AddUnitModalBody";

/** @typedef {object} ModuleData
 * @property {String} contentId
 * @property {String} createdDate
 * @property {Object} derivedFrom
 * @property {String} id
 * @property {Number} index
 * @property {String} name
 * @property {String} standards
 * @property {String} type
 * @property {boolean} assigned
 * @property {String} testId
 */

/** @typedef {object} CreatedBy
 * @property {String} email
 * @property {String} firstName
 * @property {String} id
 * @property {String} lastName
 */

/**
 * @typedef {object} Module
 * @property {String} customized
 * @property {ModuleData[]} data
 * @property {String} id
 * @property {String} name
 * @property {boolean} assigned
 * @property {boolean=} completed
 */

/**
 * @typedef {object} CurriculumSequenceType
 * @property {CreatedBy} createdBy
 * @property {String} createdDate
 * @property {Object} derivedFrom
 * @property {String} description
 * @property {String} id
 * @property {String} _id
 * @property {Module[]} modules
 * @property {String} status
 * @property {String} thumbnail
 * @property {String} title
 * @property {String} type
 * @property {String} updatedDate
 */

/**
 * @typedef {object} CurriculumSearchResult
 * @property {string} _id
 * @property {string} title
 */

/**
 * @typedef {object} CurriculumSequenceProps
 * @property {function} onCollapseExpand
 * @property {string[]} expandedModules
 * @property {boolean} selectContent
 * @property {function} onSelectContent
 * @property {CurriculumSequenceType} destinationCurriculumSequence
 * @property {CurriculumSequenceType} sourceCurriculumSequence
 * @property {CurriculumSequenceType[]} curriculumList
 * @property {function} saveCurriculumSequence
 * @property {function} addNewUnitToDestination
 * @property {function} onDrop
 * @property {function} onBeginDrag
 * @property {function} onPublisherChange
 * @property {function} onPublisherSave
 * @property {CurriculumSearchResult[]} curriculumGuides
 * @property {string} publisher
 * @property {string} guide
 * @property {function} setPublisher
 * @property {function} setGuide
 * @property {function} saveGuideAlignment
 * @property {boolean} isContentExpanded
 * @property {function} setSelectedItemsForAssign
 * @property {any[]} selectedItemsForAssign
 * @property {function} createAssignment
 * @property {function} fetchGroups
 * @property {import('./ducks').AssignData} dataForAssign
 */

const EUREKA_PUBLISHER = "Eureka Math";
const TENMARKS_PUBLISHER = "TenMarks";
const GOMATH_PUBLISHER = "Go Math!";

/** @extends Component<CurriculumSequenceProps> */
class CurriculumSequence extends Component {
  state = {
    addUnit: false,
    addCustomContent: false,
    curriculumGuide: false,
    value: EUREKA_PUBLISHER,
    /** @type {Module | {}} */
    newUnit: {},
    selectedGuide: "",
    assignModal: false,
    assignModalData: {
      startDate: moment(),
      endDate: moment(),
      openPolicy: "Automatically on Start Date",
      closePolicy: "Automatically on Due Date",
      class: [],
      specificStudents: false
    }
  };

  componentDidMount() {
    const { setPublisher, publisher, fetchGroups } = this.props;
    fetchGroups();
    setPublisher(publisher);
  }

  onChange = evt => {
    const publisher = evt.target.value;
    const { setPublisher } = this.props;
    setPublisher(publisher);
  };

  handleSaveClick = evt => {
    const { saveCurriculumSequence } = this.props;
    evt.preventDefault();
    saveCurriculumSequence();
  };

  handleAddUnitOpen = () => {
    const { newUnit } = { ...this.state };
    const { destinationCurriculumSequence } = this.props;

    newUnit.id = uniqueId();
    newUnit.data = [];
    [newUnit.afterUnitId] = destinationCurriculumSequence.modules.map(module => module.id);

    this.setState(prevState => ({ addUnit: !prevState.addUnit, newUnit }));
  };

  handleAddCustomContent = () => {
    this.setState(prevState => ({ addCustomContent: !prevState.addCustomContent }));
  };

  handleSelectContent = () => {
    const { onSelectContent } = this.props;
    onSelectContent();
  };

  handleAddUnit = () => {
    this.setState(prevState => ({ addUnit: !prevState.addUnit }));
  };

  handleGuideSave = () => {
    const { saveGuideAlignment } = this.props;
    this.setState({ curriculumGuide: false });
    saveGuideAlignment();
  };

  handleGuidePopup = () => {
    this.setState(prevState => ({ curriculumGuide: !prevState.curriculumGuide }));
  };

  handleGuideCancel = () => {
    this.setState({ curriculumGuide: false });
  };

  addNewUnitToDestination = newUnit => {
    const { addNewUnitToDestination } = this.props;

    /** @type {String} */
    const { afterUnitId } = newUnit;
    delete newUnit.afterUnitId;

    addNewUnitToDestination({ afterUnitId, newUnit });

    this.setState({ newUnit: {}, addUnit: false });
  };

  onGuideChange = wrappedId => {
    const { setGuide } = this.props;
    const id = wrappedId[0];
    setGuide(id);
  };

  render() {
    const desktopWidthValue = Number(desktopWidth.split("px")[0]);
    const { onGuideChange } = this;
    const { addUnit, addCustomContent, curriculumGuide, newUnit } = this.state;
    const {
      expandedModules,
      onCollapseExpand,
      curriculumList,
      destinationCurriculumSequence,
      sourceCurriculumSequence,
      onSelectContent,
      windowWidth,
      onSourceCurriculumSequenceChange,
      selectContent,
      onDrop,
      onBeginDrag,
      curriculumGuides,
      publisher,
      guide,
      isContentExpanded,
      setSelectedItemsForAssign,
      group,
      createAssignment,
      selectedItemsForAssign,
      dataForAssign,
      setDataForAssign
    } = this.props;

    const { handleSaveClick } = this;

    // Options for add unit
    const options1 = destinationCurriculumSequence.modules.map(module => ({ value: module.id, label: module.name }));

    // TODO: change options2 to something more meaningful
    const options2 = [{ value: "Lesson", label: "Lesson" }, { value: "Lesson 2", label: "Lesson 2" }];

    // Dropdown options for guides
    const guidesDropdownOptions = curriculumGuides.map(item => ({ value: item._id, label: item.title }));

    const { title } = destinationCurriculumSequence;

    const isSelectContent = selectContent && destinationCurriculumSequence;

    // Module progress
    const totalModules = destinationCurriculumSequence.modules.length;
    const modulesCompleted = destinationCurriculumSequence.modules.filter(m => m.completed === true).length;
    const isAssignModalVisible = selectedItemsForAssign && selectedItemsForAssign.length > 0;

    return (
      <CurriculumSequenceWrapper>
        <EditModal
          visible={isAssignModalVisible}
          title="New Assignment"
          onOk={() => createAssignment(dataForAssign)}
          onCancel={() => setSelectedItemsForAssign(null)}
          onClose={() => setSelectedItemsForAssign(null)}
          modalData={dataForAssign}
          setModalData={setDataForAssign}
          group={group}
        />
        <Modal
          visible={addUnit}
          title="Add Unit"
          onOk={this.handleAddUnit}
          onCancel={this.handleAddUnit}
          footer={null}
          style={windowWidth > desktopWidthValue ? { minWidth: "640px", padding: "20px" } : { padding: "20px" }}
        >
          <AddUnitModalBody
            destinationCurriculumSequence={destinationCurriculumSequence}
            addNewUnitToDestination={this.addNewUnitToDestination}
            handleAddUnit={this.handleAddUnit}
            newUnit={newUnit}
          />
        </Modal>

        <Modal
          visible={addCustomContent}
          title="Add Custom Content"
          onOk={this.handleAddCustomContent}
          onCancel={this.handleAddCustomContent}
          footer={null}
          style={windowWidth > desktopWidthValue ? { minWidth: "640px", padding: "20px" } : { padding: "20px" }}
        >
          <ModalBody>
            <ModalLabelWrapper>
              <label>Content Type</label>
              <label>Add to</label>
            </ModalLabelWrapper>
            <ModalInputWrapper>
              <Input.Group compact>
                <Cascader defaultValue={["Lesson"]} options={options2} />
              </Input.Group>
              <Input.Group compact>
                <Cascader defaultValue={["Unit Name"]} options={options1} />
              </Input.Group>
            </ModalInputWrapper>
            <label>Reference #</label>
            <Input />
          </ModalBody>
          <ModalFooter>
            <Button type="primary" ghost key="back" onClick={this.handleAddCustomContent}>
              CANCEL
            </Button>
            <Button key="submit" type="primary" onClick={this.handleAddCustomContent}>
              SAVE
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          visible={curriculumGuide}
          onOk={this.handleGuideSave}
          onCancel={this.handleGuideCancel}
          footer={null}
          style={windowWidth > desktopWidthValue ? { minWidth: "640px", padding: "20px" } : { padding: "20px" }}
        >
          <ModalHeader>
            <span>Curriculum Alignments in Two Clicks</span>
          </ModalHeader>
          <GuideModalBody>
            <ModalSubtitleWrapper>
              <div>Which of these do you use?</div>
              <div>Select &#39;Other&#39; if you don&#39;t see your curriculum listed.</div>
            </ModalSubtitleWrapper>
            <RadioGroupWrapper>
              <Radio.Group onChange={this.onChange} value={publisher}>
                <Radio checked={publisher === EUREKA_PUBLISHER} value={EUREKA_PUBLISHER}>
                  Eureka/EngageNY
                </Radio>
                <Radio checked={publisher === TENMARKS_PUBLISHER} value={TENMARKS_PUBLISHER}>
                  TenMarks
                </Radio>
                <Radio checked={publisher === GOMATH_PUBLISHER} value={GOMATH_PUBLISHER}>
                  GoMath!
                </Radio>
              </Radio.Group>
            </RadioGroupWrapper>
            <GuidesDropdownWrapper>
              {guidesDropdownOptions.length > 0 && (
                <Input.Group compact>
                  <Cascader
                    key={guide}
                    onChange={onGuideChange}
                    defaultValue={[guide]}
                    style={{ width: "100%" }}
                    options={guidesDropdownOptions}
                  />
                </Input.Group>
              )}
            </GuidesDropdownWrapper>
          </GuideModalBody>
          <ModalFooter>
            <Button type="primary" ghost key="back" onClick={this.handleGuideCancel}>
              CANCEL
            </Button>
            <Button key="submit" type="primary" onClick={this.handleGuideSave}>
              SAVE
            </Button>
          </ModalFooter>
        </Modal>
        <TopBar>
          <CurriculumHeader justifyContent="space-between">
            <HeaderTitle>
              {title}
              <Icon
                style={{ fontSize: "12px", cursor: "pointer", marginLeft: "18px" }}
                type={curriculumGuide ? "up" : "down"}
                onClick={this.handleGuidePopup}
              />
            </HeaderTitle>
            <CurriculumHeaderButtons>
              <ShareButtonStyle>
                <Button type="default">
                  <ShareButtonIcon color={greenThird} width={20} height={20} />
                  <ShareButtonText>SHARE</ShareButtonText>
                </Button>
              </ShareButtonStyle>
              <SaveButtonStyle windowWidth={windowWidth}>
                <Button data-cy="saveCurriculumSequence" onClick={handleSaveClick}>
                  <SaveButtonIcon color={greenThird} width={20} height={20} />
                  <SaveButtonText>{windowWidth > desktopWidthValue ? "Save Changes" : "Save"}</SaveButtonText>
                </Button>
              </SaveButtonStyle>
            </CurriculumHeaderButtons>
          </CurriculumHeader>
        </TopBar>
        <SubTopBar>
          <SubTopBarContainer active={isContentExpanded}>
            <CurriculumSubHeaderRow marginBottom="36px">
              <SubHeaderTitleContainer>
                <SubHeaderTitle>Grade 2 Math Pacing Guide</SubHeaderTitle>
                <SubHeaderDescription>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget tellus velit. Sed at tortor accumsan
                  odio molestie congue.
                </SubHeaderDescription>
              </SubHeaderTitleContainer>
              <SunHeaderInfo>
                <SunHeaderInfoCard marginBottom="13px" marginLeft="-3px">
                  <GraduationCapIcon color="#848993" />
                  <SunHeaderInfoCardText marginLeft="-3px">Grad 2-4</SunHeaderInfoCardText>
                </SunHeaderInfoCard>
                <SunHeaderInfoCard>
                  <BookIcon color="#848993" />
                  <SunHeaderInfoCardText>Mathematics</SunHeaderInfoCardText>
                </SunHeaderInfoCard>
              </SunHeaderInfo>
            </CurriculumSubHeaderRow>
            <CurriculumSubHeaderRow>
              <ModuleProgressWrapper>
                <ModuleProgressLabel>
                  <ModuleProgressText>Module Progress</ModuleProgressText>
                  <ModuleProgressValuesWrapper>
                    <ModuleProgressValues>
                      {modulesCompleted}/{totalModules}
                    </ModuleProgressValues>
                    <ModuleProgressValuesLabel>Completed</ModuleProgressValuesLabel>
                  </ModuleProgressValuesWrapper>
                </ModuleProgressLabel>
                <ModuleProgress modules={destinationCurriculumSequence.modules} />
              </ModuleProgressWrapper>
              <SubheaderActions active={isContentExpanded}>
                <AddUnitSubHeaderButtonStyle>
                  <Button data-cy="openAddUnit" block onClick={this.handleAddUnitOpen}>
                    <IconPlus color="#1774F0" />
                    <ButtonText>Add Unit</ButtonText>
                  </Button>
                </AddUnitSubHeaderButtonStyle>
                <SelectContentSubHeaderButtonStyle block active={isContentExpanded}>
                  <Button data-cy="openAddContent" onClick={this.handleSelectContent}>
                    <IconMoveTo color="#1774F0" />
                    <ButtonText>Select Content</ButtonText>
                  </Button>
                </SelectContentSubHeaderButtonStyle>
                <AddCustomContentSubHeaderButtonStyle>
                  <Button data-cy="openAddCustomContentButton" block onClick={this.handleAddCustomContent}>
                    <IconCollapse color="#1774F0" />
                    <ButtonText>Add Custom Content</ButtonText>
                  </Button>
                </AddCustomContentSubHeaderButtonStyle>
              </SubheaderActions>
            </CurriculumSubHeaderRow>
          </SubTopBarContainer>
        </SubTopBar>
        <Wrapper active={isContentExpanded}>
          {destinationCurriculumSequence && (
            <Curriculum
              key={destinationCurriculumSequence._id}
              padding={selectContent}
              curriculum={destinationCurriculumSequence}
              expandedModules={expandedModules}
              onCollapseExpand={onCollapseExpand}
              onDrop={onDrop}
            />
          )}
          {isSelectContent && (
            <SelectContent
              key={sourceCurriculumSequence._id}
              destinationCurriculum={destinationCurriculumSequence}
              curriculumList={curriculumList}
              curriculum={sourceCurriculumSequence}
              onCurriculumSequnceChange={onSourceCurriculumSequenceChange}
              windowWidth={windowWidth}
              onSelectContent={onSelectContent}
              onBeginDrag={onBeginDrag}
            />
          )}
        </Wrapper>
      </CurriculumSequenceWrapper>
    );
  }
}

CurriculumSequence.propTypes = {
  publisher: PropTypes.string,
  guide: PropTypes.string,
  expandedModules: PropTypes.bool,
  curriculumList: PropTypes.array,
  windowWidth: PropTypes.number.isRequired,
  saveCurriculumSequence: PropTypes.func.isRequired,
  curriculumGuides: PropTypes.array,
  setPublisher: PropTypes.func.isRequired,
  setGuide: PropTypes.func.isRequired,
  saveGuideAlignment: PropTypes.func.isRequired,
  fetchGroups: PropTypes.func.isRequired,
  onSelectContent: PropTypes.func.isRequired,
  addNewUnitToDestination: PropTypes.func.isRequired,
  destinationCurriculumSequence: PropTypes.object.isRequired,
  onCollapseExpand: PropTypes.func.isRequired,
  sourceCurriculumSequence: PropTypes.object.isRequired,
  onSourceCurriculumSequenceChange: PropTypes.func.isRequired,
  selectContent: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
  onBeginDrag: PropTypes.func.isRequired,
  isContentExpanded: PropTypes.bool.isRequired,
  setSelectedItemsForAssign: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  createAssignment: PropTypes.func.isRequired,
  selectedItemsForAssign: PropTypes.array.isRequired,
  dataForAssign: PropTypes.object.isRequired,
  setDataForAssign: PropTypes.func.isRequired
};

CurriculumSequence.defaultProps = {
  publisher: EUREKA_PUBLISHER,
  guide: "",
  curriculumList: [],
  expandedModules: [],
  curriculumGuides: []
};

const ModuleProgress = ({ modules }) => (
  <ModuleProgressBars>
    {modules.map((m, index) => (
      <ModuleProgressBar completed={m.completed} key={index} />
    ))}
  </ModuleProgressBars>
);
ModuleProgress.propTypes = {
  modules: PropTypes.array.isRequired
};

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${greenSecondary};
  width: 100%;
  min-height: 100px;
`;

const SubheaderActions = styled.div`
  display: flex;
  @media only screen and (max-width: 1430px) {
    flex-wrap: wrap;
  }
  @media only screen and (max-width: ${largeDesktopWidth}) {
    width: 100%;
  }
  @media only screen and (max-width: 1366px) {
    margin-top: 20px;
    justify-content: flex-start;
    margin-right: auto;
  }
  @media only screen and (max-width: 1750px) and (min-width: 1367px) {
    margin-top: ${props => (props.active ? "20px" : "")};
    justify-content: ${props => (props.active ? "flex-start" : "")};
    margin-right: ${props => (props.active ? "auto" : "")};
  }
`;

const ModuleProgressBar = styled.div`
  border-radius: 2px;
  width: 42px;
  height: 7px;
  margin-right: 5px;
  margin-bottom: 5px;
  background: ${props => (props.completed ? greenSecondary : "rgba(197, 197, 197, 0.49)")};
`;

const ModuleProgressLabel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 4px;
`;

const ModuleProgressBars = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ModuleProgressWrapper = styled.div`
  z-index: 100;
  justify-self: flex-start;
  width: 100%;
  align-items: center;
  /* @media only screen and (min-width: ${desktopWidth}) {
    width: 60%;
  } */
`;
ModuleProgressWrapper.displayName = "ModuleProgressWrapper";

const ModuleProgressText = styled.div`
  color: #949494;
  text-align: left;
  font-size: 14px;
`;

const ModuleProgressValuesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ModuleProgressValues = styled.div`
  color: #434b5d;
  margin-right: 8px;
  font-size: 22px;
  font-weight: 600;
  font-family: "Open Sans, Bold";
`;

const ModuleProgressValuesLabel = styled.div`
  font-family: "Open Sans, Semibold";
  font-size: 16px;
  font-weight: 500;
  color: #434b5d;
`;

const GuidesDropdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
`;

const RadioGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalSubtitleWrapper = styled.div`
  text-align: center;
  width: 100%;
  padding-bottom: 40px;
`;

const GuideModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  padding-top: 40px;
  .ant-input:not(.ant-cascader-input) {
    margin-bottom: 20px;
  }
  .ant-input-group {
    width: 48%;
  }
  label {
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

const AddUnitSubHeaderButtonStyle = styled.div`
  display: flex;
  align-items: center;
  .ant-btn {
    color: #1774f0;
    border-color: ${white};
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(201, 208, 219, 0.5);
    @media only screen and (max-width: ${smallMobileWidth}) {
      width: 95px;
    }
  }
  .ant-btn:hover {
    background-color: #1774f0;
    color: ${white};
    border-color: #1774f0;
    svg {
      fill: ${white};
    }
  }
  @media only screen and (max-width: ${extraDesktopWidth}) {
    width: 45%;
  }
  @media only screen and (max-width: ${middleMobileWidth}) {
    position: relative;
    svg {
      position: absolute;
      left: 5px;
      top: 4px;
    }
  }
`;

const AddCustomContentSubHeaderButtonStyle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  .ant-btn {
    color: #1774f0;
    border-color: ${white};
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(201, 208, 219, 0.5);
    @media only screen and (max-width: ${smallMobileWidth}) {
      width: 228px;
    }
  }
  .ant-btn:hover {
    background-color: #1774f0;
    color: ${white};
    border-color: #1774f0;
    svg {
      fill: ${white};
    }
  }
  @media only screen and (max-width: ${extraDesktopWidth}) {
    padding-left: 0px;
    width: 100%;
  }
  @media only screen and (max-width: 1430px) {
    margin-top: 5px;
  }
  @media only screen and (max-width: ${smallMobileWidth}) {
    position: relative;
    width: 227px;
    svg {
      position: absolute;
      top: 4px;
    }
  }
`;

const SelectContentSubHeaderButtonStyle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  /* TODO: responsive paddings - negative margin on the parent */
  .ant-btn {
    color: #1774f0;
    border-color: ${white};
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(201, 208, 219, 0.5);
    width: 100%;
    @media only screen and (max-width: ${smallMobileWidth}) {
      width: 125px;
    }
  }
  .ant-btn:hover {
    background-color: #1774f0;
    color: ${white};
    border-color: #1774f0;
    svg {
      fill: ${white};
    }
  }
  @media only screen and (max-width: ${extraDesktopWidth}) {
    width: 55%;
  }
  @media only screen and (max-width: ${middleMobileWidth}) {
    position: relative;
    svg {
      position: absolute;
      left: 5px;
      top: 4px;
    }
  }
`;

const ShareButtonStyle = styled.div`
  margin-right: 20px !important;
  .ant-btn {
    padding: 10px 18px;
    min-height: 45px;
    min-width: 120px;
    color: ${greenSecondary};
    display: flex;
    align-items: center;
    @media only screen and (max-width: ${largeDesktopWidth}) {
      min-width: 60px;
      padding: 0px;
    }
    @media only screen and (max-width: ${mobileWidth}) {
      min-width: 43px;
      min-height: 40px;
      padding: unset;
      svg {
        margin-left: unset;
        margin: auto;
      }
    }
  }
`;

const SaveButtonStyle = styled.div`
  .ant-btn {
    padding: 10px 18px;
    min-height: 45px;
    min-width: 120px;
    color: ${greenSecondary};
    display: flex;
    align-items: center;
    @media only screen and (max-width: ${largeDesktopWidth}) {
      min-width: 60px;
    }
    @media only screen and (max-width: ${mobileWidth}) {
      padding: unset;
      min-width: 43px;
      min-height: 40px;
      svg {
        margin: auto;
      }
    }
  }
`;

const ModalInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .ant-cascader-picker {
    width: 100%;
  }
`;

const ModalLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  label {
    width: 48%;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  .ant-input:not(.ant-cascader-input) {
    margin-bottom: 20px;
  }
  .ant-input-group {
    width: 48%;
  }
  label {
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  .ant-btn {
    font-size: 10px;
    font-weight: 600;
    min-width: 100px;
    padding-left: 70px;
    padding-right: 70px;
    margin-left: 5px;
    margin-right: 5px;
    @media only screen and (max-width: ${desktopWidth}) {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  width: ${props => (props.active ? "100%" : "80%")};
  align-self: ${props => (props.active ? "flex-start" : "center")};
  margin-left: ${props => (props.active ? "0px" : "auto")};
  margin-right: ${props => (props.active ? "0px" : "auto")};
  @media only screen and (max-width: ${largeDesktopWidth}) {
    padding: 0px 40px;
    width: 100%;
  }
  @media only screen and (max-width: ${desktopWidth}) {
    padding: 0px 25px;
  }
`;

const CurriculumHeader = styled(FlexContainer)`
  width: 100%;
  z-index: 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 20px 40px 35px 30px;
  align-items: center;

  @media only screen and (max-width: ${mobileWidth}) {
    padding: 10px 20px;
  }

  @media only screen and (min-width: 846px) {
    padding: 20px 40px 35px 40px;
  }
`;

const CurriculumHeaderButtons = styled(FlexContainer)`
  display: flex;
`;

const SubTopBar = styled.div`
  width: ${props => (props.active ? "60%" : "80%")};
  padding-left: 43px;
  padding-right: ${props => (props.active ? "30px" : "43px")};
  @media only screen and (min-width: 1800px) {
    width: ${props => (props.active ? "60%" : "80%")};
    margin-left: ${props => (props.active ? "" : "auto")};
    margin-right: ${props => (props.active ? "" : "auto")};
  }
  @media only screen and (max-width: ${largeDesktopWidth}) {
    width: 100%;
    padding: 0px 40px;
  }
  @media only screen and (max-width: ${desktopWidth}) {
    padding: 0px 25px;
  }
`;

const SubTopBarContainer = styled.div`
  background: ${white};
  padding: 28px 43px 36px 45px;
  margin-bottom: 10px;
  margin-top: -15px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-left: ${props => (props.active ? "" : "auto")};
  margin-right: ${props => (props.active ? "" : "auto")};
  border-radius: 5px;
  box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.1);
  @media only screen and (max-width: 1366px) {
    flex-direction: column;
    justify-self: flex-start;
    margin-right: auto;
  }
  @media only screen and (max-width: 1750px) and (min-width: 1367px) {
    /* flex-direction: ${props => (props.active ? "column" : "row")};
    justify-self: ${props => (props.active ? "flex-start" : "")};
    margin-right: ${props => (props.active ? "auto" : "")}; */
  }
  @media only screen and (max-width: 480px) {
    padding-left: 20px;
  }
`;
SubTopBarContainer.displayName = "SubTopBarContainer";

const ButtonText = styled.div`
  text-transform: uppercase;
  padding-left: 17px;
  padding-right: 20px;
  font-size: 10px;
  font-weight: 600;
  width: 100%;
  @media only screen and (max-width: 1250px) {
    /* display: none; */
  }
`;

const ShareButtonText = styled.div`
  text-transform: uppercase;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 11px;
  font-weight: 600;
  @media only screen and (max-width: ${desktopWidth}) {
    padding-left: 0px;
    padding-right: 0px;
  }
  @media only screen and (max-width: ${tabletWidth}) {
    display: none;
  }
`;

const ShareButtonIcon = styled(IconShare)`
  margin-left: 17px;
`;

const SaveButtonText = styled.div`
  text-transform: uppercase;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 11px;
  font-weight: 600;
  @media only screen and (max-width: ${tabletWidth}) {
    display: none;
  }
`;

const SaveButtonIcon = styled(IconDiskette)``;

const CurriculumSequenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-btn {
    height: 24px;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  font-size: 30px;
  font-weight: 700;
  color: ${white};
  @media only screen and (max-width: ${mobileWidth}) {
    font-size: 25px;
  }
  @media only screen and (max-width: ${middleMobileWidth}) {
    font-size: 20px;
  }
  @media only screen and (max-width: ${smallMobileWidth}) {
    font-size: 14px;
  }
`;

const CurriculumSubHeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.marginBottom || "0px"};
  @media only screen and (max-width: ${tabletWidth}) {
    flex-direction: column;
    margin-bottom: ${props => props.marginBottom && "7px"};
  }
`;

const SubHeaderTitleContainer = styled.div`
  max-width: 55%;
  word-break: break-word;
  @media only screen and (max-width: ${tabletWidth}) {
    max-width: 100%;
  }
`;

const SubHeaderTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 7px;
  color: ${titleColor};
`;
const SubHeaderDescription = styled.p`
  color: #848993;
  font-size: 14px;
`;

const SunHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: ${tabletWidth}) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    margin-top: 20px;
  }
`;

const SunHeaderInfoCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.marginBottom || "0px"};
  margin-left: ${props => props.marginLeft || "0px"};
  @media only screen and (max-width: ${tabletWidth}) {
    margin-left: ${props => !props.marginLeft && "15px"};
  }
`;

const GraduationCapIcon = styled(IconGraduationCap)`
  margin-right: 9.5px;
`;

const BookIcon = styled(IconBook)`
  margin-right: 9.5px;
`;

const SunHeaderInfoCardText = styled.div`
  margin-left: ${props => props.marginLeft || "0px"};
  font-family: Open Sans, Bold;
  font-weight: 600;
`;

const enhance = compose(
  connect(
    state => ({
      curriculumGuides: state.curriculumSequence.guides,
      publisher: state.curriculumSequence.selectedPublisher,
      guide: state.curriculumSequence.selectedGuide,
      isContentExpanded: state.curriculumSequence.isContentExpanded,
      selectedItemsForAssign: state.curriculumSequence.selectedItemsForAssign,
      dataForAssign: state.curriculumSequence.dataForAssign,
      group: getGroupsSelector(state)
    }),
    {
      onGuideChange: changeGuideAction,
      setPublisher: setPublisherAction,
      setGuide: setGuideAction,
      saveGuideAlignment: saveGuideAlignmentAction,
      setSelectedItemsForAssign: setSelectedItemsForAssignAction,
      fetchGroups: fetchGroupsAction,
      fetchMultipleGroupMembers: fetchMultipleGroupMembersAction,
      setDataForAssign: setDataForAssignAction,
      createAssignment: createAssignmentAction,
      saveCurriculumSequence: saveCurriculumSequenceAction,
      addNewUnitToDestination: addNewUnitAction
    }
  )
);

export default enhance(CurriculumSequence);
