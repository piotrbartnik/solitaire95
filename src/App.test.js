import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('renders App page', () => {
  it('and check if it has the top bar', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />).querySelectorAll('.topBar__bar')).toHaveLength(1)
  })
});
