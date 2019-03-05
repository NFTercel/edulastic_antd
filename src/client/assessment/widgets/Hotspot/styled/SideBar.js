import styled from "styled-components";

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.widgets.hotspot.sideBarBgColor};
  width: 117px;
  padding: 22px 7px;

  & > * {
    margin-bottom: 10px;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
