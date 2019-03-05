import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { IconManageClass } from "@edulastic/icons";
import { Row } from "antd";
import ClassCard from "./CardContainer";

const ManageClassContainer = ({ flag, t }) => (
  <ManageClassContentWrapper flag={flag}>
    <Row gutter={20}>
      <ClassCard t={t} />
    </Row>
    <NoDataWrapper>
      <IconManage />
      <NoDataHeading>{t("common.noClassesTitle")}</NoDataHeading>
      <NoDataSubText>{t("common.noClassesSubTitle")}</NoDataSubText>
    </NoDataWrapper>
  </ManageClassContentWrapper>
);

const enhance = compose(
  withNamespaces("manageClass"),
  React.memo
);

export default enhance(ManageClassContainer);

ManageClassContainer.propTypes = {
  flag: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

const ManageClassContentWrapper = styled.div`
  border-radius: 10px;
  z-index: 0;
  position: relative;
  @media (min-width: 1200px) {
    margin: 30px 30px;
  }
  @media (max-width: 1060px) {
    padding: 1.3rem 2rem 5rem 2rem;
  }
  @media (max-width: 480px) {
    padding: 1rem 1rem 0rem 1rem;
  }
`;

const NoDataWrapper = styled.div`
  background: ${props => props.theme.noData.NoDataBgColor};
  border: 2px solid ${props => props.theme.noData.NoDataBgBorderColor};
  padding: 0rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 60px 30px;
  text-align: center;
  margin-bottom: 1rem;
  @media screen and (max-width: 767px) {
    padding: 0px 15px;
  }
`;

const IconManage = styled(IconManageClass)`
  fill: #0eb08d !important;
  width: 60px;
  height: 80px;
`;

const NoDataHeading = styled.div`
  color: ${props => props.theme.noData.NoDataArchiveTextColor};
  font-size: ${props => props.theme.noData.NoDataArchiveTextSize};
  font-weight: 700;
  line-height: 3;
`;

const NoDataSubText = styled.div`
  font-size: ${props => props.theme.noData.NoDataArchiveSubTextSize};
  color: ${props => props.theme.noData.NoDataArchiveSubTextColor};
`;
