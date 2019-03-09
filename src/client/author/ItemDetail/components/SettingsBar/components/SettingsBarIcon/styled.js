import { textColor, white } from '@edulastic/colors';
import styled from 'styled-components';

export const Container = styled.div`
  border: 1px solid ${({ active }) => (active ? white : textColor)};
  width: 50px;
  height: 50px;
`;

export const Divider = styled.div`
  width: 1px;
  background: ${({ active }) => (active ? white : textColor)};
  height: 100%;
  display: ${({ type }) => (type === '100-100' ? 'none' : 'block')};
  margin-left: ${({ type, getMarginLeft }) => getMarginLeft(type)};
`;
