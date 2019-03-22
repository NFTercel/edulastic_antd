import styled from "styled-components";

import { secondaryTextColor } from "@edulastic/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

export const Title = styled.p`
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  color: #aaafb5;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 11px;
`;

export const Value = styled.p`
  font-size: 14px;
  line-height: 14px;
  font-weight: bold
  color: ${secondaryTextColor};
  margin: 0;
`;
