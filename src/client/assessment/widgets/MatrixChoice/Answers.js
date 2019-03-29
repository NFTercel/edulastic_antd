import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import produce from "immer";
import { Checkbox } from "antd";

import { FlexContainer } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import CorrectAnswers from "../../components/CorrectAnswers";
import withPoints from "../../components/HOC/withPoints";

import Matrix from "./components/Matrix";

const MatrixWithPoints = withPoints(Matrix);

const Answers = ({ item, setQuestionData, t }) => {
  const [correctTab, setCorrectTab] = useState(0);

  const handleAddAnswer = () => {
    setQuestionData(
      produce(item, draft => {
        if (!draft.validation.alt_responses) {
          draft.validation.alt_responses = [];
        }
        draft.validation.alt_responses.push({
          score: 1,
          value: item.validation.valid_response.value.map(() => null)
        });
      })
    );
    setCorrectTab(correctTab + 1);
  };

  const handleCheck = (field, altIndex) => ({ rowIndex, columnIndex, checked }) => {
    setQuestionData(
      produce(item, draft => {
        let findIndex;
        let value;

        if (field === "valid_response") {
          value = draft.validation.valid_response.value[rowIndex];
        }

        if (field === "alt_responses") {
          value = draft.validation.alt_responses[altIndex].value[rowIndex];
        }

        if (value) {
          findIndex = value.findIndex(i => i === columnIndex);
        }

        if (!checked) {
          value.splice(findIndex, 1);
        } else if (!value || !draft.multiple_responses) {
          value = [];
          value.push(columnIndex);
        } else {
          value.push(columnIndex);
        }

        if (field === "valid_response") {
          draft.validation.valid_response.value[rowIndex] = value;
        }

        if (field === "alt_responses") {
          draft.validation.alt_responses[altIndex].value[rowIndex] = value;
        }
      })
    );
  };

  const handleChangeValidPoints = points => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.valid_response.score = points;
      })
    );
  };

  const handleChangeAltPoints = (points, i) => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.alt_responses[i].score = points;
      })
    );
  };

  const reduceResponse = value =>
    value.map(val => {
      if (!val) return val;
      if (val.length) {
        val = [val[val.length - 1]];
      }
      return val;
    });

  const handleChangeMultiple = e => {
    const { checked } = e.target;
    setQuestionData(
      produce(item, draft => {
        draft.multiple_responses = checked;

        if (!checked) {
          draft.validation.valid_response.value = reduceResponse(draft.validation.valid_response.value);

          if (draft.validation.alt_responses && draft.validation.alt_responses.length) {
            draft.validation.alt_responses.map(res => {
              res.value = reduceResponse(res.value);
              return res;
            });
          }
        }
      })
    );
  };

  const handleCloseTab = tabIndex => {
    setQuestionData(
      produce(item, draft => {
        draft.validation.alt_responses.splice(tabIndex, 1);
      })
    );
  };

  const renderOptions = () => (
    <FlexContainer style={{ marginTop: 20 }}>
      <Checkbox data-cy="multi" onChange={handleChangeMultiple} checked={item.multiple_responses}>
        {t("component.matrix.multipleResponses")}
      </Checkbox>
    </FlexContainer>
  );

  return (
    <CorrectAnswers
      onTabChange={setCorrectTab}
      correctTab={correctTab}
      onAdd={handleAddAnswer}
      validation={item.validation}
      options={renderOptions()}
      onCloseTab={handleCloseTab}
    >
      <Fragment>
        {correctTab === 0 && (
          <div>
            <MatrixWithPoints
              stems={item.stems}
              options={item.options}
              uiStyle={item.ui_style}
              response={item.validation.valid_response}
              isMultiple={item.multiple_responses}
              onCheck={handleCheck("valid_response")}
              points={item.validation.valid_response.score}
              onChangePoints={points => handleChangeValidPoints(points)}
              data-cy="points"
            />
          </div>
        )}
        {item.validation.alt_responses &&
          !!item.validation.alt_responses.length &&
          item.validation.alt_responses.map((alter, i) => {
            if (i + 1 === correctTab) {
              return (
                <MatrixWithPoints
                  key={i}
                  stems={item.stems}
                  options={item.options}
                  uiStyle={item.ui_style}
                  response={item.validation.alt_responses[i]}
                  isMultiple={item.multiple_responses}
                  onCheck={handleCheck("alt_responses", i)}
                  points={item.validation.alt_responses[i].score}
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

Answers.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(Answers);
