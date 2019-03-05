import styled from "styled-components";

const MainWrapper = styled.section`
  width: 1008px;
  background-color: ${props => props.theme.mainContentBgColor};
  color: ${props => props.theme.mainContentTextColor};
  min-height: 100vh;
  margin: auto;
  box-sizing: border-box;
  padding: 100px 112px;
  text-align: left;
  font-size: 18px;

  @media (max-width: 1100px) {
    width: 100%;
  }

  & * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media (max-width: 1600px) {
    padding: 60px 112px;
  }

  @media (max-width: 768px) {
    padding: 24px;
  }

  @media (max-width: 468px) {
    padding: 0px;
    border-radius: 10px;
  }
`;

export default MainWrapper;
