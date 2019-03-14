import React from "react";
import { Row, Col } from "antd";

export const CustomChartTooltip = ({ className, payload }) => {
  let corr_cnt, incorr_cnt, part_cnt, skip_cnt, qCount;
  if (payload && payload.length === 2) {
    corr_cnt = payload[0].payload.corr_cnt;
    incorr_cnt = payload[0].payload.incorr_cnt;
    part_cnt = payload[0].payload.part_cnt;
    skip_cnt = payload[0].payload.skip_cnt;
    qCount = payload[0].payload.qCount;
  }

  return payload && payload.length === 2 ? (
    <div className={`chart-tooltip ${className}`}>
      <Row type="flex" justify="start">
        <Col className="tooltip-key">{"Avg Performance: "}</Col>
        <Col className="tooltip-value">{payload[0].value}%</Col>
      </Row>
      <Row type="flex" justify="start">
        <Col className="tooltip-key">{"Assessment: "}</Col>
        <Col className="tooltip-value">{payload[0].payload.assessment}</Col>
      </Row>
      <Row type="flex" justify="start">
        <Col className="tooltip-key">{"Total Questions: "}</Col>
        <Col className="tooltip-value">{qCount}</Col>
      </Row>
      <Row type="flex" justify="start">
        <Col className="tooltip-key">{"Question Type: "}</Col>
        <Col className="tooltip-value">{payload[0].payload.name}</Col>
      </Row>
    </div>
  ) : (
    <div />
  );
};
