import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  align-items: ${props => (props.alignItems ? props.alignItems : "center")};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : "flex-start")};

  & > * {
    margin-left: 10px;
  }
  & > *:first-child {
    margin-left: 0;
  }
`;

export default FlexContainer;
