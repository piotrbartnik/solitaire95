export interface gameState {
  gameStarted: boolean;
}

const initialState: gameState = {
  gameStarted: false,
};

export const gameState = (state = initialState, action: any) => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true };
    case "STOP_GAME":
      return { ...state, gameStarted: false };
    default:
      return state;
  }
};
