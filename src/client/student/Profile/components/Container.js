import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Layout, Form, Input, Button } from "antd";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";

import ProfileImage from "../../assets/Profile.png";
import cameraIcon from "../../assets/photo-camera.svg";

const FormItem = Form.Item;
class ProfileContainer extends React.Component {
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
      form: { getFieldDecorator }
    } = this.props;

    const { flag, t, user } = this.props;
    return (
      <LayoutContent flag={flag}>
        <Wrapper>
          <ProfileContentWrapper>
            <UserDetail>
              <UserTitle>Welcome {user.firstName || "Zack"}</UserTitle>
              <UserSubTitle>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget mauris nunc.
              </UserSubTitle>
            </UserDetail>
            <ProfileImgWrapper>
              <div />
              <span>
                <img src={cameraIcon} alt="" />
              </span>
            </ProfileImgWrapper>
            <FormWrapper onSubmit={this.handleSubmit}>
              <FormItemWrapper>
                <label>{t("common.title.firstNameInputLabel")}</label>
                {getFieldDecorator("First Name", {
                  rules: [
                    {
                      required: true,
                      message: t("common.title.firstName")
                    }
                  ],
                  initialValue: `${user.firstName}`
                })(<Input readOnly />)}
              </FormItemWrapper>
              <FormItemWrapper>
                <label>{t("common.title.lastNameInputLabel")}</label>
                {getFieldDecorator("Last Name", {
                  rules: [
                    {
                      required: true,
                      message: t("common.title.lastName")
                    }
                  ],
                  initialValue: `${user.lastName || ""}`
                })(<Input readOnly />)}
              </FormItemWrapper>
              <FormItemWrapper>
                <label>{t("common.title.emailInputLabel")}</label>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: t("common.title.validemail")
                    },
                    {
                      required: true,
                      message: t("common.title.email")
                    }
                  ],
                  initialValue: `${user.email}`
                })(<Input type="email" readOnly />)}
              </FormItemWrapper>
              <FormItemWrapper>
                <label>{t("common.title.passwordInputLabel")}</label>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: t("common.title.password")
                    }
                  ]
                })(<Input type="password" readOnly />)}
              </FormItemWrapper>{" "}
              <FormButtonWrapper>
                <FormItem>
                  <CancelButton disabled type="primary" ghost htmlType="submit">
                    {t("common.title.cancel")}
                  </CancelButton>
                  <SaveButton disabled type="primary" htmlType="submit">
                    {t("common.title.save")}
                  </SaveButton>
                </FormItem>
              </FormButtonWrapper>
            </FormWrapper>
          </ProfileContentWrapper>
        </Wrapper>
      </LayoutContent>
    );
  }
}

const enhance = compose(
  React.memo,
  withNamespaces("profile"),
  Form.create(),
  connect(state => ({
    flag: state.ui.flag,
    user: state.user.user
  }))
);

export default enhance(ProfileContainer);

ProfileContainer.propTypes = {
  flag: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const LayoutContent = styled(Layout.Content)`
  min-height: 100vh;
  width: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: 30px 30px;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.assignment.cardContainerBgColor};
  padding: 20px 30px;
  position: relative;
  @media screen and (max-width: 1300px) {
    padding: 15px;
  }

  @media screen and (max-width: 767px) {
    padding: 5px 30px;
  }
`;

const ProfileContentWrapper = styled.div`
  text-align: center;
`;

const UserDetail = styled.div`
  padding: 0.5rem 0rem 1.5rem;
  border-bottom: 1px solid #f2f2f2;
`;

const UserTitle = styled.h2`
  color: ${props => props.theme.profile.userHeadingTextColor};
  font-size: ${props => props.theme.profile.userHeadingTextSize};
  font-weight: ${props => props.theme.profile.userHeadingTextWeight};
  margin-bottom: 5px;
`;

const UserSubTitle = styled.p`
  color: ${props => props.theme.profile.userSubTitleTextColor};
  font-size: ${props => props.theme.profile.userSubTitleTextSize};
`;

const ProfileImgWrapper = styled.div`
  margin: 40px auto;
  max-width: 140px;
  max-height: 140px;
  position: relative;
  div {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    background: url(${ProfileImage}) no-repeat;
    background-size: cover;
    background-position: center center;
  }
  span {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    position: absolute;
    right: 5px;
    bottom: 5px;
    background: ${props => props.theme.profile.uploadIconBgColor};
    line-height: 30px;
    cursor: pointer;
    img {
      width: 17px;
    }
  }
`;

const FormWrapper = styled(Form)`
  width: 70%
  margin: 0px auto;
  text-align: left;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

const FormItemWrapper = styled(FormItem)`
  width: 50%;
  display: inline-block;
  padding: 0px 10px;
  @media (max-width: 425px) {
    width: 100%;
    display: block;
  }
  label {
    font-size: ${props => props.theme.profile.formInputLabelSize};
    color: ${props => props.theme.profile.formInputLabelColor};
    font-weight: 600;
  }
  .ant-form-explain {
    font-size: 12px;
  }
`;

const FormButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const SaveButton = styled(Button)`
  width: 150px;
  margin: 0px 10px;
  background: ${props => props.theme.profile.saveButtonBgColor};
  border-color: ${props => props.theme.profile.saveButtonBorderColor};
  font-size: ${props => props.theme.profile.saveButtonTextSize};
  color: ${props => props.theme.profile.saveButtonTextColor};
  text-transform: uppercase;
`;

const CancelButton = styled(SaveButton)`
  background: ${props => props.theme.profile.cancelButtonBgColor};
  color: ${props => props.theme.profile.cancelButtonTextColor};
`;
