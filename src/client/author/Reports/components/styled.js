import styled from "styled-components";
import { Card } from "@edulastic/common";
import { Row, Col, Button } from "antd";

export const StyledCard = styled(Card)`
  margin: 10px;
`;

export const StyledContainer = styled(Row)`
  //   flex-flow: row wrap;

  .report-category {
    flex: 50%;
    max-width: 50%;
  }

  @media (max-width: 600px) {
    .report-category {
      flex: 100%;
      max-width: 100%;
    }
  }
`;
