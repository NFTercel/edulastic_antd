import { white } from '@edulastic/colors';
import styled from 'styled-components';

export const Container = styled.div`
  .ant-btn-primary {
    width: 195px;
    height: 40px;
  }

  .anticon-plus {
    position: relative;
    right: 35px;
    font-size: 18px;
    color: ${white};
  }

  .ant-btn > .anticon + span {
    color: ${white};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }
`;
