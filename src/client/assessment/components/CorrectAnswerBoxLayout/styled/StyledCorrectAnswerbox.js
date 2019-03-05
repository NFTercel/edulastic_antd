import styled from "styled-components";

export const StyledCorrectAnswerbox = styled.div.attrs({
  className: () => "correctanswer-box"
})`
  padding: 16px;
  font-size: ${props => props.fontSize}px;
`;
