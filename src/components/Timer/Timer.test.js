import React from 'react';
import { render } from '@testing-library/react';
import Timer from './Timer';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('renders Timer', () => {

  it('and check if it has the single div wrapper', () => {
    const { asFragment } = render(<Timer />);
    expect(asFragment(<Timer />).querySelectorAll('div')).toHaveLength(1)
  })

  it('and it should have time 0 at the beggining', () => {
    const { getByText } = render(<Timer />);
    expect(getByText('Time: 0')).toBeInTheDocument();
  })

  it('and it should have time 5 after five seconds', () => {
    const { getByText } = render(<Timer />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(getByText('Time: 5')).toBeInTheDocument();
  })

  it('and it should have time 127 after 127 seconds', () => {
    const { getByText } = render(<Timer />);
    act(() => {
      jest.advanceTimersByTime(127000);
    });

    expect(getByText('Time: 127')).toBeInTheDocument();
  })
});
