import test from 'ava';
import { graph as evaluator } from '../src/index';
import { IgnoreRepeatedShapes } from '../src/graph/quadrants/constants/ignoreRepeatedShapes';
import { ScoringType } from '../src/const/scoring';

import {
  trueAnswerWith1Point, trueAnswerWith2Points,
  trueAnswerWith1Line, trueLineWithOtherPoints, secondTrueLine, errorLine,
  EV315_trueAnswer, EV315_testPoints,
  trueAnswerWith1Ray, trueRayWithOtherPoints, secondTrueRay, errorRay,
  trueAnswerWith1Segment, trueSegmentWithReversedPoints, secondTrueSegment, errorSegment,
  trueAnswerWith1Vector, vectorWithReversedPoints, secondTrueVector, errorVector,
  trueAnswerWith1Circle, trueCircleWithOtherPoints, secondTrueCircle, errorCircle,
  trueAnswerWith1Parabola, trueParabolaWithOtherPoints, secondTrueParabola, errorParabola,
  trueAnswerWith1Sine, trueSineWithOtherPoints, secondTrueSine, errorSine,
  trueAnswerWith1Polygon, truePolygonWithOtherOrderedPoints, secondTruePolygon, errorPolygon,
  axisLabelsObj1, axisLabelsObj2, axisLabelsObj3, axisLabelsObj4,
  axisSegmentsObj1, axisSegmentsObj2, axisSegmentsObj3,
  axisSegmentsObj4, axisSegmentsObj5, axisSegmentsObj6
} from './data/graph';

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

// Point ===========================================================================================

test('#GraphPoint: check 1 true point', async (t) => {
  // prepare data
  const eObj = {
    validation: trueAnswerWith1Point,
    userResponse: trueAnswerWith1Point.valid_response.value
  };
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_1').result, true);
});

test('#GraphPoint: check 1 error point', async (t) => {
  // prepare data
  const eObj = {
    validation: trueAnswerWith1Point,
    userResponse: clone(trueAnswerWith1Point.valid_response.value)
  };
  eObj.userResponse[0].x = -10;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_1').result, false);
});

test('#GraphPoint: check 2 true points', async (t) => {
  // prepare data
  const eObj = {
    validation: trueAnswerWith2Points,
    userResponse: trueAnswerWith2Points.valid_response.value
  };
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_1').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_2').result, true);
});

test('#GraphPoint: check 2 points: 1 - error point, 2: true point', async (t) => {
  // prepare data
  const eObj = {
    validation: trueAnswerWith2Points,
    userResponse: clone(trueAnswerWith2Points.valid_response.value)
  };
  eObj.userResponse[0].x = -10;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_1').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_2').result, true);
});

test('#GraphPoint: check 2 error points', async (t) => {
  // prepare data
  const eObj = {
    validation: trueAnswerWith2Points,
    userResponse: clone(trueAnswerWith2Points.valid_response.value)
  };
  eObj.userResponse[0].x = -10;
  eObj.userResponse[1].x = 20;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_1').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_2').result, false);
});

test('#GraphPoint: there are not all points', async (t) => {
  // prepare data
  const eObj = {
    validation: trueAnswerWith2Points,
    userResponse: trueAnswerWith1Point.valid_response.value
  };
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_1').result, true);
});

// Line ============================================================================================

test('#GraphLine: check 1 true line {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: trueAnswerWith1Line.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphLine: check 1 true line {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: trueAnswerWith1Line.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphLine: check 1 true line {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: trueAnswerWith1Line.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphLine: check 1 error line {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: errorLine
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphLine: check 1 error line {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: errorLine
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphLine: check 1 error line {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: errorLine
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphLine: check 1 true line, but in test answer 3 true lines {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: clone(trueAnswerWith1Line.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Line.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueLineWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphLine: check 1 true line, but in test answer 3 true lines {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: clone(trueAnswerWith1Line.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Line.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueLineWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphLine: check 1 true line, but in test answer 3 true lines {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: clone(trueAnswerWith1Line.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Line.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueLineWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphLine: check 2 true lines {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: clone(trueAnswerWith1Line.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueLine);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTrueLine);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphLine: check 2 lines: 1 - true line, 2 - error line {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: clone(trueAnswerWith1Line.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueLine);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorLine);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphLine: there are not all lines', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Line),
    userResponse: trueAnswerWith1Line.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueLine);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphLine: EV-315', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(EV315_trueAnswer),
    userResponse: EV315_testPoints
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, true);
});

// Ray =============================================================================================

test('#GraphRay: check 1 true ray {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: trueAnswerWith1Ray.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphRay: check 1 true ray {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: trueAnswerWith1Ray.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphRay: check 1 true ray {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: trueAnswerWith1Ray.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphRay: check 1 error ray {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: errorRay
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphRay: check 1 error ray {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: errorRay
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphRay: check 1 error ray {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: errorRay
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphRay: check 1 true ray, but in test answer 3 true rays {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: clone(trueAnswerWith1Ray.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Ray.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueRayWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphRay: check 1 true ray, but in test answer 3 true rays {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: clone(trueAnswerWith1Ray.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Ray.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueRayWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphRay: check 1 true ray, but in test answer 3 true rays {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: clone(trueAnswerWith1Ray.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Ray.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueRayWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphRay: check 2 true ray {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: clone(trueAnswerWith1Ray.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueRay);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTrueRay);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphRay: check 2 ray: 1 - true ray, 2 - error ray {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: clone(trueAnswerWith1Ray.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueRay);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorRay);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphRay: there are not all rays', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Ray),
    userResponse: trueAnswerWith1Ray.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueRay);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

// Segment =========================================================================================

test('#GraphSegment: check 1 true segment {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: trueAnswerWith1Segment.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphSegment: check 1 true segment {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: trueAnswerWith1Segment.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphSegment: check 1 true segment {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: trueAnswerWith1Segment.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphSegment: check 1 error segment {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: errorSegment
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSegment: check 1 error segment {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: errorSegment
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSegment: check 1 error segment {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: errorSegment
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSegment: check 1 true segment, but in test answer 3 true segments {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: clone(trueAnswerWith1Segment.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Segment.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse.push(trueSegmentWithReversedPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphSegment: check 1 true segment, but in test answer 3 true segments {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: clone(trueAnswerWith1Segment.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Segment.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse.push(trueSegmentWithReversedPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphSegment: check 1 true segment, but in test answer 3 true segments {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: clone(trueAnswerWith1Segment.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Segment.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse.push(trueSegmentWithReversedPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphSegment: check 2 true segment {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: clone(trueAnswerWith1Segment.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueSegment);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTrueSegment);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphSegment: check 2 segment: 1 - true segment, 2 - error segment {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: clone(trueAnswerWith1Segment.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueSegment);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorSegment);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSegment: there are not all segments', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Segment),
    userResponse: trueAnswerWith1Segment.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueSegment);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

// Vector ==========================================================================================

test('#GraphVector: check 1 true vector {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: trueAnswerWith1Vector.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphVector: check 1 true vector {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: trueAnswerWith1Vector.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphVector: check 1 true vector {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: trueAnswerWith1Vector.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphVector: check 1 error vector {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: errorVector
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphVector: check 1 error vector {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: errorVector
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphVector: check 1 error vector {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: errorVector
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphVector: check 1 true vector, but in test answer 2 true vectors {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: clone(trueAnswerWith1Vector.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Vector.valid_response.value[2], { id: 'lrn_10' }));
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
});

test('#GraphVector: check 1 true vector, but in test answer 2 true vectors {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: clone(trueAnswerWith1Vector.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Vector.valid_response.value[2], { id: 'lrn_10' }));
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
});

test('#GraphVector: check 1 true vector, but in test answer 2 true vectors {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: clone(trueAnswerWith1Vector.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Vector.valid_response.value[2], { id: 'lrn_10' }));
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
});

test('#GraphVector: check 2 true vectors {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: clone(trueAnswerWith1Vector.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueVector);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTrueVector);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphVector: check 2 vectors: 1 - true vector, 2 - error vector {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: clone(trueAnswerWith1Vector.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueVector);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorVector);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphVector: check 2 vectors: 1 - true vector, 2 - reversed vector {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: clone(trueAnswerWith1Vector.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueVector);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(vectorWithReversedPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphVector: there are not all vectors', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Vector),
    userResponse: trueAnswerWith1Vector.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueVector);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

// Circle ==========================================================================================

test('#GraphCircle: check 1 true circle {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: trueAnswerWith1Circle.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphCircle: check 1 true circle {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: trueAnswerWith1Circle.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphCircle: check 1 true circle {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: trueAnswerWith1Circle.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphCircle: check 1 error circle {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: errorCircle
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphCircle: check 1 error circle {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: errorCircle
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphCircle: check 1 error circle {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: errorCircle
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphCircle: check 1 true circle, but in test answer 3 true circles {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: clone(trueAnswerWith1Circle.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Circle.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueCircleWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphCircle: check 1 true circle, but in test answer 3 true circles {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: clone(trueAnswerWith1Circle.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Circle.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueCircleWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphCircle: check 1 true circle, but in test answer 3 true circles {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: clone(trueAnswerWith1Circle.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Circle.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueCircleWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphCircle: check 2 true circles {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: clone(trueAnswerWith1Circle.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueCircle);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTrueCircle);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphCircle: check 2 circles: 1 - true circle, 2 - error circle {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: clone(trueAnswerWith1Circle.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueCircle);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorCircle);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphCircle: there are not all circles', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Circle),
    userResponse: trueAnswerWith1Circle.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueCircle);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

// Parabola ========================================================================================

test('#GraphParabola: check 1 true parabola {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: trueAnswerWith1Parabola.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphParabola: check 1 true parabola {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: trueAnswerWith1Parabola.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphParabola: check 1 true parabola {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: trueAnswerWith1Parabola.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphParabola: check 1 error parabola {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: errorParabola
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphParabola: check 1 error parabola {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: errorParabola
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphParabola: check 1 error parabola {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: errorParabola
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphParabola: check 1 true parabola, but in test answer 3 true parabolas {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: clone(trueAnswerWith1Parabola.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Parabola.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueParabolaWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphParabola: check 1 true parabola, but in test answer 3 true parabolas {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: clone(trueAnswerWith1Parabola.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Parabola.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueParabolaWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphParabola: check 1 true parabola, but in test answer 3 true parabolas {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: clone(trueAnswerWith1Parabola.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Parabola.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueParabolaWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphParabola: check 2 true parabolas {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: clone(trueAnswerWith1Parabola.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueParabola);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTrueParabola);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphParabola: check 2 parabolas: 1 - true parabola, 2 - error parabola {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: clone(trueAnswerWith1Parabola.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueParabola);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorParabola);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphParabola: there are not all parabolas', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Parabola),
    userResponse: trueAnswerWith1Parabola.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueParabola);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

// Sine ============================================================================================

test('#GraphSine: check 1 true sine {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: trueAnswerWith1Sine.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphSine: check 1 true sine {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: trueAnswerWith1Sine.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphSine: check 1 true sine {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: trueAnswerWith1Sine.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphSine: check 1 error sine {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: errorSine
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSine: check 1 error sine {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: errorSine
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSine: check 1 error sine {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: errorSine
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSine: check 1 true sine, but in test answer 3 true sines {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: clone(trueAnswerWith1Sine.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Sine.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueSineWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphSine: check 1 true sine, but in test answer 3 true sines {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: clone(trueAnswerWith1Sine.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Sine.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueSineWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphSine: check 1 true sine, but in test answer 3 true sines {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: clone(trueAnswerWith1Sine.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Sine.valid_response.value[2], { id: 'lrn_10' }));
  eObj.userResponse = eObj.userResponse.concat(trueSineWithOtherPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphSine: check 2 true sines {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: clone(trueAnswerWith1Sine.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueSine);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTrueSine);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphSine: check 2 sines: 1 - true sine, 2 - error sine {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: clone(trueAnswerWith1Sine.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueSine);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorSine);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphSine: there are not all sines', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Sine),
    userResponse: trueAnswerWith1Sine.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTrueSine);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

// Polygon =========================================================================================

test('#GraphPolygon: check 1 true polygon {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: trueAnswerWith1Polygon.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphPolygon: check 1 true polygon {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: trueAnswerWith1Polygon.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphPolygon: check 1 true polygon {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: trueAnswerWith1Polygon.valid_response.value
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

test('#GraphPolygon: check 1 error polygon {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: errorPolygon
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphPolygon: check 1 error polygon {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: errorPolygon
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphPolygon: check 1 error polygon {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: errorPolygon
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphPolygon: check 1 true polygon, but in test answer 3 true polygons {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: clone(trueAnswerWith1Polygon.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Polygon.valid_response.value[4], { id: 'lrn_10' }));
  eObj.userResponse.push(truePolygonWithOtherOrderedPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, false);
});

test('#GraphPolygon: check 1 true polygon, but in test answer 3 true polygons {ignoreRepeatedShapes = COMPARE_BY_SLOPE}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: clone(trueAnswerWith1Polygon.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_SLOPE;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Polygon.valid_response.value[4], { id: 'lrn_10' }));
  eObj.userResponse.push(truePolygonWithOtherOrderedPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphPolygon: check 1 true polygon, but in test answer 3 true polygons {ignoreRepeatedShapes = COMPARE_BY_POINTS}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: clone(trueAnswerWith1Polygon.valid_response.value)
  };
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.COMPARE_BY_POINTS;
  eObj.userResponse.push(Object.assign({}, trueAnswerWith1Polygon.valid_response.value[4], { id: 'lrn_10' }));
  eObj.userResponse.push(truePolygonWithOtherOrderedPoints);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_10').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_6').result, true);
});

test('#GraphPolygon: check 2 true polygons {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: clone(trueAnswerWith1Polygon.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTruePolygon);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(secondTruePolygon);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_13').result, true);
});

test('#GraphPolygon: check 2 polygons: 1 - true polygon, 2 - error polygon {ignoreRepeatedShapes = NO}', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: clone(trueAnswerWith1Polygon.valid_response.value)
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTruePolygon);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  eObj.userResponse = eObj.userResponse.concat(errorPolygon);
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_9').result, false);
});

test('#GraphPolygon: there are not all polygons', async (t) => {
  // prepare data
  const eObj = {
    validation: clone(trueAnswerWith1Polygon),
    userResponse: trueAnswerWith1Polygon.valid_response.value
  };
  eObj.validation.valid_response.value = eObj.validation.valid_response.value.concat(secondTruePolygon);
  eObj.validation.ignore_repeated_shapes = IgnoreRepeatedShapes.NO;
  // action
  const result = evaluator(eObj);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.id === 'lrn_3').result, true);
});

// Axis Labels =====================================================================================

test('#AxisLabels: all labels true', async (t) => {
  // action
  const result = evaluator(axisLabelsObj1);
  // check
  t.is(result.evaluation[0].commonResult, true);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice A').result, true);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice B').result, true);
});

test('#AxisLabels: all labels false', async (t) => {
  // action
  const result = evaluator(axisLabelsObj2);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice A').result, false);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice B').result, false);
});

test('#AxisLabels: only some labels true', async (t) => {
  // action
  const result = evaluator(axisLabelsObj3);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice A').result, true);
});

test('#AxisLabels: there are all true labels, but there is excess', async (t) => {
  // action
  const result = evaluator(axisLabelsObj4);
  // check
  t.is(result.evaluation[0].commonResult, false);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice A').result, true);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice B').result, true);
  t.is(result.evaluation[0].details.find(item => item.point === 'Choice C').result, false);
});


// Axis Segments ===================================================================================

test('#AxisSegments: true userResponse, EXACT_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj1);
  obj.validation.scoring_type = ScoringType.EXACT_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 5);
  t.is(result.maxScore, 5);
  t.is(result.evaluation[0].score, 5);
  t.is(result.evaluation[0].result, true);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.validation.valid_response.value[0]);
  t.is(result.evaluation[0].details[0].result, true);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);
});

test('#AxisSegments: true userResponse, PARTIAL_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj1);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 10);
  t.is(result.maxScore, 10);
  t.is(result.evaluation[0].score, 10);
  t.is(result.evaluation[0].result, true);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.validation.valid_response.value[0]);
  t.is(result.evaluation[0].details[0].result, true);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);
});

test('#AxisSegments: true userResponse, PARTIAL_MATCH_V2', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj1);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH_V2;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 5);
  t.is(result.maxScore, 5);
  t.is(result.evaluation[0].score, 5);
  t.is(result.evaluation[0].result, true);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.validation.valid_response.value[0]);
  t.is(result.evaluation[0].details[0].result, true);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);
});

test('#AxisSegments: error userResponse, EXACT_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj2);
  obj.validation.scoring_type = ScoringType.EXACT_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 0);
  t.is(result.maxScore, 5);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);
});

test('#AxisSegments: error userResponse, PARTIAL_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj2);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 0);
  t.is(result.maxScore, 10);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);
});

test('#AxisSegments: error userResponse, PARTIAL_MATCH_V2', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj2);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH_V2;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 0);
  t.is(result.maxScore, 5);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);
});

test('#AxisSegments: true userResponse, alt_responses, max score, EXACT_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj3);
  obj.validation.scoring_type = ScoringType.EXACT_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 7);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 7);
  t.is(result.evaluation[1].result, true);
  t.is(result.evaluation[2].score, 0);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.validation.alt_responses[0].value[0]);
  t.is(result.evaluation[1].details[0].result, true);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.validation.alt_responses[0].value[1]);
  t.is(result.evaluation[1].details[1].result, true);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[2].details[1].result, false);
});

test('#AxisSegments: true userResponse, alt_responses, max score, PARTIAL_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj3);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 14);
  t.is(result.maxScore, 14);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 14);
  t.is(result.evaluation[1].result, true);
  t.is(result.evaluation[2].score, 0);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.validation.alt_responses[0].value[0]);
  t.is(result.evaluation[1].details[0].result, true);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.validation.alt_responses[0].value[1]);
  t.is(result.evaluation[1].details[1].result, true);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[2].details[1].result, false);
});

test('#AxisSegments: true userResponse, alt_responses, max score, PARTIAL_MATCH_V2', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj3);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH_V2;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 7);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 7);
  t.is(result.evaluation[1].result, true);
  t.is(result.evaluation[2].score, 0);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.validation.alt_responses[0].value[0]);
  t.is(result.evaluation[1].details[0].result, true);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.validation.alt_responses[0].value[1]);
  t.is(result.evaluation[1].details[1].result, true);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[2].details[1].result, false);
});

test('#AxisSegments: true userResponse, alt_responses, not max score, EXACT_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj4);
  obj.validation.scoring_type = ScoringType.EXACT_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 2);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 0);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 2);
  t.is(result.evaluation[2].result, true);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[1].details[0].result, false);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.validation.alt_responses[1].value[0]);
  t.is(result.evaluation[2].details[0].result, true);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.validation.alt_responses[1].value[1]);
  t.is(result.evaluation[2].details[1].result, true);
});

test('#AxisSegments: true userResponse, alt_responses, not max score, PARTIAL_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj4);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 5);
  t.is(result.maxScore, 14);
  t.is(result.evaluation[0].score, 5);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 0);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 4);
  t.is(result.evaluation[2].result, true);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[1].details[0].result, false);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.validation.alt_responses[1].value[0]);
  t.is(result.evaluation[2].details[0].result, true);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.validation.alt_responses[1].value[1]);
  t.is(result.evaluation[2].details[1].result, true);
});

test('#AxisSegments: true userResponse, alt_responses, not max score, PARTIAL_MATCH_V2', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj4);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH_V2;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 2);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 2);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 0);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 2);
  t.is(result.evaluation[2].result, true);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[1].details[0].result, false);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.validation.alt_responses[1].value[0]);
  t.is(result.evaluation[2].details[0].result, true);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.validation.alt_responses[1].value[1]);
  t.is(result.evaluation[2].details[1].result, true);
});

test('#AxisSegments: partially true userResponse, alt_responses, EXACT_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj5);
  obj.validation.scoring_type = ScoringType.EXACT_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 0);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 0);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 0);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.validation.alt_responses[0].value[0]);
  t.is(result.evaluation[1].details[0].result, true);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.validation.alt_responses[1].value[1]);
  t.is(result.evaluation[2].details[1].result, true);
});

test('#AxisSegments: partially true userResponse, alt_responses, PARTIAL_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj5);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 7);
  t.is(result.maxScore, 14);
  t.is(result.evaluation[0].score, 5);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 7);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 2);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.validation.alt_responses[0].value[0]);
  t.is(result.evaluation[1].details[0].result, true);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.validation.alt_responses[1].value[1]);
  t.is(result.evaluation[2].details[1].result, true);
});

test('#AxisSegments: partially true userResponse, alt_responses, PARTIAL_MATCH_V2', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj5);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH_V2;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 3);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 2);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 3);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 1);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.validation.valid_response.value[1]);
  t.is(result.evaluation[0].details[1].result, true);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.validation.alt_responses[0].value[0]);
  t.is(result.evaluation[1].details[0].result, true);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.validation.alt_responses[1].value[1]);
  t.is(result.evaluation[2].details[1].result, true);
});

test('#AxisSegments: error userResponse, alt_responses, EXACT_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj6);
  obj.validation.scoring_type = ScoringType.EXACT_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 0);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 0);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 0);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[1].details[0].result, false);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[2].details[1].result, false);
});

test('#AxisSegments: error userResponse, alt_responses, PARTIAL_MATCH', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj6);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 0);
  t.is(result.maxScore, 14);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 0);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 0);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[1].details[0].result, false);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[2].details[1].result, false);
});

test('#AxisSegments: error userResponse, alt_responses, PARTIAL_MATCH_V2', async (t) => {
  // prepare data
  const obj = clone(axisSegmentsObj6);
  obj.validation.scoring_type = ScoringType.PARTIAL_MATCH_V2;
  // action
  const result = evaluator(obj);
  // check
  t.is(result.score, 0);
  t.is(result.maxScore, 7);
  t.is(result.evaluation[0].score, 0);
  t.is(result.evaluation[0].result, false);
  t.is(result.evaluation[1].score, 0);
  t.is(result.evaluation[1].result, false);
  t.is(result.evaluation[2].score, 0);
  t.is(result.evaluation[2].result, false);

  t.deepEqual(result.evaluation[0].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[0].details[0].result, false);
  t.deepEqual(result.evaluation[0].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[0].details[1].result, false);

  t.deepEqual(result.evaluation[1].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[1].details[0].result, false);
  t.deepEqual(result.evaluation[1].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[1].details[1].result, false);

  t.deepEqual(result.evaluation[2].details[0].shape, obj.userResponse[0]);
  t.is(result.evaluation[2].details[0].result, false);
  t.deepEqual(result.evaluation[2].details[1].shape, obj.userResponse[1]);
  t.is(result.evaluation[2].details[1].result, false);
});
