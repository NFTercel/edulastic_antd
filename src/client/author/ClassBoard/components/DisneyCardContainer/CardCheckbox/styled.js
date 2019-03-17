import { Checkbox } from "antd";
import styled from "styled-components";
import { themes } from "../../../../../student/themes";

const classBoardTheme = themes.default.classboard;

export const StyledCheckbox = styled(Checkbox)`
  font-size: 0.7em;
  color: ${classBoardTheme.headerCheckboxColor};
  align-self: center;
  margin-left: auto;
`;
