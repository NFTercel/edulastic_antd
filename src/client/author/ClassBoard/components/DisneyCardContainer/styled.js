import { Pagination, Card } from "antd";
import styled from "styled-components";
import { themes } from "../../../../student/themes";

const classBoardTheme = themes.default.classboard;

export const StyledCardContiner = styled.div`
  margin: 0 auto;
  width: 95%;
`;

export const DisneyCard = styled.div``;

export const MainDiv = styled.div``;

export const PerfomanceSection = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 185px;
`;

export const StyledCard = styled(Card)`
  margin: auto;
  width: 22%;
  border-radius: 10px;
  box-shadow: 3px 2px 7px lightgray;
  display: inline-block;
  margin: 0 32px 32px 0;
  .ant-card-body {
    padding: 19px 22px;
  }
`;

export const Space = styled.div`
  display: inline-block;
  height: 30px;
`;

export const PagInfo = styled.span`
  font-weight: bold;
  font-size: 10px;
  display: block;
  color: ${classBoardTheme.CardPageColor};
  text-align: center;
  padding-top: 20px;
`;

export const GSpan = styled.span`
  font-size: 10px;
`;

export const PaginationInfoF = styled.div`
  display: flex;
`;

export const PaginationInfoS = styled.div`
  display: inline-block;
  margin-left: -5px;
  margin-top: 25px;
  width: 100%;
`;

export const PaginationInfoT = styled.div`
  display: inline-block;
  margin-left: -5px;
  margin-top: 25px;
  width: 100%;
`;

export const CircularDiv = styled.div`
  width: 42px;
  height: 42px;
  border: 2px solid #5cb497;
  display: block;
  border-radius: 50%;
  text-align: center;
  color: ${classBoardTheme.CardCircularColor};
  font-weight: 600;
  line-height: 38px;
`;

export const StyledDiv = styled.div`
  display: inline-block;
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

export const SquareColorDivGreen = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardSqurebgColor};
  margin: 10px 8px 0px 0px;
`;

export const SquareColorDivGray = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardColor};
  margin: 10px 8px 0px 0px;
`;

export const SquareColorDisabled = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardColor};
  opacity: 0.6;
  margin: 10px 8px 0px 0px;
`;

export const SquareColorDivPink = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardSqare};
  margin: 10px 8px 0px 0px;
`;

export const SquareColorDivYellow = styled.div`
  display: inline-block;
  width: 23px;
  height: 23px;
  border-radius: 3px;
  background-color: ${classBoardTheme.CardSquareDivColor};
  margin: 10px 8px 0px 0px;
`;

export const StyledParaF = styled.p`
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  margin-bottom: 5px;
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
  color: #434b5d;
`;
export const ColorSpan = styled.span`
  color: ${classBoardTheme.CardCircularColor};
`;

export const StyledParaSS = styled.p`
  font-size: 1.12em;
  font-weight: bold;
  margin-top: 5px;
`;

export const StyledParaSSS = styled.p`
  font-size: 1.12em;
  font-weight: bold;
  margin-top: 5px;
  color: ${classBoardTheme.CardCircularColor};
  display: inline-block;
`;

export const SpaceDiv = styled.div`
  display:inline-block
  width:20px;
`;

export const StyledDivLine = styled.div`
  width: 101%;
  height: 0.03em;
  border: 1px solid #f4f3f3;
  margin-top: 20px;
`;
