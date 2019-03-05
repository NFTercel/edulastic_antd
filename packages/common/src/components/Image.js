import styled from 'styled-components';

const Image = styled.img`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => height || 616}px;
  max-height: 100%;
  max-width: 100%;
`;

export default Image;
