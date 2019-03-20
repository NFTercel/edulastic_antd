import React from "react";
import { Radio, Row } from "antd";
import { Container, InputsWrapper, OptionTitle } from "./styled";

import AssignmentsTable from "./Table";

const Group = Radio.Group;
const ACTIONS = {
  SKIP: "SKIP",
  SCORE: "SCORE",
  MANUAL: "MANUAL"
};
const ActionKeys = ["SKIP", "SCORE", "MANUAL"];
const settings = {
  addedQuestion: "Added Questions",
  correctAnsChanged: "Correct Answers Changed",
  choicesChanged: "Choices Changed"
};
const settingKeys = ["addedQuestion", "correctAnsChanged", "choicesChanged"];

const MainContent = ({
  assignments,
  RegradeTypes,
  RegradeKeys,
  handleSettingsChange,
  regradeSettings,
  onUpdateSettings,
  assigmentOptions,
  setAssignmentOptions,
  regradeSettingsChange
}) => {
  const onAssignmentSettingsChange = () => {
    const value = event.target.value;
    if (value !== "SPECIFIC") {
      const newSettings = {
        ...regradeSettings,
        assignmentList: []
      };
      regradeSettingsChange(newSettings);
    }
    setAssignmentOptions(value);
  };

  const CreateRadioButtonGroup = ({ children, label }) => (
    <InputsWrapper>
      <Row>
        <OptionTitle>{children}</OptionTitle>
      </Row>
      <Group defaultValue={regradeSettings.options[label]} onChange={e => onUpdateSettings(label, e.target.value)}>
        {ActionKeys.map(item => (
          <Row key={item}>
            <Radio value={item}>{ACTIONS[item]}</Radio>
          </Row>
        ))}
      </Group>
    </InputsWrapper>
  );

  return (
    <Container>
      <h2>
        The test has been edited and since there are assignments that have been completed, would you like to apply the
        changes to:
      </h2>
      <Group defaultValue={RegradeKeys[0]} onChange={onAssignmentSettingsChange}>
        {RegradeKeys.map(item => (
          <Row key={item}>
            <Radio value={item}>{RegradeTypes[item]}</Radio>
          </Row>
        ))}
      </Group>
      <AssignmentsTable
        assignments={assignments}
        handleSettingsChange={handleSettingsChange}
        regradeType={assigmentOptions}
        regradeSettings={regradeSettings}
      />
      {settingKeys.map(item => (
        <CreateRadioButtonGroup key={item} label={item}>
          {settings[item]}
        </CreateRadioButtonGroup>
      ))}
      {regradeSettings.options.removedQuestion == "DISCARD" && (
        <p style={{ textAlign: "center" }}>REMOVED QUESTIONS WILL BE DISCARDED</p>
      )}
    </Container>
  );
};

export default MainContent;
