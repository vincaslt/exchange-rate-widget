import { classNames } from './classNames';

describe('classNames', () => {
  it('should format class string from arguments', () => {
    expect(classNames('test-1', false, undefined, null, '', 'test-2')).toBe(
      'test-1 test-2'
    );
  });
});
