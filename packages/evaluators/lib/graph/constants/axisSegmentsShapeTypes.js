"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AxisSegmentsShapeTypes = void 0;
var AxisSegmentsShapeTypes = {
  POINT: "segmentsPoint",
  SEGMENT: "bothIncludedSegment",
  SEGMENT_LEFT_POINT_HOLLOW: "onlyRightIncludedSegment",
  SEGMENT_RIGHT_POINT_HOLLOW: "onlyLeftIncludedSegment",
  SEGMENT_BOTH_POINT_HOLLOW: "bothNotIncludedSegment",
  RAY_LEFT_DIRECTION: "infinityToIncludedSegment",
  RAY_RIGHT_DIRECTION: "includedToInfinitySegment",
  RAY_LEFT_DIRECTION_RIGHT_HOLLOW: "infinityToNotIncludedSegment",
  RAY_RIGHT_DIRECTION_LEFT_HOLLOW: "notIncludedToInfinitySegment"
};
exports.AxisSegmentsShapeTypes = AxisSegmentsShapeTypes;
