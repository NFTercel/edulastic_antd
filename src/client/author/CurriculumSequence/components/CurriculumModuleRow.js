import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Menu, Dropdown, Icon } from "antd";
import { mobileWidth, lightBlue, white, desktopWidth, tabletWidth, lightGreenSecondary } from "@edulastic/colors";
import { IconVerified, IconVisualization, IconCheckSmall, IconMoreVertical, IconLeftArrow } from "@edulastic/icons";
import {
  toggleCheckedUnitItemAction,
  setSelectedItemsForAssignAction,
  removeItemFromUnitAction,
  removeUnitAction
} from "../ducks";
import assessmentRed from "../assets/assessment.svg";
import assessmentGreen from "../assets/concept-check.svg";

/**
 * @typedef {object} Props
 * @property {import('./CurriculumSequence').Module} module
 * @property {function} onCollapseExpand
 * @property {function} toggleUnitItem
 * @property {boolean} collapsed
 * @property {string[]} checkedUnitItems
 * @property {boolean} isContentExpanded
 * @property {function} setSelectedItemsForAssign
 * set module item that will be assigned, also
 * when there's more than 0 elements set, modal for assignment will be shown
 * when empty array is set, modal is hidden
 */

const IS_ASSIGNED = "ASSIGNED";
const NOT_ASSIGNED = "ASSIGN";

/** @extends Component<Props> */
class ModuleRow extends Component {
  /**
   * @param {import('./CurriculumSequence').Module} module
   */
  assignModule = module => {
    const { setSelectedItemsForAssign } = this.props;
    const moduleItemsIds = module.data.map(item => item.testId);
    setSelectedItemsForAssign(moduleItemsIds);
  };

  render() {
    const {
      onCollapseExpand,
      collapsed,
      padding,
      // checkedUnitItems,
      // toggleUnitItem,
      isContentExpanded,
      setSelectedItemsForAssign,
      module,
      removeItemFromUnit,
      removeUnit
    } = this.props;
    const { completed, data, name, id } = module;
    const { assignModule } = this;

    const totalAssigned = data.length;
    const numberOfAssigned = data.filter(item => item.assigned).length;
    const [whichModule, moduleName] = name.split(":");

    return (
      <ModuleWrapper data-cy="curriculumModuleRow" key={`${module.data.length}-${module.id}`} padding={padding}>
        <Container>
          <Module>
            <ModuleHeader
              collapsed={collapsed}
              padding="17px 25px 16px 27px"
              borderRadius={collapsed ? "5px" : "unset"}
              boxShadow={collapsed ? "0 3px 7px 0 rgba(0, 0, 0, 0.1)" : "unset"}
            >
              <ModuleInfo>
                <CustomIcon marginRight="25" onClick={() => onCollapseExpand(id)}>
                  {!collapsed ? (
                    <Icon type="up" style={{ color: "#707070" }} />
                  ) : (
                    <Icon type="down" style={{ color: "#707070" }} />
                  )}
                </CustomIcon>
                <ModuleTitleAssignedWrapper>
                  <ModuleTitleWrapper>
                    <ModuleTitlePrefix>
                      {whichModule}
                      <Icon
                        type="close-circle"
                        data-cy="removeUnit"
                        style={{ visibility: "hidden" }}
                        onClick={() => removeUnit(module.id)}
                      />
                    </ModuleTitlePrefix>
                    <ModuleTitle>{moduleName}</ModuleTitle>
                  </ModuleTitleWrapper>

                  {completed && (
                    <React.Fragment>
                      <ModuleCompleted>
                        <ModuleCompletedLabel>MODULE COMPLETED</ModuleCompletedLabel>
                        <ModuleCompletedIcon>
                          <CustomIcon>
                            <IconVerified color={lightGreenSecondary} />
                          </CustomIcon>
                        </ModuleCompletedIcon>
                      </ModuleCompleted>
                    </React.Fragment>
                  )}
                  {!completed && (
                    <ModulesWrapper>
                      <ModulesAssigned>
                        Assigned
                        <NumberOfAssigned data-cy="numberOfAssigned">{numberOfAssigned}</NumberOfAssigned>
                        of
                        <TotalAssigned data-cy="totalAssigned">{totalAssigned}</TotalAssigned>
                      </ModulesAssigned>
                      <AssignModuleButton>
                        <Button ghost data-cy="AssignWholeModule" onClick={() => assignModule(module)}>
                          ASSIGN MODULE
                        </Button>
                      </AssignModuleButton>
                    </ModulesWrapper>
                  )}
                </ModuleTitleAssignedWrapper>
              </ModuleInfo>
            </ModuleHeader>
            {!collapsed && (
              // eslint-disable-next-line
              <div>
                {data.map(moduleData => {
                  const moreMenu = (
                    <Menu data-cy="moduleItemMoreMenu">
                      <Menu.Item
                        data-cy="moduleItemMoreMenuItem"
                        onClick={() =>
                          removeItemFromUnit({
                            moduleId: module.id,
                            itemId: moduleData.id
                          })
                        }
                      >
                        Remove
                      </Menu.Item>
                    </Menu>
                  );

                  return (
                    <Assignment
                      data-cy="moduleAssignment"
                      key={`${moduleData.id}-${moduleData.assigned}`}
                      padding="14px 30px 14px 50px"
                      borderRadius="unset"
                      boxShadow="unset"
                    >
                      <ModuleFocused />
                      <AssignmentInnerWrapper>
                        <AssignmentContent expanded={isContentExpanded}>
                          {/* <Checkbox
                            onChange={() => toggleUnitItem(moduleData.id)}
                            checked={checkedUnitItems.indexOf(moduleData.id) !== -1}
                            className="module-checkbox"
                          /> */}
                          <CustomIcon>
                            <Icon type="right" style={{ color: "#707070" }} />
                          </CustomIcon>
                          <ModuleDataName>{moduleData.name}</ModuleDataName>
                        </AssignmentContent>
                        <ModuleAssignedUnit>
                          {moduleData.assigned && !moduleData.completed && (
                            <CustomIcon>
                              <img src={assessmentRed} alt="Module item is assigned" />
                            </CustomIcon>
                          )}
                          {moduleData.completed && (
                            <CustomIcon>
                              <img src={assessmentGreen} alt="Module item is completed" />
                            </CustomIcon>
                          )}
                        </ModuleAssignedUnit>
                        <AssignmentIconsWrapper expanded={isContentExpanded}>
                          <AssignmentIconsHolder>
                            <AssignmentIcon>
                              <CustomIcon>
                                <IconVisualization color="#1774F0" />
                              </CustomIcon>
                            </AssignmentIcon>
                            <AssignmentButton assigned={moduleData.assigned}>
                              <Button
                                data-cy="assignButton"
                                onClick={() => setSelectedItemsForAssign(moduleData.testId)}
                              >
                                {moduleData.assigned ? (
                                  <IconCheckSmall color={white} />
                                ) : (
                                  <IconLeftArrow color="#1774F0" width={13.3} height={9.35} />
                                )}
                                {moduleData.assigned ? IS_ASSIGNED : NOT_ASSIGNED}
                              </Button>
                            </AssignmentButton>
                            <AssignmentIcon>
                              <Dropdown overlay={moreMenu} trigger={["click"]}>
                                <CustomIcon data-cy="assignmentMoreOptionsIcon" marginLeft={25} marginRight={1}>
                                  <IconMoreVertical color="#1774F0" />
                                </CustomIcon>
                              </Dropdown>
                            </AssignmentIcon>
                          </AssignmentIconsHolder>
                        </AssignmentIconsWrapper>
                      </AssignmentInnerWrapper>
                    </Assignment>
                  );
                })}
              </div>
            )}
          </Module>
        </Container>
      </ModuleWrapper>
    );
  }
}

ModuleRow.propTypes = {
  setSelectedItemsForAssign: PropTypes.array.isRequired,
  module: PropTypes.object.isRequired,
  onCollapseExpand: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  padding: PropTypes.bool.isRequired,
  // checkedUnitItems: PropTypes.array.isRequired,
  isContentExpanded: PropTypes.bool.isRequired,
  removeItemFromUnit: PropTypes.func.isRequired,
  // toggleUnitItem: PropTypes.func.isRequired,
  removeUnit: PropTypes.func.isRequired
};

const CustomIcon = styled.span`
  cursor: pointer;
  margin-right: ${props => props.marginRight || 25}px;
  margin-left: ${props => props.marginLeft || 0}px;
  @media only screen and (max-width: ${mobileWidth}) {
    margin-right: 0px;
    margin-left: 0px;
    padding: 5px;
  }
`;

const AssignmentIconsHolder = styled.div`
  display: flex;
  justify-items: flex-end;
  margin-left: auto;
  @media only screen and (max-width: ${desktopWidth}) {
    margin-left: 0;
    justify-items: flex-start;
    /* margin-right: 100%;  */
  }
`;

/* NOTE: margin-right: 100%; - hack but works */
const ModuleFocused = styled.div`
  border-left: 3px solid #4aac8b;
  width: 3px;
  position: absolute;
  height: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  top: 0;
  opacity: 0;
`;

const ModuleAssignedUnit = styled.div`
  margin-left: auto;
  @media only screen and (max-width: ${tabletWidth}) {
    margin-right: 0;
  }
  @media only screen and (max-width: ${tabletWidth}) and (min-width: ${mobileWidth}) {
    margin-right: -25px;
  }
`;

const ModuleTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: ${tabletWidth}) {
    width: 80%;
  }
  @media only screen and (max-width: ${mobileWidth}) {
    width: 100%;
  }
`;

const ModuleCompletedLabel = styled.div`
  color: ${lightGreenSecondary};
  font-size: 11px;
  @media only screen and (max-width: ${tabletWidth}) {
    display: none;
  }
`;

const ModuleCompletedIcon = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  @media only screen and (max-width: ${tabletWidth}) {
    padding-left: 0px;
    padding-right: 0px;
    position: absolute;
    top: 5px;
    right: -10px;
  }
`;

const ModuleCompleted = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  width: auto;
  align-items: center;
  @media only screen and (max-width: ${tabletWidth}) {
    align-self: flex-start;
    margin-left: 0;
  }
`;

const NumberOfAssigned = styled.strong`
  padding-left: 4px;
  padding-right: 4px;
  font-weight: bolder;
`;

const TotalAssigned = styled.strong`
  padding-left: 4px;
  font-weight: bolder;
`;

const AssignmentButton = styled.div`
  min-width: 121px;
  .ant-btn {
    color: ${({ assigned }) => (assigned ? white : "#1774F0")};
    border-color: ${({ assigned }) => (assigned ? "#1774F0" : white)};
    background-color: ${({ assigned }) => (assigned ? "#1774F0" : white)};
    min-width: 121px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(201, 208, 219, 0.5);
    &:hover {
      background-color: ${({ assigned }) => (assigned ? white : "#1774F0")};
      color: ${({ assigned }) => (assigned ? "#1774F0" : white)};
      border-color: ${({ assigned }) => (assigned ? white : "#1774F0")};
      svg {
        fill: ${({ assigned }) => (assigned ? "#1774F0" : white)};
      }
    }
    i {
      position: absolute;
      position: absolute;
      left: 6px;
      display: flex;
      align-items: center;
    }
    span {
      margin-left: auto;
      margin-right: auto;
      font-size: 12px;
      font-weight: 600;
    }
  }
`;

const AssignModuleButton = styled.div`
  align-self: center;
  .ant-btn {
    min-height: 30px;
    font-size: 10px;
    margin-right: 20px;
    color: #1774f0;
    border-color: ${white};
    box-shadow: 0 2px 4px rgba(201, 208, 219, 0.5);
    @media only screen and (max-width: ${mobileWidth}) {
      margin-right: 0px;
      padding: 0px 7px;
    }
  }
  @media only screen and (max-width: ${desktopWidth}) {
    align-self: flex-start;
  }
`;

const AssignmentContent = styled.div`
  flex-direction: row;
  display: flex;
  min-width: ${props => (!props.expanded ? "30%" : "45%")};
  @media only screen and (max-width: ${mobileWidth}) {
    width: 80%;
  }
`;

const ModuleTitle = styled.div`
  display: flex;
  justify-self: flex-start;
  align-items: center;
  color: #30404f;
  font-size: 18px;
  @media only screen and (max-width: ${tabletWidth}) {
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
  }
  @media only screen and (max-width: ${mobileWidth}) {
    font-size: 12px;
    padding: 0px 0px 5px;
  }
`;

const ModuleTitleAssignedWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  @media only screen and (max-width: ${tabletWidth}) {
    flex-wrap: wrap;
    margin-top: -5px;
    position: relative;
  }
`;

const ModuleTitlePrefix = styled.div`
  font-weight: 300;
`;

const ModuleDataName = styled.div`
  font-weight: 300;
  @media only screen and (max-width: ${desktopWidth}) {
    min-width: auto;
    order: 2;
  }
`;

const ModuleInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  @media only screen and (max-width: ${mobileWidth}) {
    align-items: flex-start;
  }
`;

const AssignmentIconsWrapper = styled.div`
  margin-left: auto;
  padding: 0px;
  display: inline-flex;
  min-width: 55%;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: ${tabletWidth}) {
    padding-top: 10px;
    margin-left: auto;
    margin-right: 0px;
  }
`;

const AssignmentIcon = styled.span`
  margin-left: 10px;
  margin-right: 10px;
`;

const Row = styled.div`
  border-radius: 10px;
  background: ${white};
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 10px;
  box-shadow: none;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  height: 100%;

  @media (max-width: ${mobileWidth}) {
    padding-left: 0px;
    margin-right: ${props => !props.value && "20px !important"};
    margin-left: ${props => props.value && "20px !important"};
  }
`;

const ModulesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  margin-bottom: auto;
  margin-top: auto;
  @media only screen and (max-width: ${tabletWidth}) {
    justify-content: flex-start;
    margin-left: auto;
    margin-bottom: 0;
    margin-top: 0;
  }
  @media only screen and (max-width: ${mobileWidth}) {
    /* flex-direction: column; */
  }
`;

const Module = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #949494;
  @media only screen and (max-width: ${mobileWidth}) {
    font-size: 11px;
  }
`;

const ModuleHeader = styled(Row)`
  box-shadow: none;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: ${({ collapsed }) => (!collapsed ? "0px" : "10px")};
  border-bottom-right-radius: ${({ collapsed }) => (!collapsed ? "0px" : "10px")};
  /* padding-bottom: 0; */
  overflow: hidden;
  position: relative;
`;

const Assignment = styled(Row)`
  border-radius: 0;
  border-bottom: 1px #f2f2f2 solid;
  position: relative;
  background: #f9fbfc !important;
  &:active ${ModuleFocused}, &:focus ${ModuleFocused}, &:hover ${ModuleFocused} {
    opacity: 1;
  }
  &:first-child {
    border-top: 1px #f2f2f2 solid;
  }
  &:last-child {
    border-bottom: 0px;
  }
  @media only screen and (max-width: ${desktopWidth}) {
    flex-direction: column;
  }
`;
Assignment.displayName = "Assignment";

const AssignmentInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .module-checkbox {
    align-self: center;
  }
  & div,
  & span {
    align-items: center;
  }
  @media only screen and (max-width: ${tabletWidth}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-items: center;
    margin-left: auto;
    align-items: flex-start;
  }
`;
AssignmentInnerWrapper.displayName = "AssignmentInnerWrapper";

const ModulesAssigned = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  padding-right: 20px;
  padding-left: 20px;
  font-weight: 100;
  color: #000;
  margin-left: auto;
  justify-self: flex-end;
  line-height: 2.4;
  min-width: 123px;
  max-height: 30px;
  margin-top: auto;
  margin-bottom: auto;
  @media only screen and (max-width: ${tabletWidth}) {
    margin-right: auto;
    justify-self: flex-start;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
  }
  @media only screen and (max-width: ${mobileWidth}) {
    min-width: 95px;
    margin-bottom: 0px;
  }
`;

const ModuleWrapper = styled.div`
  & {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0px;
    padding-right: ${({ padding }) => (padding ? "20px" : "0px")};
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .module-checkbox {
    span {
      margin-right: 23px;
    }
  }
  .module-btn-assigned {
    background-color: ${lightBlue};
    margin-left: auto;
    justify-self: flex-end;
  }
  .module-btn-expand-collapse {
    border: none;
    box-shadow: none;
  }
`;

const enhance = compose(
  connect(
    ({ curriculumSequence }) => ({
      checkedUnitItems: curriculumSequence.checkedUnitItems,
      isContentExpanded: curriculumSequence.isContentExpanded
    }),
    {
      toggleUnitItem: toggleCheckedUnitItemAction,
      setSelectedItemsForAssign: setSelectedItemsForAssignAction,
      removeItemFromUnit: removeItemFromUnitAction,
      removeUnit: removeUnitAction
    }
  )
);

export default enhance(ModuleRow);
