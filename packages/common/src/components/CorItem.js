import styled from 'styled-components';

import { dashBorderColor, white, blue } from '@edulastic/colors';

const CorItem = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid ${dashBorderColor};
  background: ${white};
  padding: 0 25px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-left: 84px;

  &:before {
    content: ${({ index }) => `'${index + 1}'`};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -40px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    height: 40px;
    width: 40px;
    font-size: 14px;
    font-weight: 600;
    background: ${blue};
    color: white;
  }
`;

export default CorItem;
