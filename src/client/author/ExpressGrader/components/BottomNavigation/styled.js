import styled from "styled-components";
import { Button } from "antd";

export const NavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3%;
  marginbottom: 25px;
`;

export const LinksWrapper = styled.div`
  display: flex;
  justifycontent: row;
  alignitems: center;
  cursor: pointer;
`;

export const Link = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  margin: 0 10px;
  cursor: pointer;
`;

export const CloseModal = styled(Button)`
  display: flex;
  align-items: center;
  background: #41aff8;
  color: #fff;
  width: 100px;
  margin-left: 5px;
`;
