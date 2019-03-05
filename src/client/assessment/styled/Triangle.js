import styled from "styled-components";

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid ${props => props.theme.common.triangleBorderLeftColor};
  border-right: 8px solid ${props => props.theme.common.triangleBorderRightColor};
  border-bottom: 8px solid ${props => props.theme.common.triangleBorderBottomColor};
  margin-top: 2px;
`;
