import { max, cloneDeep } from "lodash";

export const getYAxis = (yAxisCount, stepSize) =>
  stepSize !== 0
    ? Array.from({ length: yAxisCount / stepSize + 1 }, (v, k) => k * stepSize)
    : Array.from({ length: yAxisCount }, (v, k) => k * 1);

export const getPadding = yAxis => max(yAxis).toString().length * 10;

export const getYAxisStep = (yAxisCount, height, margin, padding) =>
  yAxisCount !== 0 ? (height - margin - padding) / yAxisCount : height - margin - padding;

export const getStep = (data, width, margin, padding) =>
  data && data.length > 1 ? (width - margin - padding) / (data.length - 1) : 0;

export const getChangingStep = (yAxisCount, stepSize) => (Math.floor(stepSize / 5) < 1 ? 1 : Math.floor(stepSize / 5));

export const getGridVariables = (yAxisCount, stepSize, data, height, width, margin) => {
  const yAxis = getYAxis(yAxisCount, stepSize);
  const padding = getPadding(yAxis);
  const yAxisStep = getYAxisStep(yAxisCount, height, margin, padding);
  const step = getStep(data, width, margin, padding);
  const changingStep = getChangingStep(yAxisCount, stepSize);

  return { yAxis, padding, yAxisStep, changingStep, step };
};

export const getReCalculatedPoints = (array, { oldStep, yAxisStep, yAxisCount, changingStep }) =>
  array.map(dot => {
    const newDot = cloneDeep(dot);
    if (newDot.y / oldStep > yAxisCount) {
      newDot.y = 0;
    } else {
      newDot.y = Math.round(newDot.y / oldStep / changingStep) * yAxisStep * changingStep;
    }
    return { ...newDot };
  });

export const getReCalculatedDATAPoints = (array, { oldStep, yAxisStep, yAxisCount }) =>
  array.map(dot => {
    const newDot = cloneDeep(dot);
    if (newDot.y / oldStep > yAxisCount) {
      newDot.y = 0;
    } else {
      newDot.y = Math.round(newDot.y / oldStep) * yAxisStep;
    }
    return { ...newDot };
  });
