export const getVariance = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += Number(arr[i]);
  }
  let mean = sum / arr.length;

  sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += Math.pow(arr[i] - mean, 2);
  }

  let variance = Number((sum / arr.length).toFixed(2));
  return variance;
};
export const getStandatdDeviation = variance => {
  return Number(Math.sqrt(variance, 2).toFixed(2));
};
