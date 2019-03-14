import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Anchor, Input, Row, Col, Radio, Switch, List, Button, Select } from "antd";
import { Paper } from "@edulastic/common";
import { test } from "@edulastic/constants";
import ListCard from "../Card/Card";
import UiTime from "../UiTime/UiTime";

import { setMaxAttemptsAction } from "../../ducks";
import { setTestDataAction, getTestEntitySelector } from "../../../../ducks";

import {
  StyledAnchor,
  RadioGroup,
  InputTitle,
  Body,
  Title,
  Block,
  AdvancedButton,
  AdvancedSettings,
  BandsText,
  BlueText,
  Description,
  FlexBody,
  Line,
  NormalText,
  StyledRadioGroup,
  RadioWrapper,
  TestTypeSelect,
  GenerateReportSelect
} from "./styled";

const {
  settingCategories,
  performanceBandsData,
  type,
  navigations,
  completionTypes,
  calculators,
  evalTypes,
  accessibilities,
  releaseGradeTypes,
  releaseGradeLabels
} = test;

const { Option } = Select;

const { ASSESSMENT, PRACTICE } = type;

const testTypes = {
  [ASSESSMENT]: "Asessment",
  [PRACTICE]: "Practice"
};

const releaseGradeKeys = ["DONT_RELEASE", "SCORE_ONLY", "WITH_RESPONSE", "WITH_ANSWERS"];
const generateReportTypes = {
  YES: {
    val: "Yes",
    type: true
  },
  NO: {
    val: "No",
    type: false
  }
};
class MainSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markAsDoneValue: props.entity.markAsDoneValue,
      calcType: props.entity.calcType,
      evalType: props.entity.evalType,
      enable: true,
      showAdvancedOption: false
    };
  }

  enableHandler = e => {
    this.setState({ enable: e.target.value });
  };

  advancedHandler = () => {
    const { showAdvancedOption } = this.state;
    this.setState({ showAdvancedOption: !showAdvancedOption });
  };

  updateAttempt = e => {
    const { setMaxAttempts } = this.props;
    setMaxAttempts(e.target.value);
  };

  updateTestData = key => value => {
    const { setTestData, setMaxAttempts } = this.props;
    if (key === "testType") {
      if (value === ASSESSMENT) {
        setMaxAttempts(1);
        setTestData({
          releaseScore: releaseGradeLabels.DONT_RELEASE
        });
        setTestData({ generateReport: true });
      } else {
        setMaxAttempts(3);
        setTestData({
          releaseScore: releaseGradeLabels.WITH_ANSWERS
        });
        setTestData({ generateReport: false });
      }
    }
    setTestData({
      [key]: value
    });
  };

  updateFeatures = key => e => {
    const { setTestData } = this.props;
    const featVal = e.target.value;
    this.setState({ [key]: featVal });
    setTestData({
      [key]: featVal
    });
  };

  onPerformanceBandUpdate = item => {
    const { setTestData, entity = {} } = this.props;
    const { performanceBands } = entity;
    const newPerformanceBands = {
      ...performanceBands,
      [item]: {
        ...performanceBands[item],
        isAbove: !performanceBands[item].isAbove
      }
    };
    setTestData({
      performanceBands: newPerformanceBands
    });
  };

  render() {
    const { markAsDoneValue, calcType, evalType, enable, showAdvancedOption } = this.state;
    const { history, windowWidth, entity } = this.props;

    const {
      releaseScore,
      maxAttempts,
      safeBrowser,
      shuffleQuestions,
      shuffleAnswers,
      answerOnPaper,
      requirePassword,
      testType,
      generateReport
    } = entity;

    const isSmallSize = windowWidth > 993 ? 1 : 0;
    return (
      <Paper style={{ marginTop: 27 }}>
        <Row style={{ padding: windowWidth < 468 && "25px" }}>
          <Col span={isSmallSize ? 6 : 0}>
            <StyledAnchor affix={false}>
              {settingCategories.map(category => (
                <Anchor.Link
                  key={category.id}
                  href={`${history.location.pathname}#${category.id}`}
                  title={category.title}
                />
              ))}
            </StyledAnchor>
          </Col>
          <Col span={isSmallSize ? 18 : 24}>
            <Block id="test-type">
              <Row>
                <Col span={12}>
                  <Title>Test Type</Title>
                  <Body />
                  <Description>
                    <TestTypeSelect defaultValue={testType} onChange={this.updateTestData("testType")}>
                      {Object.keys(testTypes).map(key => (
                        <Option key={key} value={key}>
                          {testTypes[key]}
                        </Option>
                      ))}
                    </TestTypeSelect>
                  </Description>
                </Col>
                <Col span={12}>
                  {testType === PRACTICE && (
                    <React.Fragment>
                      {" "}
                      <Title>Generate Report </Title>
                      <Body>
                        <GenerateReportSelect
                          defaultValue={generateReport}
                          onChange={this.updateTestData("generateReport")}
                        >
                          {Object.keys(generateReportTypes).map(key => (
                            <Select.Option key={key} value={generateReportTypes[key].type}>
                              {generateReportTypes[key].val}
                            </Select.Option>
                          ))}
                        </GenerateReportSelect>
                      </Body>
                    </React.Fragment>
                  )}
                </Col>
              </Row>
            </Block>
            <Block id="mark-as-done">
              <Title>Mark as Done</Title>
              <Body>
                <StyledRadioGroup onChange={this.updateFeatures("markAsDoneValue")} value={markAsDoneValue}>
                  {Object.keys(completionTypes).map(item => (
                    <Radio value={completionTypes[item]} key={completionTypes[item]}>
                      {completionTypes[item]}
                    </Radio>
                  ))}
                </StyledRadioGroup>
              </Body>
              <Description>
                {"Control when class will be marked as Done. "}
                <BlueText>Automatically</BlueText>
                {" when all students are graded and due date has passed OR "}
                <BlueText>Manually</BlueText>
                {' when you click the "Mark as Done" button.'}
              </Description>
            </Block>

            <Block id="release-scores">
              <Title>Release Grades Settings</Title>
              <Body>
                <StyledRadioGroup onChange={this.updateFeatures("releaseScore")} value={releaseScore}>
                  {releaseGradeKeys.map(item => (
                    <Radio value={item} key={item}>
                      {releaseGradeTypes[item]}
                    </Radio>
                  ))}
                </StyledRadioGroup>
              </Body>
              <Description>
                {"Select "}
                <BlueText>ON</BlueText>
                {" for students to see their scores instantly after submission."}
                <br />
                {"Select "}
                <BlueText>OFF</BlueText>
                {" to manually control when students get to see their scores.\n"}
              </Description>
            </Block>

            <Block id="maximum-attempts-allowed">
              <Title>Maximum Attempts Allowed </Title>
              <Body />
              <Description>
                <Input
                  type="number"
                  size="large"
                  value={maxAttempts}
                  onChange={this.updateAttempt}
                  min={1}
                  step={1}
                  style={{ width: "20%", marginRight: 30 }}
                />
              </Description>
            </Block>

            <Block id="require-safe-exame-browser">
              <Title>Require Safe Exam Browser</Title>
              <Body>
                <Switch defaultChecked={safeBrowser} onChange={this.updateTestData("safeBrowser")} />
              </Body>
              <Description>
                {
                  "Ensure secure testing environment by using Safe Exam Browser to lockdown the studen's device. To use this feature Safe Exam Browser (on Windows/Mac only) must be"
                }
              </Description>
            </Block>

            <Block id="suffle-question">
              <Title>Shuffle Question</Title>
              <Body>
                <Switch defaultChecked={shuffleQuestions} onChange={this.updateTestData("shuffleQuestions")} />
              </Body>
              <Description>
                {"If "}
                <BlueText>ON</BlueText>
                {", then order of questions will be different for each student."}
              </Description>
            </Block>

            <Block id="show-answer-choice">
              <Title>Shuffle Answer Choice</Title>
              <Body>
                <Switch defaultChecked={shuffleAnswers} onChange={this.updateTestData("shuffleAnswers")} />
              </Body>
              <Description>
                {"If set to "}
                <BlueText>ON</BlueText>
                {
                  ", answer choices for multiple choice and multiple select questions will be randomly shuffled for students."
                }
                <br />
                {"Text to speech does not work when the answer choices are shuffled."}
              </Description>
            </Block>

            <Block id="show-calculator">
              <Title>Show Calculator</Title>
              <Body>
                <StyledRadioGroup onChange={this.updateFeatures("calcType")} value={calcType}>
                  {Object.keys(calculators).map(item => (
                    <Radio value={calculators[item]} key={calculators[item]}>
                      {calculators[item]}
                    </Radio>
                  ))}
                </StyledRadioGroup>
              </Body>
              <Description>
                {
                  "Choose if student can use a calculator, also select the type of calculator that would be shown to the students."
                }
              </Description>
            </Block>

            <Block id="answer-on-paper">
              <Title>Answer on Paper</Title>
              <Body>
                <Switch defaultChecked={answerOnPaper} onChange={this.updateTestData("answerOnPaper")} />
              </Body>
              <Description>
                {
                  "Use this opinion if you are administering this assessment on paper. If you use this opinion, you will have to manually grade student responses after the assessment is closed."
                }
              </Description>
            </Block>

            <Block id="require-password">
              <Title>Require Password</Title>
              <Body>
                <Switch defaultChecked={requirePassword} onChange={this.updateTestData("shuffleAns")} />
              </Body>
              <Description>
                {
                  "Require your students to type a password when opening the assessment. Password ensures that your students can access this assessment only in the classroom."
                }
              </Description>
            </Block>

            <Block id="evaluation-method">
              <Title>Evaluation Method</Title>
              <Body>
                <StyledRadioGroup onChange={this.updateFeatures("evalType")} value={evalType}>
                  {Object.keys(evalTypes).map(item => (
                    <Radio value={evalTypes[item]} key={evalTypes[item]}>
                      {evalTypes[item]}
                    </Radio>
                  ))}
                </StyledRadioGroup>
              </Body>
              <Description>
                {
                  "Choose if students should be awarded partial credit for their answers or not. If partial credit is allowed, then choose whether the student should be penalized for."
                }
              </Description>
            </Block>

            <Block id="performance-bands">
              <Row style={{ marginBottom: 18 }}>
                <Col span={6}>
                  <BandsText>Performance Bands</BandsText>
                </Col>
                <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
                  <NormalText>Above or at Standard</NormalText>
                </Col>
                <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
                  <NormalText>From</NormalText>
                </Col>
                <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
                  <NormalText>To</NormalText>
                </Col>
              </Row>
              <List
                grid={{ column: 1 }}
                dataSource={Object.keys(performanceBandsData)}
                renderItem={item => (
                  <List.Item>
                    <ListCard
                      item={performanceBandsData[item]}
                      onPerformanceBandUpdate={() => this.onPerformanceBandUpdate(item)}
                    />
                  </List.Item>
                )}
              />
            </Block>
            <AdvancedSettings style={{ display: showAdvancedOption ? "block" : "none" }}>
              <Block id="title">
                <Title>Title</Title>
                <FlexBody>
                  <RadioGroup onChange={this.enableHandler} value={enable}>
                    <Radio value={true}>Enable</Radio>
                    <Radio value={false}>Disable</Radio>
                  </RadioGroup>
                </FlexBody>
                <Row gutter={28} style={{ marginBottom: 30 }}>
                  <Col span={12}>
                    <InputTitle>Activity Title</InputTitle>
                    <Input placeholder="Title of activity" />
                  </Col>
                  <Col span={12}>
                    <InputTitle>Activity Title</InputTitle>
                    <Input placeholder="Title of activity" />
                  </Col>
                </Row>
              </Block>

              <Block id="navigations">
                <Title>Navigation / Control</Title>
                <RadioWrapper>
                  {navigations.map(navigation => (
                    <Row key={navigation} style={{ width: "100%", marginBottom: 25 }}>
                      <Col span={8}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{navigation}</span>
                      </Col>
                      <Col span={16}>
                        <RadioGroup onChange={this.enableHandler} value={enable}>
                          <Radio value={true}>Enable</Radio>
                          <Radio value={false}>Disable</Radio>
                        </RadioGroup>
                      </Col>
                    </Row>
                  ))}
                </RadioWrapper>
                <Row gutter={28} style={{ marginBottom: 30 }}>
                  <Col span={12}>
                    <InputTitle>On Submit Redirect URL</InputTitle>
                    <Input placeholder="https://edulastic.com/" />
                  </Col>
                  <Col span={12}>
                    <InputTitle>On Discard Redirect URL</InputTitle>
                    <Input placeholder="https://edulastic.com/" />
                  </Col>
                  <Col span={12} style={{ paddingTop: 30 }}>
                    <InputTitle>On Save Redirect URL</InputTitle>
                    <Input placeholder="https://edulastic.com/" />
                  </Col>
                </Row>
              </Block>

              <Block id="accessibility">
                <Title>Accessibility</Title>
                <RadioWrapper>
                  {Object.keys(accessibilities).map(item => (
                    <Row key={accessibilities[item]} style={{ width: "100%", marginBottom: 25 }}>
                      <Col span={8}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{accessibilities[item]}</span>
                      </Col>
                      <Col span={16}>
                        <RadioGroup onChange={this.enableHandler} value={enable}>
                          <Radio value={true}>Enable</Radio>
                          <Radio value={false}>Disable</Radio>
                        </RadioGroup>
                      </Col>
                    </Row>
                  ))}
                </RadioWrapper>
              </Block>

              <UiTime />

              <Block id="administration">
                <Title>Administration</Title>
                <Body>
                  <RadioWrapper>
                    <Row style={{ width: "100%", marginBottom: 25 }}>
                      <Col span={8}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>Configuration Panel</span>
                      </Col>
                      <Col span={16}>
                        <RadioGroup onChange={this.enableHandler} value={enable}>
                          <Radio value={true}>Enable</Radio>
                          <Radio value={false}>Disable</Radio>
                        </RadioGroup>
                      </Col>
                    </Row>
                  </RadioWrapper>

                  <Row gutter={28} style={{ marginBottom: 30 }}>
                    <Col span={12}>
                      <InputTitle>Password</InputTitle>
                      <Input placeholder="Your Password" />
                    </Col>
                  </Row>
                  <RadioWrapper>
                    <Row style={{ width: "100%", marginBottom: 25 }}>
                      <Col span={8}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>Save & Quit</span>
                      </Col>
                      <Col span={16}>
                        <RadioGroup onChange={this.enableHandler} value={enable}>
                          <Radio value={true}>Enable</Radio>
                          <Radio value={false}>Disable</Radio>
                        </RadioGroup>
                      </Col>
                    </Row>

                    <Row style={{ width: "100%", marginBottom: 25 }}>
                      <Col span={8}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>Exit & Discard</span>
                      </Col>
                      <Col span={16}>
                        <RadioGroup onChange={this.enableHandler} value={enable}>
                          <Radio value={true}>Enable</Radio>
                          <Radio value={false}>Disable</Radio>
                        </RadioGroup>
                      </Col>
                    </Row>

                    <Row style={{ width: "100%", marginBottom: 25 }}>
                      <Col span={8}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>Extend Assessment Time</span>
                      </Col>
                      <Col span={16}>
                        <RadioGroup onChange={this.enableHandler} value={enable}>
                          <Radio value={true}>Enable</Radio>
                          <Radio value={false}>Disable</Radio>
                        </RadioGroup>
                      </Col>
                    </Row>
                  </RadioWrapper>
                </Body>
              </Block>
            </AdvancedSettings>

            <AdvancedButton>
              <Line />
              <Button onClick={() => this.advancedHandler()}>
                {showAdvancedOption ? "HIDE ADVANCED OPTIONS" : "SHOW ADVANCED OPTIONS"}
              </Button>
              <Line />
            </AdvancedButton>
          </Col>
        </Row>
      </Paper>
    );
  }
}

MainSetting.propTypes = {
  history: PropTypes.object.isRequired,
  windowWidth: PropTypes.number.isRequired,
  setMaxAttempts: PropTypes.func.isRequired,
  setTestData: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired
};

export default connect(
  state => ({
    entity: getTestEntitySelector(state)
  }),
  {
    setMaxAttempts: setMaxAttemptsAction,
    setTestData: setTestDataAction
  }
)(MainSetting);
