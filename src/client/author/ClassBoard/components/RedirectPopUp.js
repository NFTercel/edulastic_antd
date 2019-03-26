//@ts-check
import React, { useState, useCallback } from "react";
import { Modal, Button, Row, Col, Input, Radio, Select, DatePicker } from "antd";
import moment from "moment";
import { assignmentApi } from "@edulastic/api";

const RadioGroup = Radio.Group;
const Option = Select.Option;

/**
 * @typedef {Object} RedirectPopUpProps
 * @property {{_id: string, firstName: string}[]} allStudents
 * @property {string[]} selectedStudents
 * @property {Object} additionalData
 * @property {boolean} open
 * @property {Function} closePopup
 * @property {Function} setSelected
 * @property {string} assignmentId
 * @property {string} groupId
 */

/**
 * @param {RedirectPopUpProps} props
 */
const RedirectPopUp = ({
  allStudents,
  selectedStudents,
  additionalData,
  open,
  closePopup,
  setSelected,
  assignmentId,
  groupId
}) => {
  const [dueDate, setDueDate] = useState(moment().add(1, "day"));
  const [loading, setLoading] = useState(false);
  const submitAction = useCallback(async () => {
    setLoading(true);
    const selected = Object.keys(selectedStudents);
    await assignmentApi.redirect(assignmentId, {
      _id: groupId,
      specificStudents: true,
      students: selected,
      endDate: +dueDate
    });
    setLoading(false);
    closePopup();
  }, [selectedStudents, assignmentId, dueDate, groupId]);

  return (
    <Modal
      title="Redirect"
      visible={open}
      footer={[
        <Button key="cancel" onClick={() => closePopup()}>
          cancel
        </Button>,
        <Button loading={loading} key="submit" onClick={submitAction}>
          submit
        </Button>
      ]}
    >
      <Row>Class/Group Section</Row>
      <Row>{additionalData.className}</Row>
      <Row>
        {/* 
            TODO: handle the change
        */}
        <RadioGroup value="specificStudents">
          <Radio value="entire">Entire Class</Radio>
          <Radio value="absentStudents">Absent Students</Radio>
          <Radio value="specificStudents">Specific Students</Radio>
        </RadioGroup>
      </Row>

      <Row> Students </Row>
      <Row>
        <Select
          mode="multiple"
          placeholder="Select the students"
          value={Object.keys(selectedStudents)}
          onChange={v => {
            setSelected(v);
          }}
        >
          {allStudents.map(x => (
            <Option key={x._id} value={x._id}>
              {x.firstName}
            </Option>
          ))}
        </Select>
      </Row>
      <Row>
        <Col span={12}>
          <Row>Close Date</Row>
          <Row>
            <DatePicker
              value={dueDate}
              onChange={v => {
                setDueDate(v);
              }}
            />
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default RedirectPopUp;
