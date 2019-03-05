import styled from "styled-components";

export const TemplateBoxLayoutContainer = styled.div`
  flex: 1;
  margin: ${props => (props.smallSize ? "0px" : "15px 0px")};
  border-radius: 10px;
`;
