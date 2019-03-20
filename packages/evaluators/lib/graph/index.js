"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphTypes = require("./constants/graphTypes");

var _quadrants = _interopRequireDefault(require("./quadrants"));

var _axisLabels = _interopRequireDefault(require("./axisLabels"));

var _axisSegments = _interopRequireDefault(require("./axisSegments"));

var evaluator = function evaluator(_ref) {
  var _ref$userResponse = _ref.userResponse,
    userResponse = _ref$userResponse === void 0 ? [] : _ref$userResponse,
    validation = _ref.validation;
  var graphType = validation.graphType;

  switch (graphType) {
    case _graphTypes.GraphTypes.AXIS_LABELS:
      return (0, _axisLabels.default)({
        userResponse: userResponse,
        validation: validation
      });

    case _graphTypes.GraphTypes.AXIS_SEGMENTS:
      return (0, _axisSegments.default)({
        userResponse: userResponse,
        validation: validation
      });

    case _graphTypes.GraphTypes.QUADRANTS:
    case _graphTypes.GraphTypes.FIRST_QUADRANT:
    default:
      return (0, _quadrants.default)({
        userResponse: userResponse,
        validation: validation
      });
  }
};

var _default = evaluator;
exports.default = _default;
