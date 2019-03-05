import React from "react";
import styled from "styled-components";
import { FlexContainer } from "../common";

import { IPAD_PORTRAIT_WIDTH } from "../../constants/others";

const PlayerFooter = ({ onCheckAnswer, isFirst, isLast, moveToPrev, moveToNext, t }) => {
  return (
    <MainFooter>
      <FlexContainer>
        <CheckAnswerBtn onClick={onCheckAnswer}>
          <CounterCircle>5</CounterCircle>
          <span>{t("pagination.checkanswer")} </span>
        </CheckAnswerBtn>
      </FlexContainer>
      <FlexContainer>
        <PrevButton disabled={isFirst()} onClick={moveToPrev}>
          <i className="fa fa-angle-left" />
        </PrevButton>
        <ControlBtn disabled={isLast()} onClick={moveToNext}>
          <i className="fa fa-angle-right" />
          <span>{t("pagination.next")}</span>
        </ControlBtn>
      </FlexContainer>
    </MainFooter>
  );
};

export default PlayerFooter;

const MainFooter = styled.div`
  background: transparent;
  padding: 50px 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const CounterCircle = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  margin: 10px;
  position: absolute;
  left: 0;
  top: 0px;
  padding-top: 2px;
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    left: 5px;
  }
`;

const ControlBtn = styled.button`
  width: 187px;
  height: 40px;
  background-color: ${props => props.theme.controlBtnSecondaryColor};
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${props => props.theme.controlBtnTextColor};
  font-size: 2rem;
  padding: 0;
  position: relative;
  display: block;
  text-transform: uppercase;
  &[disabled] {
    background-color: ${props => props.theme.btnDisabled};
  }
  .fa {
    position: absolute;
    left: 20px;
    top: 5px;
  }
  span {
    font-size: 14px;
    display: block;
    @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
      display: none;
    }
  }
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    width: 50px;
  }
`;

const PrevButton = styled(ControlBtn)`
  width: 50px;
`;

const CheckAnswerBtn = styled(ControlBtn)`
  background-color: ${props => props.theme.headerIconHoverColor};
  border-color: ${props => props.theme.headerIconHoverColor};
`;
