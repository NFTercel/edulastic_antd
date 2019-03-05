import styled from "styled-components";

const BlockContainer = styled.div`
  display: block;
  overflow: auto;
  & > * {
    margin-right: ${({ childMarginRight }) => (childMarginRight !== undefined ? childMarginRight : 10)}px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

export default BlockContainer;
