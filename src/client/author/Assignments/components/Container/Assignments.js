import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";

import { withWindowSizes, FlexContainer } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { receiveAssignmentsAction } from "../../../src/actions/assignments";
import { getAssignmentsSelector } from "../../../src/selectors/assignments";

import SortBar from "../SortBar/SortBar";
import FilterBar from "../FilterBar/FilterBar";
import TableList from "../TableList/TableList";
import ReleaseGradeSettingsModal from "../ReleaseGradeSettings/ReleaseGradeSetting";
import MobileTableList from "../MobileTabList/MobileTableList";
import ListHeader from "../../../src/components/common/ListHeader";

import { Container, PaginationInfo, Main, DRadio, StyledCard, FullFlexContainer, StyledFlexContainer } from "./styled";

class Assignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchStr: "",
      blockStyle: "tile",
      isShowFilter: false,
      showReleaseGradeSettings: false
    };
  }

  componentDidMount() {
    const { loadAssignments } = this.props;
    loadAssignments();
  }

  handleCreate = () => {
    const { history } = this.props;
    history.push("/author/assessments/create");
  };

  onOpenReleaseScoreSettings = () => {
    this.setState({ showReleaseGradeSettings: true });
  };
  onCloseReleaseScoreSettings = () => {
    this.setState({ showReleaseGradeSettings: false });
  };

  render() {
    const { assignments, creating, t, windowWidth, windowHeight } = this.props;
    return (
      <div>
        <ListHeader
          onCreate={this.handleCreate}
          creating={creating}
          title={t("common.assignmentsTitle")}
          btnTitle="NEW ASSESSMENT"
        />
        <Container>
          <FlexContainer>
            <Main>
              <FlexContainer justifyContent="space-between" style={{ marginBottom: 10 }}>
                <PaginationInfo>
                  1 to 20 of <i>25668</i>
                </PaginationInfo>
                <FullFlexContainer>
                  <SortBar onSortChange={this.handleSortChange} onStyleChange={this.handleStyleChange} />
                  <StyledFlexContainer>
                    <FilterBar windowWidth={windowWidth} windowHeight={windowHeight} />
                    <DRadio value={1}>
                      <span style={{ paddingLeft: "15px", display: "inline-block" }}>Assigned</span>
                    </DRadio>
                    <DRadio value={2}>
                      <span style={{ paddingLeft: "15px", display: "inline-block" }}>Drafts</span>
                    </DRadio>
                  </StyledFlexContainer>
                </FullFlexContainer>
              </FlexContainer>
              <StyledCard>
                <TableList assignments={assignments} onOpenReleaseScoreSettings={this.onOpenReleaseScoreSettings} />
                <MobileTableList assignments={assignments} windowWidth={windowWidth} windowHeight={windowHeight} />
              </StyledCard>
            </Main>
          </FlexContainer>
        </Container>
        <ReleaseGradeSettingsModal
          showReleaseGradeSettings={this.state.showReleaseGradeSettings}
          onCloseReleaseScoreSettings={this.onCloseReleaseScoreSettings}
        />
      </div>
    );
  }
}

Assignments.propTypes = {
  assignments: PropTypes.array.isRequired,
  loadAssignments: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired
};

const enhance = compose(
  withWindowSizes,
  withNamespaces("header"),
  connect(
    state => ({
      assignments: getAssignmentsSelector(state)
    }),
    {
      loadAssignments: receiveAssignmentsAction
    }
  )
);

export default enhance(Assignments);
