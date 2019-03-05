import styled from "styled-components";

export const QuestionHeader = styled.div`
  font-size: ${({ smallSize, theme }) =>
    smallSize ? theme.common.questionHeaderSmallFontSize : theme.common.questionHeaderFontSize};
  color: ${props => props.theme.common.questionHeaderColor};
  line-height: 1.63;
  margin-bottom: ${({ smallSize }) => (smallSize ? "10px" : "25px")};
  &:before {
    content: 'Q ${props => props.qIndex}';
    font-weight: bold;
    margin-right: 5px
  }
`;
