"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _shapeTypes = require("./constants/shapeTypes");

var _compareShapes = _interopRequireDefault(require("./compareShapes"));

var checkAnswer = function checkAnswer(answer, userResponse, ignoreRepeatedShapes) {
  var result = {
    commonResult: false,
    details: []
  };
  var trueAnswerValue = answer.value;
  var trueShapes = trueAnswerValue.filter(function (item) {
    return !item.subElement;
  });
  var compareShapes = new _compareShapes.default(trueAnswerValue, userResponse);
  userResponse.filter(function (elem) {
    return !elem.subElement;
  }).forEach(function (testShape) {
    var compareResult = {
      id: testShape.id,
      result: false
    };

    for (var i = 0; i < trueShapes.length; i++) {
      compareResult = compareShapes.compare(testShape.id, trueShapes[i].id);

      if (compareResult.result) {
        break;
      }
    }

    result.details.push(compareResult);
  }); // if result contain error shapes

  if (result.details.findIndex(function (item) {
    return !item.result;
  }) > -1) {
    result.commonResult = false;
    return result;
  } // check that all shapes are resolved


  var relatedIds = [];
  result.details.forEach(function (item) {
    if (relatedIds.findIndex(function (id) {
      return id === item.relatedId;
    }) === -1) {
      relatedIds.push(item.relatedId);
    }
  });

  if (relatedIds.length < trueShapes.length) {
    result.commonResult = false;
    return result;
  } // compare by slope


  if (ignoreRepeatedShapes && ignoreRepeatedShapes === 'yes') {
    result.commonResult = true;
    return result;
  } // compare by points


  if (ignoreRepeatedShapes && ignoreRepeatedShapes === 'strict') {
    result.commonResult = true;

    var _loop = function _loop(i) {
      var sameShapes = result.details.filter(function (item) {
        return item.relatedId === relatedIds[i];
      });
      var sameShapesType = userResponse.find(function (item) {
        return item.id === sameShapes[0].id;
      }).type;

      if (sameShapes.length > 1 && sameShapesType !== _shapeTypes.ShapeTypes.POINT && sameShapesType !== _shapeTypes.ShapeTypes.SEGMENT && sameShapesType !== _shapeTypes.ShapeTypes.VECTOR && sameShapesType !== _shapeTypes.ShapeTypes.POLYGON) {
        var allowedSubElementsIds = userResponse.find(function (item) {
          return item.id === sameShapes[0].id;
        }).subElementsIds;

        var _loop2 = function _loop2(j) {
          var checkableShape = userResponse.find(function (item) {
            return item.id === sameShapes[j].id;
          });

          switch (checkableShape.type) {
            case _shapeTypes.ShapeTypes.CIRCLE:
              if (checkableShape.subElementsIds.endPoint !== allowedSubElementsIds.endPoint) {
                sameShapes[j].result = false;
                result.commonResult = false;
              }

              break;

            case _shapeTypes.ShapeTypes.PARABOLA:
            case _shapeTypes.ShapeTypes.SINE:
            case _shapeTypes.ShapeTypes.LINE:
            case _shapeTypes.ShapeTypes.RAY:
            default:
              if (checkableShape.subElementsIds.startPoint !== allowedSubElementsIds.startPoint || checkableShape.subElementsIds.endPoint !== allowedSubElementsIds.endPoint) {
                sameShapes[j].result = false;
                result.commonResult = false;
              }

          }
        };

        for (var j = 1; j < sameShapes.length; j++) {
          _loop2(j);
        }
      }
    };

    for (var i = 0; i < relatedIds.length; i++) {
      _loop(i);
    }

    return result;
  } // compare by default


  result.commonResult = true;

  var _loop3 = function _loop3(i) {
    var sameShapes = result.details.filter(function (item) {
      return item.relatedId === relatedIds[i];
    });

    if (sameShapes.length > 1) {
      for (var j = 1; j < sameShapes.length; j++) {
        sameShapes[j].result = false;
        result.commonResult = false;
      }
    }
  };

  for (var i = 0; i < relatedIds.length; i++) {
    _loop3(i);
  }

  return result;
};

var evaluator = function evaluator(_ref) {
  var userResponse = _ref.userResponse,
      validation = _ref.validation;
  var valid_response = validation.valid_response,
      alt_responses = validation.alt_responses,
      ignore_repeated_shapes = validation.ignore_repeated_shapes;
  var score = 0;
  var maxScore = 0;
  var evaluation = {};
  var answers = [valid_response];

  if (alt_responses) {
    answers = answers.concat((0, _toConsumableArray2.default)(alt_responses));
  }

  var result = {};
  answers.forEach(function (answer, index) {
    result = checkAnswer(answer, userResponse, ignore_repeated_shapes);

    if (result.commonResult) {
      score = Math.max(answer.score, score);
    }

    maxScore = Math.max(answer.score, maxScore);
    evaluation[index] = result;
  });
  return {
    score: score,
    maxScore: maxScore,
    evaluation: evaluation
  };
};

var _default = evaluator;
exports.default = _default;