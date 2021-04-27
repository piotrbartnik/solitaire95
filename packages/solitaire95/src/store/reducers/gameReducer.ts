export interface GameState {
  gameStarted: boolean;
  gameFinished: boolean;
}

interface GameStateActionTypes {
  type: string;
  gameFinished: boolean;
}

const initialState: GameState = {
  gameStarted: false,
  gameFinished: false,
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
    case "FINISH_GAME":
      return { ...state, gameFinished: action.gameFinished };
    default:
      return state;
  }
};
