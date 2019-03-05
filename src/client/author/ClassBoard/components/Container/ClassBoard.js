/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import HooksContainer from "../HooksContainer/HooksContainer";
import { receiveTestActivitydAction, receiveGradeBookdAction } from "../../../src/actions/classBoard";
import {
  getTestActivitySelector,
  getGradeBookSelector,
  getAdditionalDataSelector
} from "../../../sharedDucks/classBoard";

import ListHeader from "../ListHeader/ListHeader";
import SortClass from "../SortClass/SortClass";
import DisneyCard from "../DisneyCard/DisneyCard";
import Graph from "../ProgressGraph/ProgressGraph";
import Score from "../Score/Score";

import Ghat from "../../assets/graduation-hat.svg";
import Stats from "../../assets/stats.svg";
import Ptools from "../../assets/printing-tool.svg";
import More from "../../assets/more.svg";
import Elinks from "../../assets/external-link.svg";

import {
  Anchor,
  BarDiv,
  SpaceDiv,
  SpaceDivF,
  AnchorLink,
  StyledAnc,
  StyledCard,
  StyledButton,
  StyledCheckbox,
  PaginationInfo,
  PaginationInfoF,
  PaginationInfoS,
  StyledFlexContainer
} from "./styled";

class ClassBoard extends Component {
  constructor(props) {
    super(props);
    this.changeStateTrue = this.changeStateTrue.bind(this);
    this.changeStateFalse = this.changeStateFalse.bind(this);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      searchStr: "",
      // eslint-disable-next-line react/no-unused-state
      blockStyle: "tile",
      // eslint-disable-next-line react/no-unused-state
      isShowFilter: false,
      flag: true
    };
  }

  componentDidMount() {
    const { loadGradebook, loadTestActivity, match } = this.props;
    const { assignmentId, classId } = match.params;
    loadGradebook(assignmentId, classId);
    loadTestActivity(assignmentId, classId);
  }

  changeStateTrue() {
    this.setState({
      flag: true
    });
  }

  changeStateFalse() {
    this.setState({
      flag: false
    });
  }

  handleCreate = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  render() {
    const {
      gradebook,
      testActivity,
      creating,
      match,
      additionalData = { classes: [] },
      // eslint-disable-next-line react/prop-types
      t
    } = this.props;

    const { assignmentId, classId } = match.params;
    const classname = additionalData ? additionalData.className : "";

    return (
      <div>
        <HooksContainer classId={classId} assignmentId={assignmentId} />
        <ListHeader
          onCreate={this.handleCreate}
          creating={creating}
          assignmentId={assignmentId}
          additionalData={additionalData}
          classId={classId}
        />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            &lt; <AnchorLink to="/author/assignments">RECENTS ASSIGNMENTS</AnchorLink> /{" "}
            <Anchor>{additionalData.testName}</Anchor> / <Anchor>{additionalData.className}</Anchor>
          </PaginationInfo>
          <SortClass classname={classname} />
        </StyledFlexContainer>
        <StyledCard bordered={false}>
          <Graph gradebook={gradebook} />
        </StyledCard>
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfoF>
            <StyledAnc onClick={this.changeStateTrue}>
              <img src={Ghat} />
            </StyledAnc>
            <SpaceDiv />
            <StyledAnc onClick={this.changeStateFalse}>
              <img src={Stats} />
            </StyledAnc>
            <SpaceDiv />
            <BarDiv />
            <SpaceDiv />
            <StyledCheckbox checked>SELECT ALL</StyledCheckbox>
          </PaginationInfoF>
          <PaginationInfoS>
            <StyledButton>
              <img src={Ptools} />
              <SpaceDivF />
              {t("common.print")}
            </StyledButton>
            <StyledButton>
              <img src={Elinks} />
              <SpaceDivF />
              {t("common.redirect")}
            </StyledButton>
            <StyledButton>
              <img src={More} />
              <SpaceDivF />
              {t("common.more")}
            </StyledButton>
          </PaginationInfoS>
        </StyledFlexContainer>
        {this.state.flag ? (
          <DisneyCard testActivity={testActivity} assignmentId={assignmentId} classId={classId} />
        ) : (
          <Score gradebook={gradebook} assignmentId={assignmentId} classId={classId} />
        )}
      </div>
    );
  }
}

const enhance = compose(
  withWindowSizes,
  withNamespaces("classBoard"),
  connect(
    state => ({
      gradebook: getGradeBookSelector(state),
      testActivity: getTestActivitySelector(state),
      additionalData: getAdditionalDataSelector(state)
    }),
    {
      loadGradebook: receiveGradeBookdAction,
      loadTestActivity: receiveTestActivitydAction
    }
  )
);

export default enhance(ClassBoard);

ClassBoard.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loadTestActivity: PropTypes.func.isRequired,
  creating: PropTypes.object.isRequired,
  testActivity: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};
