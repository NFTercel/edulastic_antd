import styled from 'styled-components';

const PaddingDiv = styled.div`
  padding-top: ${props => (props.top ? `${props.top}px` : 0)};
  padding-bottom: ${props => (props.bottom ? `${props.bottom}px` : 0)};
  padding-left: ${props => (props.left ? `${props.left}px` : 0)};
  padding-right: ${props => (props.right ? `${props.right}px` : 0)};
  height: ${props => (props.height ? `${props.height}px` : 'inherit')};
`;

export default PaddingDiv;
