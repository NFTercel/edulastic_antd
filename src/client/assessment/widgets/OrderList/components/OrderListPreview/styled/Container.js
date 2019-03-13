import styled from "styled-components";

export const Container = styled.div`
  width: ${props => (props.columns === 1 ? 100 / props.columns : 100 / props.columns - 2)}%;
  display: inline-flex;
  align-items: stretch;
  margin-bottom: 10px;
  cursor: pointer;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
