import styled from "styled-components";
import { Button } from "antd";

export const ThumbnailsWrapper = styled.div`
  position: relative;
  width: 213px;
  height: calc(100vh - 62px);
  overflow-y: scroll;
  padding: 30px 28px;
  padding-bottom: 0;
  background: #ebebeb;
`;

export const ThumbnailsList = styled.div`
  margin-bottom: 70px;
`;

export const ReuploadButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  padding: 15px 0;
  background: #ebebeb;
`;

export const ReuploadButton = styled(Button)`
  width: 158px;
  height: 32px;
  border: 1px solid #aaafb8;
  color: #aaafb8;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 5px;
  background: #ebebeb;
`;
