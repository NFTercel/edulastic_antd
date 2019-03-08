import styled from "styled-components";
import Color from "color";

const getItemBackground = (alpha, hoverBg = false) => ({
  active,
  showAnswers,
  checkAnswers,
  correct,
  locked,
  theme
}) => {
  const isCheckGreen = checkAnswers && active && !locked && correct;
  const isCheckRed = checkAnswers && active && !locked && !correct;
  const isCheckLocked = (checkAnswers && active && locked) || (checkAnswers && !active && locked);
  const isShowGreen = showAnswers && correct && !locked;
  const isShowLocked = (showAnswers && correct && locked) || (showAnswers && !correct && active && locked);
  const isShowRed = showAnswers && !correct && active && !locked;
  const isSimplyActive = !checkAnswers && !showAnswers && active;

  if (isCheckGreen || isShowGreen) {
    return theme.widgets.shading.correctLiBgColor;
  }
  if (isCheckRed || isShowRed) {
    return theme.widgets.shading.incorrectLiBgColor;
  }
  if (isCheckLocked || isShowLocked || isSimplyActive) {
    return Color(theme.widgets.shading.lockedLiBgColor)
      .alpha(alpha)
      .string();
  }
  return hoverBg ? theme.widgets.shading.liBgHoverColor : theme.widgets.shading.liBgColor;
};

const getIcon = ({ showAnswers, correct, locked, checkAnswers, active }) => {
  const isCheckTick = checkAnswers && active && !locked && correct;
  const isShowTick = showAnswers && correct && !locked;
  const isCheckCross = checkAnswers && active && !locked && !correct;
  const isShowCross = showAnswers && !correct && active && !locked;

  if (isCheckTick || isShowTick) {
    return "\\f00c";
  }
  if (isCheckCross || isShowCross) {
    return "\\f00d";
  }
  return "";
};

export const Li = styled.li`
  width: ${({ width }) => width * 40}px;
  visibility: ${props => props.visibility};
  height: ${({ height }) => height * 40}px;
  background: ${getItemBackground(0.8)};
  cursor: ${({ locked }) => (locked ? "not-allowed" : "pointer")};
  border: ${props => (props.border === "full" ? `2px solid ${props.theme.widgets.shading.liBorderColor}` : "none")};
  display: inline-block;
  margin-left: -2px;
  position: relative;
  padding: 0;
  z-index: 0;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    ${props =>
      props.hover &&
      `
      background: ${getItemBackground(0.6, true)};
      z-index: 11;
      border: 3px solid ${props.theme.widgets.shading.liBorderHoverColor};
    `}
  }
  &::before {
    font-family: ${props => props.theme.widgets.shading.liIconFontFamily};
    content: "${getIcon}";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 20;
    font-size: ${props => props.theme.widgets.shading.liIconFontSize};
    transform: translate(-50%, -50%);
    color: ${props => props.theme.widgets.shading.liIconColor};
  }
`;
