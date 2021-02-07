export interface gameState {
  gameStarted: boolean;
}

interface gameStateActionTypes {
  type: string;
}

const initialState: gameState = {
  gameStarted: false,
};

export const gameState = (
  state = initialState,
  action: gameStateActionTypes
): gameState => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true };
    case "STOP_GAME":
      return { ...state, gameStarted: false };
    default:
      return state;
  }
};
