import { render } from '@testing-library/react';

import Temp from './temp';

describe('Temp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Temp />);
    expect(baseElement).toBeTruthy();
  });
});
