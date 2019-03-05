import styled from "styled-components";

const Main = styled.main`
  background-color: ${props => props.theme.mainBgColor};
  padding: ${props => (props.skin ? "90px 0 0" : "110px 0 0 140px")};
  display: ${props => (props.skin ? "block" : "flex")};
  flex-direction: ${props => (props.skin ? "initial" : "row")};
  min-height: ${props => (props.skin ? "0" : "100vh")};
  box-sizing: border-box;

  & p {
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 174px 26px 0;
  }
`;

export default Main;
