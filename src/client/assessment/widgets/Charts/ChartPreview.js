import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";

import { Paper, Stimulus, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { questionType } from "@edulastic/constants";

import { CLEAR, PREVIEW } from "../../constants/constantsForQuestions";

import { getFontSize } from "../../utils/helpers";
import LineChart from "./LineChart";

const ChartPreview = ({ item, smallSize, saveAnswer, userAnswer, view }) => {
  const fontSize = getFontSize(get(item, "ui_style.fontsize"));
  const chartType = get(item, "ui_style.chart_type");

  const { chart_data } = item;

  let CurrentChart = null;

  switch (chartType) {
    case questionType.LINE_CHART:
      CurrentChart = LineChart;
      break;
    default:
  }

  const passData =
    userAnswer.length !== chart_data.data.length
      ? {
          ...chart_data,
          ui_style: { ...item.ui_style }
        }
      : {
          ...chart_data,
          ui_style: { ...item.ui_style },
          data: [...userAnswer]
        };

  return (
    <Paper style={{ fontSize }} padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />

      <CurrentChart {...passData} view={view} saveAnswer={saveAnswer} />
    </Paper>
  );
};

ChartPreview.propTypes = {
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  previewTab: PropTypes.string,
  userAnswer: PropTypes.array,
  view: PropTypes.string
};

ChartPreview.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  userAnswer: [],
  view: PREVIEW
};

export default withNamespaces("assessment")(ChartPreview);
