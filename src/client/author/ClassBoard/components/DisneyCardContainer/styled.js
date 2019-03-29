import { Pagination, Card, Col } from "antd";
import styled from "styled-components";
import { FlexContainer } from "@edulastic/common";
import { mobileWidth } from "@edulastic/colors";

import { themes } from "../../../../student/themes";

const classBoardTheme = themes.default.classboard;

export const StyledFlexContainer = styled(FlexContainer)`
  width: 100%;
  margin: 0px auto;
`;

export const StyledCardContiner = styled(FlexContainer)`
  margin: auto;
  margin-bottom: 30px;
  flex-wrap: wrap;
  width: 95%;
  justify-content: flex-start;
`;

export const DisneyCard = styled.div``;

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;

export const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MainDivLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  .ant-card {
    margin-right: 4%;
  }
`;

export const PerfomanceSection = styled(StyledFlexContainer)`
  align-items: baseline;
  justify-content: space-between;
`;

export const StyledCard = styled(Card)`
  margin-top: 20px;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  max-width: calc((100% - 80px) / 4);
  min-width: calc((100% - 80px) / 4);
  .ant-card-body {
    padding: 19px 22px;
  }
  @media only screen and (max-width: 1440px) {
    max-width: calc((100% - 80px) / 3);
    min-width: calc((100% - 80px) / 3);
  }
  @media only screen and (max-width: 1024px) {
    max-width: calc((100% - 80px) / 2);
    min-width: calc((100% - 80px) / 2);
  }
  @media only screen and (max-width: ${mobileWidth}) {
    max-width: 100%;
  }
  &:last-child {
    margin-right: 20px;
  }
`;

export const Space = styled.div`
  display: inline-block;
  height: 30px;
`;

export const PagInfo = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: #1774f0;
`;

export const GSpan = styled.span`
  font-size: 10px;
`;

export const PaginationInfoF = styled(StyledFlexContainer)`
  flex: 100%;
  align-items: center;
  margin-bottom: 28px;
`;

export const PaginationInfoS = styled(StyledFlexContainer)`
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const PaginationInfoT = styled(StyledFlexContainer)`
  flex-wrap: wrap;
`;

export const CircularDiv = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: #1774f0;
  font-weight: 600;
  line-height: 38px;
  background-color: #e7f1fd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledFlexDiv = styled.div`
  display: flex;
  align-items: baseline;
`;

export const StyledName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// export const StyledCheckbox = styled(Checkbox)`
//   font-size: 0.7em;
//   color: ${classBoardTheme.headerCheckboxColor};
//   align-self: center;
//   margin-left: auto;
// `;

const SquareColorDiv = styled.div`
  display: inline-block;
  width: 23px;
  height: 8px;
  margin: 1px 1px 0px 0px;
`;

export const SquareColorDivGreen = styled(SquareColorDiv)`
  background-color: #5eb500;
`;

export const SquareColorDivGray = styled(SquareColorDiv)`
  background-color: ${classBoardTheme.CardColor};
`;

export const SquareColorDisabled = styled(SquareColorDiv)`
  background-color: ${classBoardTheme.CardColor};
`;

export const SquareColorDivPink = styled(SquareColorDiv)`
  background-color: #f35f5f;
`;

export const SquareColorDivYellow = styled(SquareColorDiv)`
  background-color: #fdcc3b;
`;

export const StyledParaF = styled.p`
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #434b5d;
`;

export const StyledParaS = styled.p`
  font-size: 10px;
  line-height: 10px;
  font-weight: bold;
  color: ${classBoardTheme.CardCircularColor};
`;

export const StyledColorParaS = styled.p`
  font-size: 0.6em;
  font-weight: bold;
  color: ${classBoardTheme.CardDisneyColor};
`;

export const StyledParaFF = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #7c848e;
`;
export const ColorSpan = styled.span`
  color: ${classBoardTheme.CardCircularColor};
`;

export const StyledParaSS = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #434b5d;
`;

export const StyledParaSSS = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-left: 18px;
  color: #5eb500;
`;

export const SpaceDiv = styled.div`
  display: inline-block;
  width: 20px;
`;

export const StyledDivLine = styled.div`
  width: 101%;
  height: 0.03em;
  border: 1px solid #f4f3f3;
  margin-top: 20px;
`;

export const RightAlignedCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;
