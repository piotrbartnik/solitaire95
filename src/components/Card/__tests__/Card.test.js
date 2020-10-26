import React from 'react';
import { render } from '@testing-library/react';
import { DndWrapper } from '../../../helpers/testHelpers'
import Card from '../Card';

describe('renders Card', () => {
  let renderedComponent;
  beforeEach(() => {
    renderedComponent = render(<DndWrapper><Card /></DndWrapper>);
  })

  it('and check if it has the div for card front and card back', () => {
    expect(renderedComponent.asFragment(<Card />).querySelectorAll('div')).toHaveLength(2)
  })

})