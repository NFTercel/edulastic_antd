import styled from "styled-components";

import { white, mainBlueColor } from "@edulastic/colors";

export const ThumbnailsItemWrapper = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
`;

export const PagePreview = styled.div`
  height: 149px;
  background: ${white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;

  .react-pdf__Page {
    position: relative;
    width: 158px;

    canvas {
      width: 100% !important;
      height: unset !important;
    }
  }
`;

export const PageNumber = styled.span`
  display: block;
  background: ${mainBlueColor};
  text-align: center;
  color: ${white};
  font-size: 13px;
  font-weight: bold;
  padding: 7px 0 6px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  user-select: none;
`;
