import styled from "styled-components";

export const Container = styled.div`
  width: ${({ width }) => width};
  display: flex;
  flex-direction: column;
  border-right-color: ${props => props.theme.testItemPreview.itemColBorderColor} @media (max-width: 468px) {
    padding-left: 10px;
    margin-right: ${props => !props.value && "20px"};
    margin-left: ${props => props.value && "20px"};
  }
`;
