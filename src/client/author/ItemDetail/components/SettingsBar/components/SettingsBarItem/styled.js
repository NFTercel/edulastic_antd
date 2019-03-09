import { textColor, white, blue } from '@edulastic/colors';
import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ selected }) => (selected ? blue : white)};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  width: 45%;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ selected }) => (selected ? white : textColor)};
`;

export const Text = styled.div`
  margin-top: 10px;
`;
