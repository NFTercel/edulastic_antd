import styled from "styled-components";
import { Icon } from "antd";

export const SelectSuffixIcon = styled(Icon)`
  color: ${props => props.theme.questionMetadata.selectSuffixIconColor};
  font-size: ${props => props.theme.questionMetadata.selectSuffixIconFontSize};
  margin-right: 5px;
`;
