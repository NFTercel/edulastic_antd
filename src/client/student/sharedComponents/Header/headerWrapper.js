import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Affix, Layout, Row, Col } from "antd";

const HeaderWrapper = ({ children, isSidebarCollapsed }) => (
  <HeaderContainer>
    <FixedHeader iscollapsed={isSidebarCollapsed}>
      <AssignmentsHeader>
        <HeaderRow>
          <Col span={24}>
            <Wrapper>{children}</Wrapper>
          </Col>
        </HeaderRow>
      </AssignmentsHeader>
    </FixedHeader>
  </HeaderContainer>
);

HeaderWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired
};

export default connect(({ ui }) => ({
  isSidebarCollapsed: ui.isSidebarCollapsed
}))(HeaderWrapper);

const HeaderContainer = styled.div`
  padding-top: 62px;
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    padding-top: 95px;
  }
`;

const FixedHeader = styled(Affix)`
  top: 0;
  right: 0;
  position: fixed;
  z-index: 2;
  left: ${props => (props.iscollapsed ? "100px" : "240px")};
  @media (max-width: 768px) {
    left: 0;
    padding-left: 30px;
    background: ${props => props.theme.headerBgColor};
  }
`;

const AssignmentsHeader = styled(Layout.Header)`
  background-color: ${props => props.theme.headerBgColor};
  color: ${props => props.theme.headerTitleTextColor};
  display: flex;
  align-items: center;
  height: 62px;
  padding: 0px 15px;
  @media screen and (max-width: 768px) {
    height: 104px;
    padding: 0;
  }
  .ant-col-24 {
    align-items: center;
    line-height: 1.2;
    display: flex;
  }
`;

const HeaderRow = styled(Row)`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
