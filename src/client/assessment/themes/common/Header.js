import styled from "styled-components";
import { darkBlueSecondary } from "@edulastic/colors";

const Header = styled.div`
  width: 100%;
  height: 62px;
  padding: 0 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  background: ${darkBlueSecondary};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 26px 5px 26px;
    height: 104px;
  }
`;

export default Header;
