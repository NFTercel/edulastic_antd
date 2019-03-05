import styled from "styled-components";

const QuestionHeader = styled.div`
  font-size: ${({ smallSize }) => (smallSize ? "13px" : "16px")};
  color: #444444;
  line-height: 1.63;
  margin-bottom: ${({ smallSize }) => (smallSize ? "10px" : "25px")};
`;

export default QuestionHeader;
