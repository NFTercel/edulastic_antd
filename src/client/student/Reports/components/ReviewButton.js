import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//components
import styled from "styled-components";
import Review from "../../styled/AssignmentCardButton";

// show review button
const ReviewButton = ({ testActivityId, title, t, attempted, activityReview }) => (
  <ReviewButtonLink
    to={{
      pathname: `/home/testActivityReport/${testActivityId}`,
      testActivityId,
      title
    }}
  >
    {attempted && activityReview ? (
      <Review>
        <span data-cy="reviewButton">{t("common.review")}</span>
      </Review>
    ) : (
      ""
    )}
  </ReviewButtonLink>
);

ReviewButton.propTypes = {
  attempted: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  testActivityId: PropTypes.string.isRequired
};

export default ReviewButton;

const ReviewButtonLink = styled(Link)`
  display: inline-block;
  margin: 10px 15px 0 10px;
  width: 200px;
  button {
    margin: 0;
    max-width: 100%;
  }
  @media screen and (min-width: 1025px) {
    margin-right: 0px;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    margin: 10px 0 0;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
