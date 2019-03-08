import styled from "styled-components";
import { InputNumber, Select } from "antd";

import { ModalTitle } from "../../common/Modal";
import { FormGroup } from "../QuestionEditModal/common/QuestionForm";

export const BulkTitle = styled(ModalTitle)`
  margin-left: 0;
`;

export const NumberInput = styled(InputNumber)`
  .ant-input-number-input {
    text-align: left;
  }
`;

export const TypeOfQuestion = styled(FormGroup)`
  margin-left: 17px;
`;

export const StartingIndexInput = styled(InputNumber)`
  width: 100%;

  .ant-input-number-input {
    text-align: left;
  }
`;

export const TypeOfQuestionSelect = styled(Select)`
  width: 550px;
`;
