import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  position: ${props => (props.type ? "fixed" : "unset")};
  z-index: ${props => (props.type ? 10 : 1)};
  right: 120px;
`;

export const PreviewBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .ant-btn {
    background: transparent;
    height: 24px;
    margin-left: 17px;
  }
`;
