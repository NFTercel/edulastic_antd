import { greenDark, tabletWidth, textColor } from "@edulastic/colors";
import styled from "styled-components";
import { Button } from "antd";
import { IconHeart, IconShare } from "@edulastic/icons";

export const Container = styled.div`
  border-bottom: 1px solid #f2f2f2;
  padding: 27px 0;

  @media (max-width: ${tabletWidth}) {
    flex-direction: column;
    padding: 28px;
  }
`;

export const Question = styled.div`
  display: flex;

  & p {
    margin: 0.5em 0;
    font-size: 13px;
  }

  @media (max-width: ${tabletWidth}) {
    width: 100%;
    margin-bottom: 15px;
    text-align: center;
  }
`;

export const QuestionContent = styled.div`
  flex: 1;

  @media (max-width: ${tabletWidth}) {
    text-align: left;
  }
`;

export const ViewButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${tabletWidth}) {
    margin-top: 25px;
  }
`;

export const ViewButtonStyled = styled(Button)`
  width: 144px;
  height: 50px;
  border-radius: 65px;
`;

export const Detail = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 18px;

  @media (max-width: ${tabletWidth}) {
    margin-top: 9px;
  }
`;

export const TypeCategory = styled.div`
  display: flex;
  margin-right: 24px;
  margin-bottom: 10px;

  @media (max-width: ${tabletWidth}) {
    display: block;
    margin-right: 0px;
    width: 100%;
  }
`;

export const DetailCategory = styled.div`
  display: flex;
  margin-right: 24px;

  @media (max-width: ${tabletWidth}) {
    width: 48%;
    margin-right: 0px;
    margin-top: 22px;
  }
`;

export const CategoryName = styled.span`
  display: flex;
  align-items: baseline;
  font-size: 13px;
  font-weight: 600;
  color: ${textColor};

  @media (max-width: ${tabletWidth}) {
    display: block;
    font-size: 14px;
  }
`;

export const CategoryContent = styled.div`
  margin-left: 3px;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${tabletWidth}) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: solid 1px #b1b1b1;
  height: 24px;
  padding: 6px 14px;
  margin-left: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: solid 1px #c8e8f6;
  background-color: #c8e8f6;

  span {
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #0083be;
  }

  @media (max-width: ${tabletWidth}) {
    margin-left: -3px;
    width: 48%;
    margin-top: 8px;
    height: 30px;
  }
`;

export const LabelText = styled.span`
  font-size: 9px;
  letter-spacing: 0.1px;
  text-align: center;
  color: ${textColor};
  text-transform: uppercase;

  @media (max-width: ${tabletWidth}) {
    letter-spacing: 0.2px;
    font-weight: bold;
    font-size: 10px;
  }
`;

export const GreenText = styled.span`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: ${greenDark};

  @media (max-width: ${tabletWidth}) {
    font-size: 14px;
  }
`;

export const GreyText = styled.span`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: ${textColor};

  @media (max-width: ${tabletWidth}) {
    font-size: 14px;
  }
`;

export const Categories = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${tabletWidth}) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 2px;
  }
`;

export const ShareIcon = styled(IconShare)`
  display: flex;
  align-items: center;
  fill: ${greenDark};
`;

export const HeartIcon = styled(IconHeart)`
  display: flex;
  align-items: center;
  fill: ${greenDark};
`;
