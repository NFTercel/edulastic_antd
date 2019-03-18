import React, { useState } from "react";
// import { connect } from "react-redux";
import { Modal, Button, Radio, Row } from "antd";

import { test } from "@edulastic/constants";
// import

const { releaseGradeTypes, releaseGradeLabels } = test;
const releaseGradeKeys = ["DONT_RELEASE", "SCORE_ONLY", "WITH_RESPONSE", "WITH_ANSWERS"];
const ReleaseGradeSettingsModal = ({
  showReleaseGradeSettings,
  onCloseReleaseScoreSettings,
  updateReleaseScoreSettings
}) => {
  const [releaseScore, updateReleaseScoreType] = useState(releaseGradeLabels.DONT_RELEASE);
  return (
    <Modal
      visible={showReleaseGradeSettings}
      title="Release Grades"
      onOk={onCloseReleaseScoreSettings}
      onCancel={onCloseReleaseScoreSettings}
      footer={[
        <Button key="back" onClick={onCloseReleaseScoreSettings}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => updateReleaseScoreSettings(releaseScore)}>
          Apply
        </Button>
      ]}
    >
      <Radio.Group defaultValue={releaseScore} onChange={e => updateReleaseScoreType(e.target.value)}>
        {releaseGradeKeys.map((item, index) => (
          <Row key={index}>
            <Radio value={item} key={item}>
              {releaseGradeTypes[item]}
            </Radio>
          </Row>
        ))}
      </Radio.Group>
    </Modal>
  );
};

export default ReleaseGradeSettingsModal;
