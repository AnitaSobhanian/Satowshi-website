/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { CASE_FILES, filterCaseFiles, getConnectedSuspects } from './caseFiles';

test('case files include all 9 official characters with complete details', () => {
  assert.equal(CASE_FILES.length, 9);
  for (const file of CASE_FILES) {
    assert.ok(file.id);
    assert.ok(file.name);
    assert.ok(file.alias);
    assert.ok(file.caseNumber);
    assert.ok(file.crime);
    assert.ok(file.mugshot);
    assert.ok(file.dangerLevel >= 1 && file.dangerLevel <= 5);
    assert.ok(file.status);
    assert.ok(file.redactedIntel);
  }
});

test('filterCaseFiles correctly searches by name, crime, and status', () => {
  const satowshiSearch = filterCaseFiles(CASE_FILES, 'Satowshi');
  assert.equal(satowshiSearch.length, 1);
  assert.equal(satowshiSearch[0].id, 'satowshi');

  const pizzaCrimeSearch = filterCaseFiles(CASE_FILES, 'pizza');
  assert.ok(pizzaCrimeSearch.length >= 1);

  const wantedFilter = filterCaseFiles(CASE_FILES, '', 'WANTED');
  assert.ok(wantedFilter.every((f) => f.status === 'WANTED'));
});

test('getConnectedSuspects builds valid network links between characters', () => {
  const satowshiConnections = getConnectedSuspects('satowshi', CASE_FILES);
  assert.ok(satowshiConnections.length >= 3);
  const ids = satowshiConnections.map((c) => c.id);
  assert.ok(ids.includes('jones'));
  assert.ok(ids.includes('harvey'));

  const grandmaConnections = getConnectedSuspects('grandma', CASE_FILES);
  const grandmaIds = grandmaConnections.map((c) => c.id);
  assert.ok(grandmaIds.includes('high'));
});
