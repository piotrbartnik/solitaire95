import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import { dndWrapper } from '../../../helpers/testHelpers'
import { reduxWrapper } from '../../../helpers/testHelpers'
import CardStock from '../CardStock';

const mockStore = configureStore([]);

describe('renders CardStock', () => {
  it('with 24 cards turned back on it', () => {
    const { container } = render(dndWrapper(reduxWrapper(<CardStock />)));
    expect(container.querySelectorAll('.cardBack')).toHaveLength(24)
  })

  it('and when card clicked it is turned front and added to cards on table', () => {
    const { container } = render(dndWrapper(reduxWrapper(<CardStock />)));
    fireEvent.click(container.querySelector(".card"))
    expect(container.querySelectorAll('.cardFront')).toHaveLength(1)
  })



  describe("with custom state", () => {
    const testAceCardStock = [['ace', 'clubs', undefined, 'black', 1]];

    const store = mockStore({
      cardDistribution: {
        cardsOnStock: testAceCardStock,
        cardsFromStock: testAceCardStock,
      },
      cardsOnFoundation: {
        cardsOnFirstFoundation: { foundationSuite: undefined, cards: [] },
        cardsOnSecondFoundation: { foundationSuite: undefined, cards: [] },
        cardsOnThirdFoundation: { foundationSuite: undefined, cards: [] },
        cardsOnFourthFoundation: { foundationSuite: undefined, cards: [] },
      }
    });

    it('with 1 card turned back on it', () => {
      const { container } = render(dndWrapper(<Provider store={store} ><CardStock cardsOnStock={testAceCardStock} /></Provider>));
      expect(container.querySelectorAll('.cardBack')).toHaveLength(1)
    })

    it('with ace and it is moved to foundations on doubleclick', () => {
      const { container } = render(dndWrapper(<Provider store={store} ><CardStock cardsOnStock={testAceCardStock} /></Provider>));
      fireEvent.dblClick(container.querySelector(".cardFront"))
      expect(container.querySelectorAll('.cardFront')).toHaveLength(1)
    })

  })

})