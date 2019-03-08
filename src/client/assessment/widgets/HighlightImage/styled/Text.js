import styled from "styled-components";

export const Text = styled.div`
  font-size: ${props => props.fontSize || props.theme.widgets.highlightImage.textFontSize};
  font-weight: ${props => props.theme.widgets.highlightImage.textFontWeight};
`;
