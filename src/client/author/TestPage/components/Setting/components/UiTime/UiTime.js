import React from "react";
import { Row, Col, Radio, Select, Input } from "antd";
import { Block, Title, Body, InputTitle, RadioGroup, RowWrapper, CommonText } from "./styled";

const renderBodyContent = () => {
  const content = [
    {
      label: "Progress Bar",
      defaultValue: "limit-type",
      type: "select",
      selectOptions: [
        {
          text: "Limit Type",
          value: "limit-type"
        }
      ]
    },
    {
      label: "Timer",
      defaultValue: "limit-layout",
      type: "select",
      selectOptions: [
        {
          text: "Layout",
          value: "limit-layout"
        }
      ]
    },
    {
      label: "Item Count",
      defaultValue: "item-transition",
      type: "select",
      selectOptions: [
        {
          text: "Item Transition",
          value: "item-transition"
        }
      ]
    },
    {
      label: "Scrolling Indicator",
      defaultValue: "font-size",
      type: "select",
      selectOptions: [
        {
          text: "Font Size",
          value: "font-size"
        }
      ]
    },
    {
      label: "Idle Timeout Warning",
      placeholder: "Idle Timeout Countdown Time (sec)",
      type: "input"
    },
    {
      label: "Auto Save",
      placeholder: "Auto Save Interval (sec)",
      type: "input"
    },
    {
      label: "Auto Save UI Indicator",
      placeholder: "Auto Save Interval (sec)",
      type: "input"
    }
  ];

  return content.map(element => (
    <RowWrapper>
      <Col span={8}>
        <CommonText>{element.label}</CommonText>
      </Col>
      <Col span={8}>
        <RadioGroup value={1}>
          <Radio value={1}>Enable</Radio>
          <Radio value={2}>Disable</Radio>
        </RadioGroup>
      </Col>
      <Col span={8} style={{ marginTop: -5 }}>
        {element.type === "select" && (
          <Select defaultValue={element.defaultValue}>
            {element.selectOptions.map(option => (
              <Select.Option value={option.value}>{option.text}</Select.Option>
            ))}
          </Select>
        )}
        {element.type === "input" && <Input placeholder={element.placeholder} />}
      </Col>
    </RowWrapper>
  ));
};

const UiTime = () => (
  <Block id="ui-time">
    <Title>UI / Time</Title>
    <Body>{renderBodyContent()}</Body>
    <Row gutter={28} style={{ marginBottom: 30 }}>
      <Col span={12}>
        <InputTitle>Assessment Time</InputTitle>
        <Input placeholder="000" />
      </Col>
      <Col span={12}>
        <InputTitle>End Assessment Warning Time (sec)</InputTitle>
        <Input placeholder="000" />
      </Col>
      <Col span={12} style={{ paddingTop: 30 }}>
        <InputTitle>Remote Control Countdown Time (sec)</InputTitle>
        <Input placeholder="https://edulastic.com/" />
      </Col>
      <Col span={12} style={{ paddingTop: 30 }}>
        <InputTitle>Custom Stylesheet</InputTitle>
        <Input placeholder="https://edulastic.com/" />
      </Col>
    </Row>
  </Block>
);

export default UiTime;
