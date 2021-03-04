import { formatDiagnostic } from "typescript";

export {
  dealCards,
  takeOneFromStock,
  reverseStock,
  addCardToFoundation,
  removeCardMovedToFoundation,
  removeCardFromPile,
  addCardToPile,
  removeCardFromFoundation,
} from "./cardActions";
export { startGame, stopGame } from "./gameActions";
export { countScore, resetScore } from "./scoreActions";
export { toggleCardBackWindow } from "./windowActions";
