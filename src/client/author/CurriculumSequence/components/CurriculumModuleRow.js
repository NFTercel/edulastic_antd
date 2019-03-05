import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Menu, Dropdown, Icon } from "antd";
import { Paper, Checkbox } from "@edulastic/common";
import { mobileWidth, lightBlue, white, greenDarkSecondary, desktopWidth, tabletWidth } from "@edulastic/colors";
import {
  toggleCheckedUnitItemAction,
  setSelectedItemsForAssignAction,
  removeItemFromUnitAction,
  removeUnitAction
} from "../ducks";
import minusIcon from "../assets/minus.svg";
import plusIcon from "../assets/plus.svg";
import visualizationIcon from "../assets/visualization-show.svg";
import assessmentRed from "../assets/assessment.svg";
import assessmentGreen from "../assets/concept-check.svg";
import moduleCompletedIcon from "../assets/module-completed.svg";
import moreIcon from "../assets/more.svg";

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
      checkedUnitItems,
      toggleUnitItem,
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
            <ModuleHeader collapsed={collapsed}>
              <ModuleInfo>
                <Button
                  type="primary"
                  ghost
                  className="module-btn-expand-collapse"
                  onClick={() => onCollapseExpand(id)}
                  data-cy="expandCollapseAssignments"
                >
                  {!collapsed ? (
                    <img src={minusIcon} alt="collapse module " />
                  ) : (
                    <img src={plusIcon} alt="expand module " />
                  )}
                </Button>
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
                            <img src={moduleCompletedIcon} alt="module completed icon" />
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
                        <Button type="primary" ghost data-cy="AssignWholeModule" onClick={() => assignModule(module)}>
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
                    <Assignment data-cy="moduleAssignment" key={`${moduleData.id}-${moduleData.assigned}`}>
                      <AssignmentInnerWrapper>
                        <ModuleFocused />

                        <AssignmentContent expanded={isContentExpanded}>
                          <Checkbox
                            onChange={() => toggleUnitItem(moduleData.id)}
                            checked={checkedUnitItems.indexOf(moduleData.id) !== -1}
                            className="module-checkbox"
                          />
                          <ModuleDataName>{moduleData.name}</ModuleDataName>
                        </AssignmentContent>
                        <AssignmentIconsWrapper expanded={isContentExpanded}>
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
                          <AssignmentIconsHolder>
                            <AssignmentIcon>
                              <CustomIcon>
                                <img src={visualizationIcon} alt="visualize " />
                              </CustomIcon>
                            </AssignmentIcon>
                            <AssignmentButton>
                              <Button
                                data-cy="assignButton"
                                onClick={() => setSelectedItemsForAssign(moduleData.testId)}
                                type="primary"
                                icon={moduleData.assigned ? "check" : "arrow-right"}
                                ghost={!moduleData.assigned}
                              >
                                {moduleData.assigned ? IS_ASSIGNED : NOT_ASSIGNED}
                              </Button>
                            </AssignmentButton>
                            <AssignmentIcon>
                              <Dropdown overlay={moreMenu} trigger={["click"]}>
                                <CustomIcon data-cy="assignmentMoreOptionsIcon">
                                  <img style={{ width: "16px" }} src={moreIcon} alt="more options" />
                                </CustomIcon>
                              </Dropdown>
                            </AssignmentIcon>
                          </AssignmentIconsHolder>
                        </AssignmentIconsWrapper>
                      </AssignmentInnerWrapper>
                    </Assignment>
                  );
                })}
                <ModuleFooter />
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
  checkedUnitItems: PropTypes.array.isRequired,
  isContentExpanded: PropTypes.bool.isRequired,
  removeItemFromUnit: PropTypes.func.isRequired,
  toggleUnitItem: PropTypes.func.isRequired,
  removeUnit: PropTypes.func.isRequired
};

const CustomIcon = styled.span`
  cursor: pointer;
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
  border-left: 5px solid ${greenDarkSecondary};
  width: 5px;
  position: absolute;
  height: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  top: 0;
  opacity: 0;
`;

const ModuleAssignedUnit = styled.span`
  justify-self: flex-start;
  margin-right: auto;
  @media only screen and (max-width: ${tabletWidth}) {
    margin-right: 0;
  }
`;

const ModuleTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModuleCompletedLabel = styled.div`
  color: #4aac8b;
`;

const ModuleCompletedIcon = styled.div`
  padding-left: 30px;
  padding-right: 30px;
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
    min-width: 121px;
    display: flex;
    align-items: center;
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
  }
  @media only screen and (max-width: ${desktopWidth}) {
    align-self: flex-start;
  }
`;

const AssignmentContent = styled.div`
  flex-direction: row;
  display: flex;
  min-width: ${props => (!props.expanded ? "30%" : "45%")};
`;

const ModuleTitle = styled.div`
  display: flex;
  justify-self: flex-start;
  align-items: center;
  @media only screen and (max-width: ${tabletWidth}) {
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
  }
`;

const ModuleTitleAssignedWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  @media only screen and (max-width: ${tabletWidth}) {
    flex-direction: column;
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
  padding-bottom: 15px;
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
    justify-content: flex-start;
    margin-right: auto;
    margin-left: 0;
  }
`;

const AssignmentIcon = styled.span`
  margin-left: 10px;
  margin-right: 10px;
`;

const Row = styled(Paper)`
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
  overflow: auto;
  height: 100%;

  @media (max-width: ${mobileWidth}) {
    padding-left: 10px;
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
    margin-right: auto;
    margin-bottom: 0;
    margin-top: 0;
    margin-left: 0;
  }
  @media only screen and (max-width: ${mobileWidth}) {
    flex-direction: column;
  }
`;

const Module = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const ModuleHeader = styled(Row)`
  box-shadow: none;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: ${({ collapsed }) => (!collapsed ? "0px" : "10px")};
  border-bottom-right-radius: ${({ collapsed }) => (!collapsed ? "0px" : "10px")};
  padding-bottom: 0;
  overflow: hidden;
  position: relative;
`;

const Assignment = styled(Row)`
  border-radius: 0;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 0;
  &:active ${ModuleFocused}, &:focus ${ModuleFocused}, &:hover ${ModuleFocused} {
    opacity: 1;
  }
  @media only screen and (max-width: ${desktopWidth}) {
    flex-direction: column;
  }
`;
Assignment.displayName = "Assignment";

const AssignmentInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #fbfbfb;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  .module-checkbox {
    align-self: center;
  }
  & div,
  & span {
    align-items: center;
  }
  @media only screen and (max-width: ${tabletWidth}) {
    flex-direction: column;
    justify-items: center;
    margin-left: auto;
    align-items: flex-start;
  }
`;
AssignmentInnerWrapper.displayName = "AssignmentInnerWrapper";

const ModuleFooter = styled(Assignment)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: ${white};
  display: flex;
  /* padding-bottom: 0; */
`;

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
    justifyself: flex-end;
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
