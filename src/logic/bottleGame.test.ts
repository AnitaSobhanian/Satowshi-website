/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BOTTLE_CHARACTERS,
  TRUTH_QUESTIONS,
  DARE_CHALLENGES,
  calculateBottleTarget,
  getCharacterByAngle,
  getRandomQuestion,
} from './bottleGame';

test('bottle game has exactly the 4 requested characters', () => {
  assert.equal(BOTTLE_CHARACTERS.length, 4);
  const ids = BOTTLE_CHARACTERS.map((c) => c.id);
  assert.ok(ids.includes('satowshi'));
  assert.ok(ids.includes('emily'));
  assert.ok(ids.includes('jones'));
  assert.ok(ids.includes('high'));
});

test('truth and dare questions pool meets requirement of at least 15 each', () => {
  assert.ok(TRUTH_QUESTIONS.length >= 15, `Truth count: ${TRUTH_QUESTIONS.length}`);
  assert.ok(DARE_CHALLENGES.length >= 15, `Dare count: ${DARE_CHALLENGES.length}`);
});

test('calculateBottleTarget calculates proper rotation angles and returns target character', () => {
  const result = calculateBottleTarget(2, 0, 4); // target character index 2 (Jones at 180deg)
  assert.equal(result.character.id, 'jones');
  // Should have rotated at least 4 full turns (1440 degrees)
  assert.ok(result.finalAngle >= 1440);
});

test('getCharacterByAngle correctly maps degrees back to closest character', () => {
  // Satowshi is at 0 degrees
  const char0 = getCharacterByAngle(2);
  assert.equal(char0.id, 'satowshi');

  // Emily is at 90 degrees
  const char90 = getCharacterByAngle(92);
  assert.equal(char90.id, 'emily');

  // Jones is at 180 degrees
  const char180 = getCharacterByAngle(178);
  assert.equal(char180.id, 'jones');

  // High is at 270 degrees
  const char270 = getCharacterByAngle(268);
  assert.equal(char270.id, 'high');
});

test('getRandomQuestion avoids repeating previous question ID', () => {
  const first = getRandomQuestion('satowshi', 'truth');
  assert.ok(first.id);

  // Ask 20 times with previousId set, should never return first.id
  for (let i = 0; i < 20; i++) {
    const next = getRandomQuestion('satowshi', 'truth', first.id);
    assert.notEqual(next.id, first.id, 'Should not repeat the same question twice in a row');
  }
});
