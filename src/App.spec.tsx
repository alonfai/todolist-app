import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Able to render the app successfully', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
