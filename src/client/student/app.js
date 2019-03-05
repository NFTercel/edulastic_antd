import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import { connect } from "react-redux";
import { themes } from "./themes";

import Sidebar from "./Sidebar/SideMenu";
import { Assignment } from "./Assignments";
import { Report } from "./Reports";
//TODO
import { ReportList } from "./TestAcitivityReport";
import { Profile } from "./Profile";

import { ManageClass } from "./ManageClass";
import SkillReportContainer from "./SkillReport";

const StudentApp = ({ match, isSidebarCollapsed }) => (
  <ThemeProvider theme={themes.default}>
    <Layout>
      <MainContainer isCollapsed={isSidebarCollapsed}>
        <Sidebar />
        <Wrapper>
          <Switch>
            <Route path={`${match.url}/assignments`} component={Assignment} />
            <Route path={`${match.url}/reports`} component={Report} />
            <Route path={`${match.url}/skill-report`} component={SkillReportContainer} />
            <Route path={`${match.url}/manage`} component={ManageClass} />
            <Route path={`${match.url}/profile`} component={Profile} />
            {/*TODO*/}
            <Route path={`${match.url}/testActivityReport/:id`} component={ReportList} />
          </Switch>
        </Wrapper>
      </MainContainer>
    </Layout>
  </ThemeProvider>
);

export default connect(({ ui }) => ({
  isSidebarCollapsed: ui.isSidebarCollapsed
}))(StudentApp);

StudentApp.propTypes = {
  match: PropTypes.object.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired
};

const MainContainer = styled.div`
  padding-left: ${props => (props.isCollapsed ? "100px" : "240px")};
  width: 100%;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    left: ${props => (props.isCollapsed ? "100px" : "240px")};
    z-index: 1;
  }
  @media (max-width: 768px) {
    padding-left: 0px;
    .fixed-header {
      left: 0;
      padding-left: 30px;
      background: #0188d2;
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
`;
