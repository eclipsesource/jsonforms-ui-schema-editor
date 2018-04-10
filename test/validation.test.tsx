import { validate } from '../src/validation';

test('returns true', () => {
  expect(validate()).toBe(true);
});
