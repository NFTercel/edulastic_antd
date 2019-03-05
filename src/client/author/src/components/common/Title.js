import styled from "styled-components";

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.36;
  color: ${props => props.textcolor};

  &:hover {
    color: ${props => props.hovercolor};
  }
`;

export default Title;
