import React from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import styled from "styled-components";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { connect } from "react-redux";
import { loginAction } from "../ducks";

import mailIcon from "../../assets/mail-icon.svg";
import keyIcon from "../../assets/key-icon.svg";
import googleIcon from "../../assets/google-btn.svg";
import icon365 from "../../assets/icons8-office-365.svg";
import cleverIcon from "../../assets/clever-icon.svg";

const FormItem = Form.Item;

class LoginContainer extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    const { form, login } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, { password, email }) => {
      if (!err) {
        login({
          password,
          email
        });
      }
    });
  };

  handleConfirmBlur = ({ target: { value } }) => {
    let { confirmDirty } = this.state;
    confirmDirty = confirmDirty || !!value;
    this.setState({ confirmDirty });
  };

  render() {
    const {
      form: { getFieldDecorator },
      t
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 }
      },
      wrapperCol: {
        xs: { span: 24 }
      }
    };

    return (
      <LoginContentWrapper>
        <RegistrationBody>
          <Col xs={18} sm={12} md={9} lg={8} xl={7} offset={3}>
            <FormWrapper>
              <FormHead>
                <h3 align="center">
                  <b>{t("common.loginboxheading")}</b>
                </h3>
                <ThirdPartyLoginBtn span={20} offset={2}>
                  <img src={googleIcon} alt="" /> {t("common.googlesigninbtn")}
                </ThirdPartyLoginBtn>
                <ThirdPartyLoginBtn span={20} offset={2}>
                  <img src={icon365} alt="" /> {t("common.office365signinbtn")}
                </ThirdPartyLoginBtn>
                <ThirdPartyLoginBtn span={20} offset={2}>
                  <img src={cleverIcon} alt="" /> {t("common.cleversigninbtn")}
                </ThirdPartyLoginBtn>
              </FormHead>
              <FormBody>
                <Col span={20} offset={2}>
                  <h5 align="center">{t("common.formboxheading")}</h5>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label={t("common.loginidinputlabel")}>
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            type: "email",
                            message: t("common.validation.validemail")
                          },
                          {
                            required: true,
                            message: t("common.validation.emptyemailid")
                          }
                        ]
                      })(<Input data-cy="email" prefix={<img src={mailIcon} alt="" />} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={t("common.loginpasswordinputlabel")}>
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: t("common.validation.emptypassword")
                          }
                        ]
                      })(<Input data-cy="password" prefix={<img src={keyIcon} alt="" />} type="password" />)}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true
                      })(<Checkbox>{t("common.remembermetext")}</Checkbox>)}
                      <ForgetPassword href="#" style={{ marginTop: 1 }}>
                        {t("common.forgotpasswordtext")}
                      </ForgetPassword>
                      <LoginButton data-cy="login" type="primary" htmlType="submit">
                        {t("common.signinbtn")}
                      </LoginButton>
                    </FormItem>
                  </Form>
                </Col>
              </FormBody>
            </FormWrapper>
          </Col>
        </RegistrationBody>
        <Copyright>
          <Col span={24}>{t("common.copyright")}</Col>
        </Copyright>
      </LoginContentWrapper>
    );
  }
}

const LoginForm = Form.create()(LoginContainer);

const enhance = compose(
  withNamespaces("login"),
  connect(
    null,
    { login: loginAction }
  )
);

export default enhance(LoginForm);

const LoginContentWrapper = styled.div``;

const RegistrationBody = styled(Row)`
  padding-top: 30px;
`;

const Copyright = styled(Row)`
  font-size: 10px;
  color: #dddddd;
  text-align: center;
  margin: 25px 0px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const FormWrapper = styled.div`
  background: white;
  overflow: hidden;
  border-radius: 8px;
`;

const FormHead = styled(Row)`
  background: #157ad8;
  background: -moz-linear-gradient(left, #157ad8 0%, #157ad8 19%, #36a0e2 54%, #36a0e2 100%);
  background: -webkit-linear-gradient(left, #157ad8 0%, #157ad8 19%, #36a0e2 54%, #36a0e2 100%);
  background: linear-gradient(to right, #157ad8 0%, #157ad8 19%, #36a0e2 54%, #36a0e2 100%);
  padding: 15px;
  h3 {
    color: white;
    margin: 5px 0px 15px;
  }
`;

const ThirdPartyLoginBtn = styled(Col)`
  background: #ffffff;
  margin-top: 5px;
  border-radius: 4px;
  text-align: center;
  font-size: 10px;
  padding: 8px;
  cursor: pointer;
  img {
    float: left;
    width: 14px;
  }
`;

const FormBody = styled(Row)`
    padding: 15px;
    h5 {
      margin-bottom: 20px;
      margin-top: 5px;
      font-size: 13px;
    }
    form {
      .ant-form-item {
        margin-bottom: 10px;
      }
      .ant-form-item-label {
        text-align: left;
        line-height: normal;
        margin-bottom: 3px;
        label {
          font-size: 12px;
          &.ant-form-item-required {
            &:before, &:after {
              content: '';
            }
          }
        }
      }
      .ant-input:focus {
        border: 1px solid #1fb58b;
      }
      .has-error {
        .ant-form-explain, .ant-form-split { font-size: 10px; }
      }
      .ant-form-item-children {
        width: 100%;
        float: left;
        label, a {
          line-height: normal;
          font-size: 10px;
        }
        label { float: left; }
      }
    }
    .ant-input-affix-wrapper .ant-input-prefix {
      width: 15px;
    }
  }
`;

const ForgetPassword = styled("a")`
  float: right;
`;

const LoginButton = styled(Button)`
  width: 100%;
  background: #1fb58b;
  font-size: 13px;
  color: white;
  border: 1px solid #1fb58b;
  font-weight: 600;
`;
