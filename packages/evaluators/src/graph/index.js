import { GraphTypes } from "./constants/graphTypes";
import quadrantsEvaluator from "./quadrants";
import axisLabelsEvaluator from "./axisLabels";
import axisSegmentsEvaluator from "./axisSegments";

const evaluator = ({ userResponse = [], validation }) => {
  const { graphType } = validation;

  switch (graphType) {
    case GraphTypes.AXIS_LABELS:
      return axisLabelsEvaluator({ userResponse, validation });
    case GraphTypes.AXIS_SEGMENTS:
      return axisSegmentsEvaluator({ userResponse, validation });
    case GraphTypes.QUADRANTS:
    case GraphTypes.FIRST_QUADRANT:
    default:
      return quadrantsEvaluator({ userResponse, validation });
  }
};

export default evaluator;
