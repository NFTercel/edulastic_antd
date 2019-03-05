import styled from "styled-components";
import { Paper } from "@edulastic/common";
import { mobileWidth } from "@edulastic/colors";

export const Container = styled(Paper)`
  width: 100%;
  margin-bottom: 20px;
  
   @media (max-width: ${mobileWidth}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > div {
      display: flex;
      flex-direction: column;
    }
`;
