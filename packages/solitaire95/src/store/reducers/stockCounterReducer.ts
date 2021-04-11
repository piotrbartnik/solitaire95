export interface StockCount {
  stockRevolutions: number;
}

export interface StockCountActionTypes {
  type: string;
}

const initialState: StockCount = {
  stockRevolutions: 0,
};

export const stockCounter = (
  state = initialState,
  action: StockCountActionTypes
): StockCount => {
  switch (action.type) {
    case "STOCK_TURN_COUNTER": {
      return { ...state, stockRevolutions: state.stockRevolutions + 1 };
    }
    case "RESET_STOCK_COUNTER": {
      return { ...state, stockRevolutions: 0 };
    }
    default:
      return state;
  }
};
