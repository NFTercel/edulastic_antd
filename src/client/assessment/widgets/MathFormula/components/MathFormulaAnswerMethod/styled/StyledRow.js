import styled from "styled-components";
import { Row } from "antd";
import { mobileWidth } from "@edulastic/colors";

export const StyledRow = styled(Row)`
 margin: 0 16px 15px 16px;
  
  @media (max-width: ${mobileWidth}) {
    margin: 0 0 15px 0;
    display: flex;
    flex-direction: column;
  }
`;
