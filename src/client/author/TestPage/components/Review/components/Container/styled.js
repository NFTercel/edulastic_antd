import styled from "styled-components";

export const SecondHeader = styled.div`
  display: flex;
  flex-direction: ${props => (props.isMobileSize ? "row" : "column")}
  justify-content: space-between;

  .ant-btn {
    background: transparent;
    height: 24px;
    margin-left: 17px;
  }
`;
