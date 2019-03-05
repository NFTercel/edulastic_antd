import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;

  & > div {
    display: flex;
  }
`;
