import styled, { css } from "styled-components";

const MobileLeftMenu = css`
  width: auto;
  min-width: auto;
  position: absolute;
  left: 10px;
  top: 20px;
`;
const HeaderLeftMenu = styled.div`
  text-align: left;
  height: 60px;
  min-width: 70px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    ${props => props.skinb === "true" && MobileLeftMenu}
  }
`;

export default HeaderLeftMenu;
