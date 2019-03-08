/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withWindowSizes } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
// actions
import { receiveTestActivitydAction, receiveGradeBookdAction } from "../../../src/actions/classBoard";
// ducks
import {
  getTestActivitySelector,
  getGradeBookSelector,
  getAdditionalDataSelector
} from "../../../sharedDucks/classBoard";
// components
import Score from "../Score/Score";
import DisneyCard from "../DisneyCard/DisneyCard";
import Graph from "../ProgressGraph/ProgressGraph";
import ClassSelect from "../../../Shared/Components/ClassSelect/ClassSelect";
import ClassHeader from "../../../Shared/Components/ClassHeader/ClassHeader";
import HooksContainer from "../HooksContainer/HooksContainer";
// icon images
import More from "../../assets/more.svg";
import Stats from "../../assets/stats.svg";
import Ghat from "../../assets/graduation-hat.svg";
import Ptools from "../../assets/printing-tool.svg";
import Elinks from "../../assets/external-link.svg";
// styled wrappers
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

  getTestActivity = data => {
    let testActivityId = null;
    data.map(item => {
      if (item.testActivityId) {
        testActivityId = item.testActivityId;
      }
    });
    return testActivityId;
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
    const testActivityId = this.getTestActivity(testActivity);
    const classname = additionalData ? additionalData.className : "";

    return (
      <div>
        <HooksContainer classId={classId} assignmentId={assignmentId} />
        <ClassHeader
          classId={classId}
          active="classboard"
          creating={creating}
          onCreate={this.handleCreate}
          assignmentId={assignmentId}
          additionalData={additionalData}
          testActivityId={testActivityId}
        />
        <StyledFlexContainer justifyContent="space-between">
          <PaginationInfo>
            &lt; <AnchorLink to="/author/assignments">RECENTS ASSIGNMENTS</AnchorLink> /{" "}
            <Anchor>{additionalData.testName}</Anchor> / <Anchor>{additionalData.className}</Anchor>
          </PaginationInfo>
          <ClassSelect classname={classname} />
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
