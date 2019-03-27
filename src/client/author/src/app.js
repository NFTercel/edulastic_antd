import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Progress } from "@edulastic/common";
import { tabletWidth, mainBgColor } from "@edulastic/colors";
import Sidebar from "./Sidebar/SideMenu";
/* lazy load routes */
const Assignments = lazy(() => import("../Assignments"));
const Regrade = lazy(() => import("../Regrade"));
const AssessmentCreate = lazy(() => import("../AssessmentCreate"));
const AssessmentPage = lazy(() => import("../AssessmentPage"));
const ClassBoard = lazy(() => import("../ClassBoard"));
const ClassResponses = lazy(() => import("../ClassResponses"));
const ExpressGrader = lazy(() => import("../ExpressGrader"));
const TestList = lazy(() => import("../TestList"));
const TestPage = lazy(() => import("../TestPage"));
const QuestionEditor = lazy(() => import("../QuestionEditor"));
const ItemList = lazy(() => import("../ItemList"));
const ItemDetail = lazy(() => import("../ItemDetail"));
const ItemAdd = lazy(() => import("../ItemAdd"));
const PickUpQuestionType = lazy(() => import("../PickUpQuestionType"));
const CurriculumContainer = lazy(() => import("../CurriculumSequence"));
const Reports = lazy(() => import("../Reports"));
const ResponseFrequency = lazy(() => import("../Reports/subPages/ResponseFrequency"));
const AssessmentSummary = lazy(() => import("../Reports/subPages/AssessmentSummary"));
const StandardsBasedReport = lazy(() => import("../StandardsBasedReport"));
const ManageClass = lazy(() => import("../ManageClass"));
// eslint-disable-next-line react/prop-types
const Author = ({ match, history, isSidebarCollapsed }) => {
  const isPickQuestion = !!history.location.pathname.includes("pickup-questiontype");
  const isCollapsed = isPickQuestion || isSidebarCollapsed;
  return (
    <StyledLayout>
      <MainContainer isCollapsed={isCollapsed}>
        <SidebarCompnent />
        <Wrapper>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route exact path={`${match.url}/assignments`} component={Assignments} />
              <Route
                exact
                path={`${match.url}/assignments/regrade/new/:newTestId/old/:oldTestId`}
                component={Regrade}
              />
              <Route exact path={`${match.url}/assessments/create`} component={AssessmentCreate} />
              <Route exact path={`${match.url}/assessments/:assessmentId`} component={AssessmentPage} />
              <Route exact path={`${match.url}/classboard/:assignmentId/:classId`} component={ClassBoard} />
              <Route exact path={`${match.url}/classresponses/:testActivityId`} component={ClassResponses} />
              <Route exact path={`${match.url}/manageClass`} component={ManageClass} />
              <Route
                exact
                path={`${match.url}/expressgrader/:assignmentId/:classId/:testActivityId`}
                component={ExpressGrader}
              />
              <Route
                exact
                path={`${match.url}/standardsBasedReport/:assignmentId/:classId`}
                component={StandardsBasedReport}
              />
              <Route exact path={`${match.url}/items`} component={ItemList} />
              <Route exact path={`${match.url}/items/:id/item-detail`} component={ItemDetail} />
              <Route exact path="/author/curriculum-sequence" component={CurriculumContainer} />
              <Route exact path="/author/add-item" component={ItemAdd} />
              <Route
                exact
                path={`${match.url}/tests`}
                render={props => (
                  <Suspense fallback={<Progress />}>
                    <TestList {...props} />
                  </Suspense>
                )}
              />
              <Route
                exacts
                path="/author/tests/create"
                render={props => (
                  <Suspense fallback={<Progress />}>
                    <TestPage {...props} />
                  </Suspense>
                )}
              />
              <Route
                exact
                path="/author/tests/:id"
                render={props => (
                  <Suspense fallback={<Progress />}>
                    <TestPage {...props} />
                  </Suspense>
                )}
              />
              <Route
                exact
                path="/author/tests/:id/editAssigned"
                render={props => (
                  <Suspense fallback={<Progress />}>
                    <TestPage {...props} editAssigned />
                  </Suspense>
                )}
              />
              <Route
                exact
                path="/author/tests/limit/:limit/page/:page/:filter?"
                render={props => (
                  <Suspense fallback={<Progress />}>
                    <TestList {...props} />
                  </Suspense>
                )}
              />
              <Route exact path="/author/items/:id/pickup-questiontype" component={PickUpQuestionType} />
              <Route exact path="/author/questions/create" component={QuestionEditor} />
              <Route exact path="/author/questions/edit" component={QuestionEditor} />
              <Route exact path="/author/reports/" component={Reports} />
              <Route exact path="/author/reports/response-frequency/test/:testId" component={ResponseFrequency} />
              <Route exact path="/author/reports/assessment-summary/test/:testId" component={AssessmentSummary} />
            </Switch>
          </Suspense>
        </Wrapper>
      </MainContainer>
    </StyledLayout>
  );
};

export default connect(({ authorUi }) => ({
  isSidebarCollapsed: authorUi.isSidebarCollapsed
}))(Author);

Author.propTypes = {
  match: PropTypes.object.isRequired
};

const MainContainer = styled.div`
  padding-left: ${props => (props.isCollapsed ? "100px" : "240px")};
  width: 100%;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    left: ${props => (props.isCollapsed ? "100px" : "240px")};
    z-index: 999;
  }
  @media (max-width: ${tabletWidth}) {
    padding-left: 0px;
    .fixed-header {
      left: 0;
      background: #0188d2;
    }
  }
`;
const SidebarCompnent = styled(Sidebar)`
  @media (max-width: ${tabletWidth}) {
    display: none;
  }
`;
const Wrapper = styled.div`
  position: relative;
`;

const StyledLayout = styled(Layout)`
  background: ${mainBgColor};
`;
