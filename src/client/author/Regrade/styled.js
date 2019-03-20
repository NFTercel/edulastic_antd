import { Button, Table } from "antd";
import { white, green, boxShadowDefault } from "@edulastic/colors";
import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
  padding: 30px;
  background: ${white};
  border-radius: 10px;
  box-shadow: ${boxShadowDefault};
`;

export const Title = styled.h1`
  font-size: 20px;
  color: ${white};
  font-weight: bold;
`;

export const ApplyButton = styled(Button)`
  background: ${green};
  border: 0;
  color: ${white};
  padding: 6px 35px;
  font-size: 16px;
  height: auto;
`;

export const StyledTable = styled(Table)`
  margin-top: 20px;
`;

export const InputsWrapper = styled.div`
  margin-top: 20px;
`;

export const OptionTitle = styled.h3`
  font-weight: bold;
`;
