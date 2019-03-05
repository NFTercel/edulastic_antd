import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";

const ClassCard = ({ t }) => (
  <Col xs={24} md={12} lg={8} xxl={6}>
    <ManageClassCardContent>
      <CardHeader type="flex" justify="space-between" align="middle">
        <CardTitle title="Class Name">Class Name</CardTitle>
        <VisitClassButton>{t("common.visitClass")}</VisitClassButton>
      </CardHeader>
      <CardBody>
        <Col span={24}>
          <InfoLabel span={8}>Status</InfoLabel>
          <InfoContent span={16}>
            <span>{t("common.active")}</span>
          </InfoContent>
        </Col>
        <Col span={24}>
          <InfoLabel span={8}>{t("common.instructor")}</InfoLabel>
          <InfoContent span={16}>Brenda Hill</InfoContent>
        </Col>
        <Col span={24}>
          <InfoLabel span={8}>{t("common.grade")}</InfoLabel>
          <InfoContent span={16}>Grade 6</InfoContent>
        </Col>
        <Col span={24}>
          <InfoLabel span={8}>{t("common.subject")}</InfoLabel>
          <InfoContent span={16}>Mathematics</InfoContent>
        </Col>
        <Col span={24}>
          <InfoLabel span={8}>{t("common.standard")}</InfoLabel>
          <InfoContent span={16}>Math - Common Core</InfoContent>
        </Col>
        <Col span={24}>
          <InfoLabel span={8}>{t("common.startDate")}</InfoLabel>
          <InfoContent span={16}>Aug 29, 2018</InfoContent>
        </Col>
        <Col span={24}>
          <InfoLabel span={8}>{t("common.endDate")}</InfoLabel>
          <InfoContent span={16}>Sep 17, 2018</InfoContent>
        </Col>
      </CardBody>
    </ManageClassCardContent>
  </Col>
);

export default ClassCard;

ClassCard.propTypes = {
  t: PropTypes.func.isRequired
};

const ManageClassCardContent = styled.div`
  background: ${props => props.theme.classCard.cardBg};
  min-height: 270px;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CardHeader = styled(Row)`
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.classCard.cardHeaderBorderColor};
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.classCard.cardTitleTextSize};
  color: ${props => props.theme.classCard.cardTitleColor};
  font-weight: bold;
  margin: 0px;
  flex-basis: calc(100% - 120px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const VisitClassButton = styled(Button)`
  height: 24px;
  border-radius: 4px;
  background-color: ${props => props.theme.classCard.cardVisitClassBtnBgColor};
  text-transform: uppercase;
  padding: 0px 20px;
  font-size: ${props => props.theme.classCard.cardVisitClassBtnTextSize};
  color: ${props => props.theme.classCard.cardVisitClassBtnTextColor};
  border: 1px solid ${props => props.theme.classCard.cardVisitClassBtnBorderColor};
  font-weight: bold;
  &:hover {
    background-color: ${props => props.theme.classCard.cardVisitClassBtnBgHoverColor};
    color: ${props => props.theme.classCard.cardVisitClassBtnTextHoverColor};
  }
`;

const CardBody = styled(Row)`
  padding: 15px;
`;

const InfoLabel = styled(Col)`
  font-size: ${props => props.theme.classCard.cardUserInfoLabelTextSize};
  font-weight: 600;
  color: ${props => props.theme.classCard.cardUserInfoLabelColor};
  line-height: 25px;
`;

const InfoContent = styled(InfoLabel)`
  color: ${props => props.theme.classCard.cardUserInfoContentColor};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  span {
    border-radius: 5px;
    background-color: ${props => props.theme.classCard.cardActiveStatusBgColor};
    padding: 2px 25px;
    color: ${props => props.theme.classCard.cardActiveStatusTextColor};
    font-size: ${props => props.theme.classCard.cardActiveStatusTextSize};
  }
`;
