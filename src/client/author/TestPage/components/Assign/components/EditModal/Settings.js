import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Radio } from "antd";
//components
import { AlignRight, AlignSwitchRight, StyledRowSettings, SettingsWrapper, MaxAttemptIInput } from "./styled";
//selectors
import { getTestEntitySelector } from "../../../../ducks";
import { test } from "@edulastic/constants";
const { releaseGradeTypes } = test;
const calculators = ["None", "Scientific", "Basic", "Graphing"];
const evaluationtypes = ["All or Nothing", "Partial Credit", "Dont penalize for incorrect selection"];
const releaseGradeKeys = ["DONT_RELEASE", "SCORE_ONLY", "WITH_RESPONSE", "WITH_ANSWERS"];

const Settings = ({ maxAttempts, onUpdateMaxAttempts, testSettings, assignmentSettings, updateAssignmentSettings }) => {
  const [isAutomatic, setAssignmentCompletionType] = useState(0);

  const [calcType, setCalcType] = useState(0);
  const [type, setEvaluationType] = useState(0);

  const updateMarkAsDone = e => {
    setAssignmentCompletionType(e.target.value);
  };

  const calculatorShowMethod = e => {
    setCalcType(e.target.value);
  };

  const evalMethod = e => {
    setEvaluationType(e.target.value);
  };

  const overRideSettings = (key, val) => {
    const newSettingsState = {
      ...assignmentSettings,
      [key]: val
    };
    updateAssignmentSettings(newSettingsState);
  };
  return (
    <SettingsWrapper>
      {/* Mark as done */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>MARK AS DONE</Col>
        <Col span={16}>
          <AlignRight onChange={updateMarkAsDone} value={isAutomatic}>
            <Radio value={0}>Automatically</Radio>
            <Radio value={1}>Manually</Radio>
          </AlignRight>
        </Col>
      </StyledRowSettings>
      {/* Mark as done */}

      {/* Release score */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>RELEASE SCORES AUTOMATICALLY</Col>
        <Col span={16}>
          <AlignRight
            defaultValue={assignmentSettings.releaseScore || testSettings.releaseScore}
            onChange={e => overRideSettings("releaseScore", e.target.value)}
          >
            {releaseGradeKeys.map(item => (
              <Radio value={item} key={item}>
                {releaseGradeTypes[item]}
              </Radio>
            ))}
          </AlignRight>
        </Col>
      </StyledRowSettings>
      {/* Release score */}
      {/* Maximum attempt */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>MAXIMUM ATTEMPTS ALLOWED</Col>
        <Col span={16}>
          <MaxAttemptIInput
            type="number"
            size="large"
            value={maxAttempts}
            onChange={e => onUpdateMaxAttempts(e.target.value)}
            min={1}
            step={1}
          />
        </Col>
      </StyledRowSettings>

      {/* Require Safe Exam Browser */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>REQUIRE SAFE EXAM BROWSER</Col>
        <Col span={16}>
          <AlignSwitchRight defaultChecked={testSettings.activityReview} />
        </Col>
      </StyledRowSettings>
      {/* Require Safe Exam Browser */}

      {/*Release Answers With Grades */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>RELEASE ANSWERS WITH GRADES</Col>
        <Col span={16}>
          <AlignSwitchRight />
        </Col>
      </StyledRowSettings>
      {/*Release Answers With Grades */}

      {/* Shuffle Question */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>SHUFFLE QUESTION</Col>
        <Col span={16}>
          <AlignSwitchRight defaultChecked />
        </Col>
      </StyledRowSettings>
      {/* Shuffle Question */}

      {/* Shuffle Answer Choice */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>SHUFFLE ANSWER CHOICE</Col>
        <Col span={16}>
          <AlignSwitchRight defaultChecked />
        </Col>
      </StyledRowSettings>
      {/* Shuffle Answer Choice */}

      {/* Show Calculator */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>SHOW CALCULATOR</Col>
        <Col span={16}>
          <AlignRight onChange={calculatorShowMethod} value={calcType}>
            {calculators.map((item, index) => (
              <Radio value={index} key={index}>
                {item}
              </Radio>
            ))}
          </AlignRight>
        </Col>
      </StyledRowSettings>
      {/* Show Calculator */}

      {/* Answer on Paper */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>ANSWER ON PAPER</Col>
        <Col span={16}>
          <AlignSwitchRight />
        </Col>
      </StyledRowSettings>
      {/* Answer on Paper */}

      {/* Require Password */}
      <StyledRowSettings gutter={16}>
        <Col span={8}>REQUIRE PASSWORD</Col>
        <Col span={16}>
          <AlignSwitchRight defaultChecked />
        </Col>
      </StyledRowSettings>
      {/* Require Password */}

      {/* Evaluation Method */}
      <StyledRowSettings gutter={16} islast={true}>
        <Col span={6}>EVALUATION METHOD</Col>
        <Col span={18}>
          <AlignRight onChange={evalMethod} value={type}>
            {evaluationtypes.map((item, index) => (
              <Radio value={index} key={index}>
                {item}
              </Radio>
            ))}
          </AlignRight>
        </Col>
      </StyledRowSettings>
      {/*Evaluation Method */}
    </SettingsWrapper>
  );
};

export default connect(
  state => ({
    testSettings: getTestEntitySelector(state)
  }),
  null
)(Settings);
