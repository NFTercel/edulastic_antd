import test from 'ava';
import { orderList as evaluator } from '../src/index';

import {
  emObj1,
  emObj2,
  emObj3,
  pmObj1,
  pmObj2,
  pmObj3
} from './data/orderlist';

test('#OrderList:exactMatch', async t => {
  // case 1
  const result = evaluator(emObj1);
  t.is(result.score, 1, 'incorrect score');
  t.is(result.maxScore, 1, 'incorrect maxScore');
  t.deepEqual(
    result.evaluation,
    { 0: true, 1: true, 2: true },
    'incorrect evaluation'
  );

  // case 2
  const result1 = evaluator(emObj2);
  t.is(result1.score, 0, 'incorrect score');
  t.is(result1.maxScore, 1, 'incorrect maxScore');
  t.deepEqual(
    result1.evaluation,
    { 0: false, 1: false, 2: true },
    'incorrect evaluation'
  );

  // case 3
  const result2 = evaluator(emObj3);
  t.is(result2.score, 3, 'incorrect score');
  t.is(result2.maxScore, 3, 'incorrect maxScore');
  t.deepEqual(
    result2.evaluation,
    { 0: true, 1: true, 2: true },
    'incorrect evaluation'
  );
});

test('#orderList:partialMatch', async t => {
  // case 1
  const result = evaluator(pmObj1);
  t.is(result.score, 1, 'incorrect score');
  t.is(result.maxScore, 3, 'incorrect maxScore');
  t.deepEqual(result.evaluation, { 0: false, 1: false, 2: true });

  // case 2
  const result1 = evaluator(pmObj2);
  t.is(result1.score, 2.5, 'incorrect score');
  t.is(result1.maxScore, 5, 'incorrect maxScore');
  t.deepEqual(result1.evaluation, { 0: false, 1: false, 2: true, 3: true });

  // case 3
  const result2 = evaluator(pmObj3);
  t.is(result2.score, 2, 'incorrect score');
  t.is(result2.maxScore, 5, 'incorrect maxScore');
  t.deepEqual(result2.evaluation, { 0: false, 1: true, 2: true, 3: false });
});
