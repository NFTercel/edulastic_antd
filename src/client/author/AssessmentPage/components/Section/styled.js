import styled from "styled-components";
import { Input } from "antd";

import { IconCheck } from "@edulastic/icons";
import { secondaryTextColor, greenDark } from "@edulastic/colors";

export const SectionWrapper = styled.div`
  position: relative;
  margin: 17px 24px 17px 13px;
`;

export const SectionTitle = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: ${secondaryTextColor};
`;

export const SectionForm = styled(Input)`
  background: transparent;
  border-radius: unset;
  border: none;
  border-bottom: 1px solid #cbcbcb;
  box-shadow: none !important;
`;

export const SectionFormConfirmButton = styled(IconCheck)`
  position: absolute;
  bottom: 14px;
  right: 0;
  fill: ${greenDark};
  cursor: pointer;

  path {
    stroke: ${greenDark};
    stroke-width: 2;
  }
`;
