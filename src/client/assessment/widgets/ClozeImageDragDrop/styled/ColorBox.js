import styled from "styled-components";

export const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 10px;
  background: ${props => props.theme.widgets.clozeImageDragDrop.colorBoxBgColor};
`;
