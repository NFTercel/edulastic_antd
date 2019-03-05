import styled from "styled-components";

const HeaderRightMenu = styled.div`
  flex: ${props => (props.skin ? 1 : 3)};
  text-align: right;

  @media (max-width: 768px) {
    float: right;
  }
`;

export default HeaderRightMenu;
