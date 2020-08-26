import * as errors from './errors';

describe('shared/errors', () => {
  it('Class instance is correct with proper message', () => {
    const msg = 'my message';
    const error = new errors.UserError(msg);
    expect(error.message).toEqual(msg);
  });
});
