import styled from "styled-components";

export const PrintContainer = styled.div`
  width: 100%;
  background-color: #cccccc;
  display: block;
`;

export const Container = styled.div`
  padding: 0;
  width: 25cm;
  min-height: 29.7cm;
  margin: 0 auto;
  background-color: #fff;
  height: "";
  font-variant: normal !important;

  * {
    font-variant: normal !important;
  }

  .sc-bblaLu {
    page-break-before: always;
  }

  textarea.ant-input {
    display: none;
  }

  input[type="text"] {
    pointer-events: none;
  }

  .ant-card {
    max-width: 40%;
  }
`;

export const StyledTitle = styled.p`
  font-size: 30px;
  text-align: left;
  font-weight: bold;
  padding: 15px 0 0 25px;
  margin: 0;
`;

export const StudentInformation = styled.div`
  margin-right: auto;
`;

export const InfoItem = styled.p`
  font-size: 0.9em;
  font-weight: bold;
`;

export const StudentQuestionHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 25px;
`;

export const TimeContainer = styled.div`
  padding: 0 25px 0 0;
`;

export const Color = styled.span`
  color: #58b294;
`;

export const TimeItem = styled.p`
  font-size: 0.9em;
  font-weight: bold;
`;

export const ScoreContainer = styled.div`
  text-align: center;
`;

export const ScoreLabel = styled.p`
  color: #c0c0c0;
  font-size: 0.8em;
`;

export const TotalScore = styled.p`
  font-weight: bold;
  font-size: 2em;
`;

export const FractionLine = styled.p`
  width: 40px;
  height: 2px;
  background-color: #59595a;
  margin: auto;
`;
