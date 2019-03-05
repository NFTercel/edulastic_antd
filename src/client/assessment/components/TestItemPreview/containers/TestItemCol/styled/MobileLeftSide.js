import styled from "styled-components";

export const MobileLeftSide = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 220px);
  left: 0;
  background: ${props => props.theme.testItemPreview.mobileLeftSideBgColor};
  width: 25px;
  bottom: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
