import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";
import { blue, grey } from "@edulastic/colors";

export const TestItemWrapper = styled.div`
  border-bottom: 1px solid ${grey};
  margin-bottom: 40px;

  :last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

export const PreviewContainer = styled(FlexContainer)`
  color: ${blue};
  margin-right: 45px;
  cursor: pointer;
`;
