import styled from "styled-components";
import { blue, darkBlue, greenDark, grey } from "@edulastic/colors";
import { Card } from "@edulastic/common";
import { Col, Rate, Row } from "antd";

export const Container = styled.div`
  display: flex;
  padding: 36px;
  border-bottom: 1px solid ${grey};
`;

export const ListCard = styled(Card)`
  width: 190px;
  height: 106px;
  border-radius: 4px;

  .ant-card-body {
    padding: 0;
  }

  .ant-card-head {
    padding: 0;
  }

  .ant-card-head-title {
    padding: 0;
  }
`;

export const Inner = styled.div`
  padding: 10px 0px 0px 25px;
`;

export const Description = styled.div`
  font-size: 13px;
  color: #444444;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
`;

export const AuthorName = styled.span`
  color: ${greenDark};
`;

export const Header = styled.div`
  min-height: 106px;
  min-width: 190px;
  position: relative;
  background: url("https://fakeimg.pl/250x100/");
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Stars = styled(Rate)`
  position: absolute;
  top: 5px;
  left: 11px;
`;

export const StyledLink = styled.a`
  font-size: 16px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${blue};
  cursor: pointer;

  :hover {
    color: ${darkBlue};
  }
`;

export const ItemInformation = styled.div`
  display: flex;
`;

export const TypeContainer = styled.div`
  display: flex;
  margin-top: 15px;
  font-size: 13px;
  font-weight: 600;
  color: #444444;

  div:first-child {
    width: 250px;
    margin-left: 10px;

    & > span {
      width: 114.5px;
      height: 23.5px;

      &:nth-child(3) {
        margin-top: 6px;
      }
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: 'center;
`;

export const IconText = styled.span`
  font-size: 13;
`;

export const AuthorWrapper = styled(Col)`
  padding-left: 45px !important;
  padding-right: 0px !important;
`;

export const ContentWrapper = styled(Row)`
  width: 100%;
`;
