import {
  white,
  tabletWidth,
  textColor,
  newBlue,
  secondaryTextColor,
  greyDarken,
  greenPrimary
} from "@edulastic/colors";
import styled from "styled-components";
import { Button } from "antd";
import { IconHeart, IconShare, IconUser, IconId } from "@edulastic/icons";

export const Container = styled.div`
  border-bottom: 0;
  padding: 30px 0 5px 26px;

  &:not(:last-child) {
    border-bottom: 1px solid #f6f6f6;
  }
  @media (max-width: ${tabletWidth}) {
    flex-direction: column;
    padding: 20px 0;

    &:first-child {
      padding-top: 0;
    }
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
  margin-bottom: auto;

  @media (max-width: ${tabletWidth}) {
    margin-top: 25px;
  }
`;

export const ViewButtonStyled = styled(Button)`
  width: 136px;
  height: 40px;
  border-radius: 4px;
  background: ${white};
  box-shadow: 0 2px 4px 0 rgba(201, 208, 219, 0.5);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  border: 0;
  color: ${newBlue};
`;

export const AddButtonStyled = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: ${white};
  box-shadow: 0 2px 4px 0 rgba(201, 208, 219, 0.5);
  font-size: 11px;
  text-transform: uppercase;
  margin-left: 10px;
  color: ${newBlue};
  border: 0;
  padding: 0;

  svg {
    max-width: 13px;
    max-height: 13px;
    fill: ${newBlue};
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 43px;

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
  margin-left: 24px;

  svg {
    max-width: 18px;
    max-height: 16px;
    width: 100vw;
    height: 100vh;
    fill: ${newBlue};
  }
  @media (max-width: ${tabletWidth}) {
    width: 40%;
    margin-right: 0px;
    margin-top: 12px;
    margin-left: 0px;
  }
`;

export const CategoryName = styled.span`
  display: flex;
  align-items: baseline;
  font-size: 13px;
  font-weight: 600;
  margin-right: 8px;
  color: ${textColor};

  @media (max-width: ${tabletWidth}) {
    display: block;
    font-size: 14px;
  }
`;

export const CategoryContent = styled.div`
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${tabletWidth}) {
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 23.5px;
  padding: 6px 14px;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: solid 1px #e2e2e2;

  span {
    font-size: 10px;
    font-weight: 700;
    font-weight: bold;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    color: ${greyDarken};
  }

  @media (max-width: ${tabletWidth}) {
    margin-left: -3px;
    width: 48%;
    margin-top: 8px;
    height: 30px;
  }
`;

export const Count = styled.div`
  display: inline-flex;
  margin-left: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  color: ${greyDarken};
`;

export const LabelText = styled.span`
  font-size: 10px;
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

export const Text = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: ${secondaryTextColor};

  @media (max-width: ${tabletWidth}) {
    font-size: 14px;
  }
`;

export const Categories = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: auto;

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
  fill: ${newBlue};
`;

export const HeartIcon = styled(IconHeart)`
  display: flex;
  align-items: center;
  fill: ${newBlue};
`;

export const UserIcon = styled(IconUser)`
  display: flex;
  align-items: center;
  fill: ${newBlue};
`;

export const IdIcon = styled(IconId)`
  display: flex;
  align-items: center;
  fill: ${newBlue};
`;

export const StandardContent = styled.div`
  margin-right: 65px;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${tabletWidth}) {
    flex-wrap: wrap;
    margin-right: 0;
    align-items: center;
  }
`;

export const LabelStandard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 23.5px;
  padding: 6px 14px;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: solid 1px ${greenPrimary};

  span {
    font-size: 10px;
    font-weight: 700;
    font-weight: bold;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    color: ${greyDarken};
  }

  @media (max-width: ${tabletWidth}) {
    margin-left: -3px;
    width: 29%;
    margin-top: 8px;
    height: 30px;
  }
`;

export const LabelStandardText = styled.span`
  font-size: 10px;
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

export const CountGreen = styled.div`
  display: inline-flex;
  margin-left: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  color: ${greenPrimary};
`;
