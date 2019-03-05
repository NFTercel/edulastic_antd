import styled from "styled-components";

export const AnswerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: ${props => (["left", "right"].includes(props.position) ? "nowrap" : "wrap")};
`;
