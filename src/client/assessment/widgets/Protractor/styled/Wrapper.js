import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: ${props => (props.smallSize ? 190 : 275)}px;
`;
