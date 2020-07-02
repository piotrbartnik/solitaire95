import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { reducers } from './store/reducers/';
import { Provider } from 'react-redux';
import App from './App';

const store = createStore(reducers);

describe('renders App page', () => {
  it('and check if it has the top bar', () => {
    const { asFragment } = render(
      (<Provider store={store}><App /></Provider>));
    expect(asFragment(<App />).querySelectorAll('.topBar__bar')).toHaveLength(1)
  })
});
