import test from 'ava';
import { emObj1, emObj2, emObj3, emObj4, pmObj1, pmObj2, pmObj3 } from './data/clozeImageDragDrop';

import evaluator from '../src/clozeImageDragDrop';


test('#clozeImageDragDrop:exactMatch', async t => {

  const result = evaluator(emObj1);
  t.is(result.score, 1, 'incorrect score');
  t.is(result.maxScore, 1, 'incorrect maxScore');
  t.deepEqual(result.evaluation, [true, true], 'incorrect evaluation');


  const result1 = evaluator(emObj2);
  t.is(result1.score, 4, 'incorrect score');
  t.is(result1.maxScore, 5, 'incorrect maxScore');
  t.deepEqual(result1.evaluation, [true, true], 'incorrect evaluation');

  const result2 = evaluator(emObj3);
  t.is(result2.score, 0, 'incorrect score');
  t.is(result2.maxScore, 5, 'incorrect maxScore');
  t.deepEqual(result2.evaluation, [true, false], 'incorrect evaluation');

  const result3 = evaluator(emObj4);
  t.is(result3.score, 5, 'incorrect score');
  t.is(result3.maxScore, 5, 'incorrect maxScore');
  t.deepEqual(result3.evaluation, [true, true], 'incorrect evaluation');
})


test('#clozeImageDragDrop:partialMatch', async t => {

  const result = evaluator(pmObj1);
  t.is(result.score, 2.5, 'incorrect score');
  t.is(result.maxScore, 5, 'incorrect maxScore');
  t.deepEqual(result.evaluation, [false, false], 'incorrect evaluation');

  const result1 = evaluator(pmObj2);
  t.is(result1.score, 1.5, 'incorrect score');
  t.is(result1.maxScore, 5, 'incorrect maxScore');
  t.deepEqual(result1.evaluation, [false, false], 'incorrect evaluation');

  const result2 = evaluator(pmObj3);
  t.is(result2.score, 2, 'incorrect score');
  t.is(result2.maxScore, 6, 'incorrect maxScore');
  t.deepEqual(result2.evaluation, [false, false], 'incorrect evaluation');

})