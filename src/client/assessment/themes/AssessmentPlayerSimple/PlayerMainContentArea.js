import React from "react";
import styled from "styled-components";

import TestItemPreview from "../../components/TestItemPreview";
import SidebarQuestionList from "./PlayerSideBar";
import PlayerFooter from "./PlayerFooter";

import { IPAD_PORTRAIT_WIDTH } from "../../constants/others";

const PlayerContentArea = ({
  itemRows,
  previewTab,
  dropdownOptions,
  currentItem,
  gotoQuestion,
  onCheckAnswer,
  isFirst,
  isLast,
  moveToPrev,
  moveToNext,
  questions,
  t
}) => {
  return (
    <Main skinB="true">
      <MainWrapper>
        <MainContent>
          <TestItemPreview cols={itemRows} previewTab={previewTab} questions={questions} />
        </MainContent>
        <PlayerFooter
          isLast={isLast}
          isFirst={isFirst}
          moveToNext={moveToNext}
          moveToPrev={moveToPrev}
          onCheckAnswer={onCheckAnswer}
          t={t}
        />
      </MainWrapper>
      <Sidebar>
        <SidebarQuestionList questions={dropdownOptions} selectedQuestion={currentItem} gotoQuestion={gotoQuestion} />
      </Sidebar>
    </Main>
  );
};

export default PlayerContentArea;

const Main = styled.main`
  background-color: ${props => props.theme.mainBgColor};
  padding: 110px 0 0 140px;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  box-sizing: border-box;
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    padding: 174px 26px 0;
  }
`;

const MainWrapper = styled.div`
  flex: 4;
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    width: 100%;
  }
`;

const MainContent = styled.div`
  background-color: ${props => props.theme.mainContentBgColor};
  color: ${props => props.theme.mainContentTextColor};
  border-radius: 10px;
  height: 600px;
  padding: 40px;
  text-align: left;
  font-size: 18px;
  overflow: auto;

  & * {
    -webkit-touch-callout: none;
    user-select: none;
  }

  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    padding: 24px;
  }
`;
const Sidebar = styled.div`
  flex: 1;
  background-color: ${props => props.theme.sidebarBgColor};
  color: ${props => props.theme.sidebarTextColor};
  @media (max-width: ${IPAD_PORTRAIT_WIDTH}px) {
    display: none;
  }
`;
