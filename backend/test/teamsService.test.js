const test = require('node:test');
const assert = require('node:assert/strict');

const { getProcessedTeams } = require('../src/services/teamsService');

test('filters teams by country', async () => {
  const result = await getProcessedTeams({ country: 'argentina' });

  assert.ok(result.length > 0);
  assert.ok(result.every((team) => team.country.toLowerCase() === 'argentina'));
});

test('searches teams by name', async () => {
  const result = await getProcessedTeams({ search: 'real' });

  assert.ok(result.length > 0);
  assert.ok(result.every((team) => team.name.toLowerCase().includes('real')));
});

test('sorts teams by founded year in descending order', async () => {
  const result = await getProcessedTeams({ sortBy: 'founded', order: 'desc' });

  for (let index = 0; index < result.length - 1; index += 1) {
    assert.ok(result[index].founded >= result[index + 1].founded);
  }
});
