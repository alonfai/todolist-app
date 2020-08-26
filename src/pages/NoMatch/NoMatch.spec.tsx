import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NoMatch from './NoMatch';

describe('pages/NoMatch', () => {
  let renderResult: RenderResult;

  it('render successfully', () => {
    renderResult = render(
      <BrowserRouter>
        <NoMatch />
      </BrowserRouter>
    );
    const elem = renderResult.getByText('No match for');
    expect(elem).toBeInTheDocument();
  });
});
