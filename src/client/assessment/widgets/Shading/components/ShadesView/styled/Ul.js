import styled from "styled-components";

export const Ul = styled.ul`
  line-height: 0;
  margin: 0;
  padding: 0;
  text-align: left;
  list-style-position: outside;
  border-collapse: separate;
  margin-top: -2px;
  &:first-child {
    margin-top: 0;
  }
`;
