import styled from "styled-components";

import { Paper } from "@edulastic/common";
import { secondaryTextColor } from "@edulastic/colors";

export const QuestionFormWrapper = styled(Paper)`
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);

  .ant-input-number-input {
    text-align: center;
  }
`;

export const FormGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 28px;
  }
`;

export const FormInline = styled.div`
  display: flex;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 13px;
  line-height: 1.38;
  font-weight: 600;
  color: ${secondaryTextColor};
`;

export const Points = styled.span`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  padding-left: 17px;
`;
