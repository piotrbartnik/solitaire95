import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('renders App page', () => {
  it('and checks basic snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  })
});
