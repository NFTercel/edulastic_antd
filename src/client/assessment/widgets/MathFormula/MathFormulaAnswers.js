import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

import { math } from "@edulastic/constants";

import withPoints from "../../components/HOC/withPoints";
import CorrectAnswers from "../../components/CorrectAnswers";

import MathFormulaAnswer from "./components/MathFormulaAnswer";

const { methods } = math;

const MathFormulaWithPoints = withPoints(MathFormulaAnswer);
const initialMethod = {
  method: methods.EQUIV_SYMBOLIC,
  value: "",
  options: {
    significantDecimalPlaces: 10
  }
};

const MathFormulaAnswers = ({ item, setQuestionData }) => {
  const [correctTab, setCorrectTab] = useState(0);

  const handleAddAnswer = () => {
    const newItem = cloneDeep(item);

    if (!newItem.validation.alt_responses) {
      newItem.validation.alt_responses = [];
    }
    newItem.validation.alt_responses.push({
      score: 1,
      value: [initialMethod]
    });

    setQuestionData(newItem);
    setCorrectTab(correctTab + 1);
  };

  const handleChangeCorrectPoints = points => {
    const newItem = cloneDeep(item);
    newItem.validation.valid_response.score = points;
    setQuestionData(newItem);
  };

  const handleChangeAltPoints = (points, i) => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses[i].score = points;
    setQuestionData(newItem);
  };

  const handleCloseTab = tabIndex => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses.splice(tabIndex, 1);
    setQuestionData(newItem);
  };

  const handleChangeCorrectMethod = ({ index, prop, value }) => {
    const newItem = cloneDeep(item);
    newItem.validation.valid_response.value[index][prop] = value;

    if (
      [
        methods.IS_SIMPLIFIED,
        methods.IS_FACTORISED,
        methods.IS_EXPANDED,
        methods.IS_TRUE,
        methods.EQUIV_SYNTAX
      ].includes(newItem.validation.valid_response.value[index].method)
    ) {
      delete newItem.validation.valid_response.value[index].value;
    }

    setQuestionData(newItem);
  };

  const handleChangeAltMethod = answerIndex => ({ index, prop, value }) => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses[answerIndex].value[index][prop] = value;
    setQuestionData(newItem);
  };

  const handleAddCorrectMethod = () => {
    const newItem = cloneDeep(item);
    newItem.validation.valid_response.value.push(initialMethod);
    setQuestionData(newItem);
  };

  const handleAddAltMethod = answerIndex => () => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses[answerIndex].value.push(initialMethod);
    setQuestionData(newItem);
  };

  const handleDeleteCorrectMethod = index => {
    const newItem = cloneDeep(item);
    newItem.validation.valid_response.value.splice(index, 1);
    setQuestionData(newItem);
  };

  const handleDeleteAltMethod = answerIndex => index => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses[answerIndex].value.splice(index, 1);
    setQuestionData(newItem);
  };

  return (
    <CorrectAnswers
      onTabChange={setCorrectTab}
      correctTab={correctTab}
      onAdd={handleAddAnswer}
      validation={item.validation}
      onCloseTab={handleCloseTab}
    >
      <Fragment>
        {correctTab === 0 && (
          <div>
            <MathFormulaWithPoints
              item={item}
              onChange={handleChangeCorrectMethod}
              onAdd={handleAddCorrectMethod}
              onDelete={handleDeleteCorrectMethod}
              answer={item.validation.valid_response.value}
              points={item.validation.valid_response.score}
              onChangePoints={points => handleChangeCorrectPoints(points)}
            />
          </div>
        )}
        {item.validation.alt_responses &&
          !!item.validation.alt_responses.length &&
          item.validation.alt_responses.map((alter, i) => {
            if (i + 1 === correctTab) {
              return (
                <MathFormulaWithPoints
                  key={i}
                  item={item}
                  onChange={handleChangeAltMethod(i)}
                  onAdd={handleAddAltMethod(i)}
                  onDelete={handleDeleteAltMethod(i)}
                  answer={alter.value}
                  points={alter.score}
                  onChangePoints={points => handleChangeAltPoints(points, i)}
                />
              );
            }
            return null;
          })}
      </Fragment>
    </CorrectAnswers>
  );
};

MathFormulaAnswers.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired
};

export default MathFormulaAnswers;
