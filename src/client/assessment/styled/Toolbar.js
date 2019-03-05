import styled from "styled-components";

export const Toolbar = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  align-content: center;
  justify-content: space-between;
  align-items: stretch;
  background: ${props => props.theme.common.toolbarBgColor};
  border: 1px solid ${props => props.theme.common.toolbarBorderColor};
  border-radius: ${({ borderRadiusOnlyBottom, borderRadiusOnlyTop }) =>
    borderRadiusOnlyBottom ? "0 0 4px 4px" : borderRadiusOnlyTop ? "4px 4px 0 0" : "4px"};
`;
