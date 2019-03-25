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

export const getGridVariables = (yAxisCount, stepSize, data, height, width, margin) => {
  const yAxis = getYAxis(yAxisCount, stepSize);
  const padding = getPadding(yAxis);
  const yAxisStep = getYAxisStep(yAxisCount, height, margin, padding);
  const step = getStep(data, width, margin, padding);

  return { yAxis, padding, yAxisStep, step };
};

export const getReCalculatedPoints = (array, { oldStep, yAxisStep, yAxisCount, stepSize }) =>
  array.map(dot => {
    const newDot = cloneDeep(dot);
    if (newDot.y / oldStep > yAxisCount) {
      newDot.y = 0;
    } else if ((newDot.y / oldStep) % stepSize !== 0) {
      newDot.y = (newDot.y / oldStep - ((newDot.y / oldStep) % stepSize)) * yAxisStep;
    } else {
      newDot.y = (newDot.y / oldStep) * yAxisStep;
    }
    return { ...newDot };
  });
