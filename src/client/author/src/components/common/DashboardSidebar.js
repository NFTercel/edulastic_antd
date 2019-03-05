import styled from "styled-components";

const DashboardSidebar = styled.div`
  width: ${props => (props.collapsed ? "50px" : "200px")};
  height: 100vh;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding: 20px;
  box-sizing: border-box;
  background: ${props => props.theme.dashboardSidebarBgColor};
`;

export default DashboardSidebar;
