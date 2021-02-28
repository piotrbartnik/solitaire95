export interface GameState {
  gameStarted: boolean;
}

interface GameStateActionTypes {
  type: string;
}

const initialState: GameState = {
  gameStarted: false,
};

export const gameState = (
  state = initialState,
  action: GameStateActionTypes
): GameState => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, gameStarted: true };
    case "STOP_GAME":
      return { ...state, gameStarted: false };
    default:
      return state;
  }
};
