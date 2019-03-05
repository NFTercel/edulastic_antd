import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-start')};
  flex-direction: ${props => (props.flexDirection ? props.flexDirection : 'row')};

  & > * {
    margin-right: ${({ childMarginRight }) =>
    (childMarginRight !== undefined ? childMarginRight : 10)}px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

export default FlexContainer;
