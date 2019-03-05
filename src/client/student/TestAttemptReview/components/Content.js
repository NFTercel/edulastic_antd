import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import { Row, Col, Button } from "antd";
import { themes } from "../../themes";

import Confirmation from "./Confirmation";
import { attemptSummarySelector } from "../ducks";

class SummaryTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonIdx: null,
      isShowConfirmationModal: false
    };
  }

  handlerButton = buttonIdx => {
    this.setState({ buttonIdx });
  };

  handlerConfirmationModal = () => {
    this.setState(prevState => ({
      isShowConfirmationModal: !prevState.isShowConfirmationModal
    }));
  };

  closeConfirmationModal = () => {
    this.setState({ isShowConfirmationModal: false });
  };

  render() {
    const { questionList, t } = this.props;
    const questions = Object.keys(questionList);
    const { finishTest } = this.props;
    const { buttonIdx, isShowConfirmationModal } = this.state;
    return (
      <ThemeProvider theme={themes.default}>
        <AssignmentContentWrapperSummary>
          <Confirmation
            isVisible={isShowConfirmationModal}
            onClose={this.closeConfirmationModal}
            finishTest={finishTest}
          />
          <Container>
            <Header>
              <Title>{t("common.headingText")}</Title>
              <TitleDescription>{t("common.message")}</TitleDescription>
            </Header>
            <MainContent>
              <ColorDescription>
                <ColorDescriptionRow gutter={32}>
                  <FlexCol lg={8} md={24}>
                    <GreenMark />
                    <SpaceLeft>
                      <Description>{t("common.markedQuestionLineOne")}</Description>
                      <Description style={{ marginTop: -2 }}>{t("common.markedQuestionLineTwo")}</Description>
                    </SpaceLeft>
                  </FlexCol>
                  <FlexCol lg={8} md={24}>
                    <GrayMark />
                    <SpaceLeft>
                      <Description>{t("common.skippedQues")}</Description>
                    </SpaceLeft>
                  </FlexCol>
                  <FlexCol lg={8} md={24}>
                    <RedMark />
                    <SpaceLeft>
                      <Description>{t("common.markedForReview")}</Description>
                      <Description style={{ marginTop: -2 }}>{t("common.markedQuestionLineTwo")}</Description>
                    </SpaceLeft>
                  </FlexCol>
                </ColorDescriptionRow>
              </ColorDescription>
              <Questions>
                <Row>
                  <QuestionText lg={8} md={24}>
                    {t("common.questionsLabel")}
                  </QuestionText>
                  <Col lg={16} md={24}>
                    <AnsweredTypeButtonContainer>
                      <StyledButton onClick={() => this.handlerButton(null)} enabled={buttonIdx === null}>
                        {t("default:all")}
                      </StyledButton>
                      <StyledButton onClick={() => this.handlerButton(2)} enabled={buttonIdx === 2}>
                        {t("default:flagged")}
                      </StyledButton>
                      <StyledButton onClick={() => this.handlerButton(0)} enabled={buttonIdx === 0}>
                        {t("default:skipped")}
                      </StyledButton>
                    </AnsweredTypeButtonContainer>
                  </Col>
                </Row>
                <QuestionBlock>
                  {questions.map((q, index) => (
                    <QuestionColorBlock
                      type={questionList[q]}
                      isVisible={buttonIdx === null || buttonIdx === questionList[q]}
                    >
                      <span> {index + 1} </span>
                    </QuestionColorBlock>
                  ))}
                </QuestionBlock>
              </Questions>
            </MainContent>
            <Footer>
              <ShortDescription>{t("common.nextStep")}</ShortDescription>
              <SubmitButton type="primary" onClick={this.handlerConfirmationModal}>
                {t("default:submit")}
              </SubmitButton>
            </Footer>
          </Container>
        </AssignmentContentWrapperSummary>
      </ThemeProvider>
    );
  }
}

SummaryTest.propTypes = {
  finishTest: PropTypes.func.isRequired,
  questionList: PropTypes.array,
  t: PropTypes.func.isRequired
};

SummaryTest.defaultProps = {
  questionList: []
};

const enhance = compose(
  withNamespaces(["summary", "default"]),
  connect(state => ({
    questionList: attemptSummarySelector(state)
  }))
);

export default enhance(SummaryTest);

const AssignmentContentWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 5px 30px;
  background: ${props => props.theme.assignment.cardContainerBgColor};
  margin-bottom: 1rem;
  @media screen and (max-width: 767px) {
    padding: 0px 15px;
  }
`;

const AssignmentContentWrapperSummary = styled(AssignmentContentWrapper)`
  margin: 24px 95px;
  @media screen and (max-width: 992px) {
    margin: 15px 26px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled(Container)`
  max-width: 531px;
  margin-top: 52px;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Title = styled.div`
  font-size: ${props => props.theme.attemptReview.headingTextSize};
  color: ${props => props.theme.attemptReview.headingColor};
  font-weight: bold;
  letter-spacing: -1px;
  text-align: center;
`;

const TitleDescription = styled.div`
  font-size: ${props => props.theme.attemptReview.titleDescriptionTextSize};
  color: ${props => props.theme.attemptReview.titleDescriptionTextColor};
  margin-top: 13px;
  font-weight: 600;
  text-align: center;
`;

const MainContent = styled.div`
  margin-top: 22.5px;
  width: 100%;
  border-top: 1px solid #f2f2f2;
  padding-top: 38px;
  @media screen and (max-width: 768px) {
    padding-top: 20px;
  }
`;

const ColorDescription = styled.div`
  display: flex;
  justify-content: center;
`;

const Markers = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 2px;
  flex-shrink: 0;
`;
const GreenMark = styled(Markers)`
  background-color: ${props => props.theme.attemptReview.greenMarkBgColor};
`;

const GrayMark = styled(Markers)`
  background-color: ${props => props.theme.attemptReview.grayMarkBgColor};
`;

const RedMark = styled(Markers)`
  background-color: ${props => props.theme.attemptReview.redMarkBgColor};
`;

const Description = styled.div`
  font-size: ${props => props.theme.attemptReview.descriptionTextSize};
  color: ${props => props.theme.attemptReview.descriptionTextColor};
  font-weight: 600;
`;

const ColorDescriptionRow = styled(Row)`
  width: 100%;
`;

const FlexCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const SpaceLeft = styled.div`
  margin-left: 22px;
`;

const Questions = styled.div`
  margin-top: 60px;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;

const QuestionText = styled(Col)`
  font-size: ${props => props.theme.attemptReview.questiontextSize};
  color: ${props => props.theme.attemptReview.questiontextColor};
  font-weight: bold;
`;

const AnsweredTypeButtonContainer = styled.div`
  @media screen and (min-width: 992px) {
    float: right;
    padding-left: 20px;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    padding-left: 10px;
  }
`;

const StyledButton = styled(Button)`
  height: 24px;
  float: left;
  color: ${props => (props.enabled ? "#fff" : "#00b0ff")};
  border: 1px solid #00b0ff;
  border-radius: 4px;
  margin-right: 20px;
  min-width: 85px;
  background: ${props => (props.enabled ? "#00b0ff" : "transparent")};
  &:focus,
  &:active {
    color: ${props => (props.enabled ? "#fff" : "#00b0ff")};
    background: ${props => (props.enabled ? "#00b0ff" : "transparent")};
  }
  span {
    font-size: 10px;
    font-weight: 600;
  }
  @media screen and (max-width: 992px) {
    margin-top: 20px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 10px;
  }
`;

const QuestionBlock = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 30px;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
    justify-content: center;
    padding-left: 20px;
  }
`;

const QuestionColorBlock = styled.div`
  width: 60px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => (props.type === 2 ? "#ee1658" : props.type === 1 ? "#1fe3a1" : "#b1b1b1")};
  margin-right: 23px;
  display: ${props => (props.isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  margin-top: 5px;

  span {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.3px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 20px;
  }
`;

const Footer = styled(Container)`
  margin-top: 186px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
    text-align: center;
  }
`;

const ShortDescription = styled.div`
  font-size: 12px;
  color: #1e1e1e;
`;

const SubmitButton = styled(Button)`
  margin: 62px 0px;
  width: 200px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => props.theme.attemptReview.submitButtonBgColor};
  span {
    font-size: ${props => props.theme.attemptReview.submitButtonTextSize};
    color: ${props => props.theme.attemptReview.submitButtonTextColor};
    font-weight: 600;
    letter-spacing: 0.2px;
  }
  @media screen and (max-width: 768px) {
    margin: 20px 0px;
  }
`;
