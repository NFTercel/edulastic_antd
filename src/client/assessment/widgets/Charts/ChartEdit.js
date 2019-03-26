import "rc-color-picker/assets/index.css";
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { withNamespaces } from "@edulastic/localization";
import { Paper } from "@edulastic/common";

import { Input } from "antd";
import QuestionTextArea from "../../components/QuestionTextArea";
import CorrectAnswers from "../../components/CorrectAnswers";
import withPoints from "../../components/HOC/withPoints";
import { Subtitle } from "../../styled/Subtitle";

import { EDIT } from "../../constants/constantsForQuestions";
import Options from "./components/Options";
import ChartPreview from "./ChartPreview";
import UiInputGroup from "./components/UiInputGroup";
import PointsList from "./components/PointsList";
import withGrid from "./HOC/withGrid";
import { getGridVariables, getReCalculatedPoints, getReCalculatedDATAPoints } from "./helpers";

const OptionsList = withPoints(ChartPreview);

const ChartEdit = ({ item, setQuestionData, t }) => {
  const {
    chart_data: { data },
    ui_style: { yAxisCount, stepSize, height, width, margin }
  } = item;
  const { yAxisStep, changingStep } = getGridVariables(yAxisCount, stepSize, data, height, width, margin);

  const [oldStep, setOldStep] = useState(yAxisStep);
  const [correctTab, setCorrectTab] = useState(0);
  const [localMaxValue, setLocalMaxValue] = useState(yAxisCount);

  const [firstMount, setFirstMount] = useState(false);

  useEffect(() => {
    if (firstMount) {
      const newItem = cloneDeep(item);
      const variables = { oldStep, yAxisCount, yAxisStep, changingStep };

      newItem.chart_data.data = getReCalculatedDATAPoints(newItem.chart_data.data, variables);

      newItem.validation.alt_responses.forEach(altResp => {
        altResp.value = getReCalculatedPoints(altResp.value, variables);
      });

      newItem.validation.valid_response.value = getReCalculatedPoints(
        newItem.validation.valid_response.value,
        variables
      );

      setQuestionData(newItem);
      setOldStep(yAxisStep);
    }
  }, [yAxisCount, stepSize]);

  useEffect(() => {
    setFirstMount(true);
  }, []);

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleUiStyleChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    if (prop === "yAxisCount") {
      setLocalMaxValue(uiStyle);
    } else if (prop === "stepSize" && uiStyle === 0) {
      newItem.ui_style[prop] = 1;
      setQuestionData(newItem);
    } else {
      newItem.ui_style[prop] = uiStyle;
      setQuestionData(newItem);
    }
  };

  const onMaxValueBlur = () => {
    const newItem = cloneDeep(item);

    newItem.ui_style.yAxisCount = localMaxValue;

    setQuestionData(newItem);
  };

  const handleTitleChange = e => {
    const newItem = cloneDeep(item);

    newItem.chart_data.name = e.target.value;

    setQuestionData(newItem);
  };

  const handleAddPoint = () => {
    const newItem = cloneDeep(item);

    const newPoint = { x: `Bar ${newItem.chart_data.data.length + 1}`, y: 0 };

    newItem.chart_data.data.push({ ...newPoint });

    newItem.validation.alt_responses.forEach(altResp => {
      altResp.value.push({ ...newPoint });
    });

    newItem.validation.valid_response.value.push({ ...newPoint });

    setQuestionData(newItem);
  };

  const handlePointChange = index => (prop, value) => {
    const newItem = cloneDeep(item);

    switch (prop) {
      case "interactive": {
        newItem.chart_data.data[index].notInteractive = value;
        break;
      }
      case "label": {
        newItem.chart_data.data[index].x = value;
        newItem.validation.alt_responses.forEach(altResp => {
          altResp.value[index].x = value;
        });
        newItem.validation.valid_response.value[index].x = value;
        break;
      }
      case "value": {
        if (yAxisStep * value > yAxisCount * yAxisStep) {
          newItem.chart_data.data[index].y = yAxisCount * yAxisStep;
        } else {
          newItem.chart_data.data[index].y = yAxisStep * value;
        }
        break;
      }
      default:
    }

    setQuestionData(newItem);
  };

  const handleDelete = index => {
    const newItem = cloneDeep(item);

    newItem.chart_data.data.splice(index, 1);

    newItem.validation.alt_responses.forEach(altResp => {
      altResp.value.splice(index, 1);
    });

    newItem.validation.valid_response.value.splice(index, 1);

    setQuestionData(newItem);
  };

  const handleCloseTab = tabIndex => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses.splice(tabIndex, 1);

    setCorrectTab(0);
    setQuestionData(newItem);
  };

  const handleAddAnswer = () => {
    const newItem = cloneDeep(item);

    if (!newItem.validation.alt_responses) {
      newItem.validation.alt_responses = [];
    }
    newItem.validation.alt_responses.push({
      score: 1,
      value: newItem.validation.valid_response.value
    });

    setQuestionData(newItem);
    setCorrectTab(correctTab + 1);
  };

  const handlePointsChange = val => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.score = val;
    } else {
      newItem.validation.alt_responses[correctTab - 1].score = val;
    }

    setQuestionData(newItem);
  };

  const handleAnswerChange = ans => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.value = ans;
    } else {
      newItem.validation.alt_responses[correctTab - 1].value = ans;
    }

    setQuestionData(newItem);
  };

  const renderOptions = () => (
    <OptionsList
      item={item}
      points={
        correctTab === 0 ? item.validation.valid_response.score : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handlePointsChange}
      saveAnswer={handleAnswerChange}
      userAnswer={
        correctTab === 0 ? item.validation.valid_response.value : item.validation.alt_responses[correctTab - 1].value
      }
      view={EDIT}
    />
  );

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.chart.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder={t("component.chart.enterQuestion")}
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />

        <Subtitle>{t("component.chart.chartMainBlockTitle")}</Subtitle>

        <Subtitle>{t("component.chart.chartTitle")}</Subtitle>

        <Input size="large" value={item.chart_data.name} onChange={handleTitleChange} />

        <UiInputGroup
          onChange={handleUiStyleChange}
          firstInputType="text"
          secondInputType="text"
          firstAttr="xAxisLabel"
          secondAttr="yAxisLabel"
          firstFieldValue={item.ui_style.xAxisLabel}
          secondFieldValue={item.ui_style.yAxisLabel}
          t={t}
        />

        <UiInputGroup
          onChange={handleUiStyleChange}
          firstAttr="width"
          secondAttr="height"
          firstFieldValue={item.ui_style.width}
          secondFieldValue={item.ui_style.height}
          t={t}
        />

        <UiInputGroup
          onChange={handleUiStyleChange}
          firstAttr="stepSize"
          secondAttr="yAxisCount"
          onBlur={onMaxValueBlur}
          firstFieldValue={item.ui_style.stepSize}
          secondFieldValue={localMaxValue}
          t={t}
        />

        <PointsList
          handleChange={handlePointChange}
          ratio={yAxisStep}
          handleDelete={handleDelete}
          points={item.chart_data.data}
          buttonText={t("component.chart.addPoint")}
          onAdd={handleAddPoint}
        />

        <CorrectAnswers
          onTabChange={setCorrectTab}
          correctTab={correctTab}
          onAdd={handleAddAnswer}
          validation={item.validation}
          options={renderOptions()}
          onCloseTab={handleCloseTab}
        />
      </Paper>

      <Options />
    </Fragment>
  );
};

ChartEdit.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

const enhance = compose(
  withGrid,
  withNamespaces("assessment"),
  withTheme
);

export default enhance(ChartEdit);
