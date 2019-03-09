import React from "react";
import { Modal, Button, Radio, Row } from "antd";

import { test } from "@edulastic/constants";

const { releaseGradeTypes, releaseGradeLabels } = test;
const releaseGradeKeys = ["DONT_RELEASE", "SCORE_ONLY", "WITH_RESPONSE", "WITH_ANSWERS"];
const ReleaseGradeSettingsModal = ({ showReleaseGradeSettings, onCloseReleaseScoreSettings }) => (
  <Modal
    visible={showReleaseGradeSettings}
    title="Release Grades"
    onOk={onCloseReleaseScoreSettings}
    onCancel={onCloseReleaseScoreSettings}
    footer={[
      <Button key="back" onClick={onCloseReleaseScoreSettings}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={onCloseReleaseScoreSettings}>
        Apply
      </Button>
    ]}
  >
    <Radio.Group defaultValue={releaseGradeLabels.DONT_RELEASE}>
      {releaseGradeKeys.map(item => (
        <Row>
          <Radio value={item} key={item}>
            {releaseGradeTypes[item]}
          </Radio>
        </Row>
      ))}
    </Radio.Group>
  </Modal>
);

export default ReleaseGradeSettingsModal;
