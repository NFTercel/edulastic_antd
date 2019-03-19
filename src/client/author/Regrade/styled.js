import { Button, Table } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
  padding: 10px;
`;

export const Title = styled.h1`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

export const ApplyButton = styled(Button)`
  background: #5ae4a1;
  border: 0;
  color: #fff;
  padding: 6px 35px;
  font-weight: bold;
  font-size: 16px;
  height: auto;
`;

export const StyledTable = styled(Table)`
  margin-top: 20px;
`;
