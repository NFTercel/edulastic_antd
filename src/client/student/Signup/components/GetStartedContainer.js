import React from "react";
import { Row, Col, Form } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";

import loginBg from "../../assets/bg-login.png";
import studentBg from "../../assets/small-bg-student.png";
import teacherBg from "../../assets/small-bg-teacher.png";
import adminBg from "../../assets/small-bg-adm.png";

const GetStarted = ({ t }) => (
  <RegistrationWrapper>
    <RegistrationHeader type="flex" align="middle">
      <Col span={12}>
        <img src="//cdn.edulastic.com/JS/webresources/images/as/as-dashboard-logo.png" alt="Edulastic" />
      </Col>
      <Col span={12} align="right">
        <span>{t("component.signup.alreadyhaveanaccount")}</span>
        <Link to="/login">{t("common.signinbtn")}</Link>
      </Col>
    </RegistrationHeader>
    <RegistrationBody type="flex" align="middle">
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 18, offset: 3 }}
        lg={{ span: 12, offset: 6 }}
      >
        <Row>
          <BannerText xs={24}>
            <h1>{t("component.signup.getstarted.getstartedtext")}</h1>
            <h4>
              {t("component.signup.getstarted.subtext")} <br /> {t("component.signup.getstarted.subtext2")}
            </h4>
          </BannerText>
        </Row>
        <ChooseSignupBox>
          <h3>{t("component.signup.getstarted.createaccount")}</h3>
          <StudentSignupBox data-cy="student" to="/studentsignup" xs={24} sm={8}>
            <span>{t("component.signup.getstarted.imstudent")}</span>
          </StudentSignupBox>
          <TeacherSignupBox to="/signup" xs={24} sm={8}>
            <span>{t("component.signup.getstarted.imteacher")}</span>
          </TeacherSignupBox>
          <AdminSignupBox to="/adminsignup" xs={24} sm={8}>
            <span>{t("component.signup.getstarted.imadmin")}</span>
          </AdminSignupBox>
        </ChooseSignupBox>
      </Col>
    </RegistrationBody>
    <Copyright>
      <Col span={24}>{t("common.copyright")}</Col>
    </Copyright>
  </RegistrationWrapper>
);

GetStarted.propTypes = {
  t: PropTypes.func.isRequired
};

const ChooseSignup = Form.create()(GetStarted);

const enhance = compose(withNamespaces("login"));

export default enhance(ChooseSignup);

const RegistrationWrapper = styled.div`
  background: #999999 url(${loginBg});
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0px;
  padding: 0px;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

const RegistrationHeader = styled(Row)`
  padding: 10px 15px;
  color: white;
  span {
    font-size: 12px;
    margin-right: 20px;
  }
  a {
    padding: 5px 40px;
    border: 1px solid #2d84dc;
    text-decoration: none;
    color: white;
    border-radius: 4px;
  }
`;

const RegistrationBody = styled(Row)`
  min-height: calc(100vh - 120px);
`;

const BannerText = styled(Col)`
  text-align: center;
  h1 {
    color: white;
    font-size: 42px;
    line-height: 1.3;
    letter-spacing: -2px;
    font-weight: 700;
    margin-top: 0px;
    margin-bottom: 15px;
  }
  h4 {
    color: white;
    line-height: 1.7;
    font-size: 13px;
  }
`;

const ChooseSignupBox = styled(Row)`
  background: white;
  width: 510px;
  margin: 0px auto;
  border-radius: 7px 7px 0px 0px;
  text-align: center;
  h3 {
    font-size: 14px;
    font-weight: 600;
    color: #444444;
    margin: 0px;
    padding: 10px 0px;
  }
  a {
    color: white;
  }
`;

const StudentSignupBox = styled(Link)`
  background: #999999 url(${studentBg});
  background-position: top center;
  background-size: 102% 102%;
  background-repeat: no-repeat;
  width: calc(100% / 3);
  height: 250px;
  float: left;
  position: relative;
  text-align: center;
  overflow: hidden;
  span {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
  }
`;

const TeacherSignupBox = styled(StudentSignupBox)`
  background: #999999 url(${teacherBg});
  background-position: top center;
  background-size: 102% 102%;
  background-repeat: no-repeat;
`;

const AdminSignupBox = styled(StudentSignupBox)`
  background: #999999 url(${adminBg});
  background-position: top center;
  background-size: 102% 102%;
  background-repeat: no-repeat;
`;

const Copyright = styled(Row)`
  font-size: 10px;
  color: #dddddd;
  text-align: center;
  margin: 25px 0px 10px;
`;
