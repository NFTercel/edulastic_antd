import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { formatTime } from "../utils";

const Attempt = ({ data, type, activityReview, releaseScore, showReviewButton, releaseGradeLabels }) => {
  const { correct = 0, wrong = 0, maxScore = 0, score = 0 } = data;
  const total = correct + wrong;
  const percentage = (score / maxScore) * 100 || 0;
  return (
    <AttemptsData>
      <RowData pagetype={type === "reports"}>
        <AnswerAndScore>
          <span data-cy="date">{formatTime(data.createdAt)}</span>
        </AnswerAndScore>
        {releaseScore !== releaseGradeLabels.DONT_RELEASE && (
          <React.Fragment>
            {releaseScore === releaseGradeLabels.WITH_ANSWERS && (
              <AnswerAndScore>
                <span data-cy="score">
                  {correct}/{total}
                </span>
              </AnswerAndScore>
            )}
            <AnswerAndScore>
              <span data-cy="percentage">{Math.floor(percentage * 100) / 100}%</span>
            </AnswerAndScore>
          </React.Fragment>
        )}

        <SpaceBetween pagetype={type === "reports"} />
        {type === "reports" && activityReview && showReviewButton ? (
          <AnswerAndScoreReview>
            <Link to={`/home/testActivityReport/${data._id}`}>
              <span data-cy="review">REVIEW</span>
            </Link>
          </AnswerAndScoreReview>
        ) : (
          (showReviewButton || type !== "reports") && <EmptyScoreBox />
        )}
      </RowData>
    </AttemptsData>
  );
};

export default Attempt;

Attempt.propTypes = {
  data: PropTypes.object.isRequired
};

const AttemptsData = styled.div`
  margin-top: 7px;
`;

const AnswerAndScore = styled.div`
  width: 135px;
  display: flex;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 31px;
    font-weight: bold;
    color: #434b5d;
  }
  @media screen and (max-width: 767px) {
    width: 33%;
  }
`;

const SpaceBetween = styled.div`
  width: 10px;
  @media screen and (max-width: 1024px) {
    display: ${props => (props.pagetype ? "initial" : "none !important")};
  }
`;

const AnswerAndScoreReview = styled(AnswerAndScore)`
  span {
    color: #00b0ff;
    cursor: pointer;
  }
  @media screen and (min-width: 769px) {
    width: 200px;
  }
  @media screen and (max-width: 767px) {
    width: 33%;
  }
`;

const EmptyScoreBox = styled(AnswerAndScoreReview)`
  @media screen and (max-width: 1024px) {
    display: none !important;
  }
`;

const RowData = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 4px;
  height: 30px;
  @media screen and (max-width: 767px) {
    height: auto;
  }
  div {
    background-color: #f8f8f8;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 767px) {
      justify-content: flex-start;
    }
  }
  span {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #9ca0a9;
  }
`;
