import React from "react";
import { Row, Col, Icon } from "antd";
import styled from "styled-components";

import { fadedBlack } from "@edulastic/colors";

export const BoxHeading = props => {
  return (
    <StyledRow type="flex" justify="start">
      <Col>
        <Icon type={props.iconType} style={{ fontSize: 35 }} />
      </Col>
      <StyledCol>
        <StyledH3>{props.heading}</StyledH3>
      </StyledCol>
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  margin-bottom: 15px;
`;

const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const StyledIcon = styled(Icon)`
  height: 50px;
  width: 50px;
`;

const StyledH3 = styled.h3`
  font-weight: 900;
  color: ${fadedBlack};
  margin: 0;
`;
