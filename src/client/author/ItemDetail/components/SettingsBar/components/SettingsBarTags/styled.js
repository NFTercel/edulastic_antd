import { grey, textColor } from "@edulastic/colors";
import styled from "styled-components";

export const Container = styled.div`
  border-radius: 10px;
  border: 1px solid #e9e9e9;
  padding: 15px;
`;

export const Tag = styled.div`
  border-radius: 10px;
  border: 1px solid ${grey};
  color: ${textColor};
  min-width: 105px;
  padding: 5px 10px;
  min-height: 25px;
  text-align: center;
  display: inline-flex;
  margin-right: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled.div`
  margin-left: 10px;
  display: inline-flex;
  cursor: pointer;
`;
