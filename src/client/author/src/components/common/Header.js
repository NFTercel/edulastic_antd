import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: 90px;
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.headerBgColor};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.17);

  @media (max-width: 760px) {
    height: 148px;
    padding: 15px 26px;
    align-items: flex-start;
    display: block;
  }
`;

export default Header;
