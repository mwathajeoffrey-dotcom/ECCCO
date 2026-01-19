import { strict as assert } from 'assert';
import { safeParseJson } from '../route';

// Basic tests for safeParseJson
function run() {
  assert.deepEqual(safeParseJson('["a","b"]', []), ['a','b']);
  assert.deepEqual(safeParseJson(null, []), []);
  assert.deepEqual(safeParseJson(undefined, { foo: 'bar' } as any), { foo: 'bar' });
  assert.deepEqual(safeParseJson('{"x":1}', {} as any), { x: 1 });
  assert.deepEqual(safeParseJson('invalid', []), []);
  console.log('safeParseJson tests passed');
}

run();
