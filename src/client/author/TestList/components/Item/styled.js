import styled from "styled-components";
import { Rate } from "antd/lib/index";
import { blue, darkBlue, greenDark, grey } from "@edulastic/colors";
import { Card } from "@edulastic/common";

export const Container = styled(Card)`
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
  padding: 15px;
  border-bottom: 1px solid ${grey};

  div:last-child {
    width: 250px;

    & > span {
      width: 114.5px;
      height: 23.5px;

      &:nth-child(3) {
        margin-top: 6px;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Author = styled.div`
  width: 70%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-right: 1px solid ${grey};
  font-size: 13px;
  font-weight: 600;
`;

export const AuthorName = styled.span`
  color: ${greenDark};
`;

export const Icons = styled.div`
  display: flex;
  padding: 15px;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconText = styled.span`
  font-size: 13px;
`;

export const Header = styled.div`
  min-height: 100px;
  position: relative;
  background: url("https://fakeimg.pl/250x100/");
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Stars = styled(Rate)`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const StyledLink = styled.a`
  font-size: 14px;
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

export const Question = styled.div`
  margin-bottom: 15px;
`;
