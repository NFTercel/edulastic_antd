import { blue, white } from '@edulastic/colors';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: ${({ isOver, canDrop }) => (isOver && canDrop ? white : blue)};
  background: ${({ isOver, canDrop }) => (isOver && canDrop ? blue : white)};
`;
