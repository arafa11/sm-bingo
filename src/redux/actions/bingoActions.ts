import { START_GAME, SELECT_GAME_TYPE, TILE_CLICKED, END_GAME } from "../../types";

export const selectGametype = (gameType: string) => { return { type: SELECT_GAME_TYPE, gameType }; }
export const startGame = () => { return { type: START_GAME }; }
export const tileClicked = (tileTitle: string) => { return { type: TILE_CLICKED, tileTitle}; }
export const endGame = () => { return { type: END_GAME }; }


