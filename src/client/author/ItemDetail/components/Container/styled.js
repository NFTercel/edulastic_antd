import { Paper } from "@edulastic/common";
import { mobileWidth } from "@edulastic/colors";
import styled from "styled-components";

export const Content = styled(Paper)`
  display: flex;
  margin: 0px 40px 50px 40px;
  flex-wrap: nowrap;
  padding: 0;
  position: relative;

  @media (max-width: ${mobileWidth}) {
    margin: 50px 25px;
  }
`;

export const PreviewContent = styled(Content)`
  @media (max-width: ${mobileWidth}) {
    & > div {
      padding: 0;
    }
  }
`;

export const ItemDetailWrapper = styled.div`
  display: flex;
  padding: 0px 40px;
  flex-wrap: nowrap;
  width: 100%;

  @media (max-width: ${mobileWidth}) {
    margin-top: 50px;
    padding: 0px 25px;
  }
`;
