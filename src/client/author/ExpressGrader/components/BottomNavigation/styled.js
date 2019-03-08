import styled from "styled-components";
import { Button } from "antd";
import { greenDark } from "@edulastic/colors";
import { white } from "@edulastic/colors";

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
  background: ${greenDark};
  color: ${white};
  width: 100px;
  margin-left: 5px;
`;

export const StyledText = styled.span`
  margin: 0 5px;
`;

export const CloseModalText = styled.span`
  font-size: 11px;
  margin-left: 15px;
`;

export const StyledTextInfo = styled.span`
  display: flex;
  justify-content: row;
  align-items: center;
  font-weight: 500;
`;
