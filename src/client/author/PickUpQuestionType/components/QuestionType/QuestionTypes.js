/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Dump } from "../../components";
import Card from "../Card/Card";
import { getCards } from "./constants";

const PickUpQuestionTypes = ({ onSelectQuestionType, questionType }) => (
  <FlexContainer>
    {getCards(onSelectQuestionType).map(
      ({ cardImage, data, onSelectQuestionType: onSelect, type }) =>
        type === questionType && (
          <Card key={data.title} title={data.title} data={data} cardImage={cardImage} onSelectQuestionType={onSelect} />
        )
    )}
    {[1, 2, 3, 4, 5, 6, 7].map(() => (
      <Dump />
    ))}
  </FlexContainer>
);

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: baseline;
`;

PickUpQuestionTypes.propTypes = {
  onSelectQuestionType: PropTypes.func.isRequired
};

export default PickUpQuestionTypes;
