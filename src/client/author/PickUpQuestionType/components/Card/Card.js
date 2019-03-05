import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import CardMapImage from "../../../src/assets/map-card.svg";
import { Content, Header, RoundDiv, StyledPreviewImage } from "../../components";
import { setUserAnswerAction } from "../../../../assessment/actions/answers";

const Card = ({ title, cardImage, onSelectQuestionType, data, setUserAnswer }) => {
  const smallData = {
    ...data,
    smallSize: true
  };

  const questionId = uuidv4();

  useEffect(() => {
    if (data.type === "math") {
      setUserAnswer(questionId, data.validation.valid_response.value[0].value);
    } else if (data.validation && data.validation.valid_response) {
      setUserAnswer(questionId, data.validation.valid_response.value);
    }
  }, [questionId]);

  return (
    <Fragment>
      <RoundDiv onClick={() => onSelectQuestionType(smallData)}>
        <Header>{title}</Header>
        <Content>
          <StyledPreviewImage src={cardImage || CardMapImage} />
        </Content>
      </RoundDiv>
    </Fragment>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  cardImage: PropTypes.object.isRequired,
  onSelectQuestionType: PropTypes.func.isRequired,
  setUserAnswer: PropTypes.func.isRequired
};

export default connect(
  null,
  { setUserAnswer: setUserAnswerAction }
)(Card);
