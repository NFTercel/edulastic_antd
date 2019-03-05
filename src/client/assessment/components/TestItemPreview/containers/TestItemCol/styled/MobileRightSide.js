import styled from "styled-components";

export const MobileRightSide = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 220px);
  right: 0;
  background: ${props => props.theme.testItemPreview.mobileRightSideBgColor};
  width: 25px;
  bottom: 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
