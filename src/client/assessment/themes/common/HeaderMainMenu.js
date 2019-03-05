import styled, { css } from "styled-components";

const HeaderMenuMobile = css`
  padding-left: 30px;
  margin-top: 0px;
`;
const HeaderMainMenu = styled.div`
  width: 100%;
  @media (max-width: 468px) {
    margin-top: 7px;
  }
  @media (max-width: 768px) {
    ${props => props.skinb === "true" && HeaderMenuMobile}
  }
`;

export default HeaderMainMenu;
