import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Affix, Layout, Row, Col } from "antd";
import { IconLogout } from "@edulastic/icons";

import { LogoCompact } from "../../../assessment/themes/common";

const SummaryHeader = ({ showConfirmationModal }) => (
  <Affix>
    <AssignmentsHeader>
      <HeaderRow>
        <HeaderCol span={24}>
          <Wrapper>
            <LogoCompact />
          </Wrapper>
          <LogoutIcon onClick={showConfirmationModal} />
        </HeaderCol>
      </HeaderRow>
    </AssignmentsHeader>
  </Affix>
);

SummaryHeader.propTypes = {
  showConfirmationModal: PropTypes.func.isRequired
};

export default memo(SummaryHeader);

const AssignmentsHeader = styled(Layout.Header)`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.attemptReview.headerBgColor};
  height: 62px;
  color: ${props => props.theme.attemptReview.headerTextColor};
  padding: 0 40px;

  .ant-col-24 {
    align-items: center;
    line-height: 1.2;
    display: flex;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
`;

const HeaderRow = styled(Row)`
  width: 100%;
`;

const HeaderCol = styled(Col)`
  display: flex;
`;

const LogoutIcon = styled(IconLogout)`
  fill: ${props => props.theme.attemptReview.logoutIconColor};
  width: 24px;
  height: 24px;
  &:hover {
    fill: ${props => props.theme.attemptReview.logoutIconHoverColor};
  }
`;
