import { AnyAction } from 'redux';
import seedRandom from 'seedrandom';
import { START_GAME, SELECT_GAME_TYPE, TileType, TILE_CLICKED, END_GAME } from "../../types";
import tiles from '../../data/tiles.json';

const initialState = {
  gameType: '1p',
  gameState: 'off',
  playerTurn: 1,
  player1: {
    board: [],
    successList: []
  },
  player2: {
    board: [],
    successList: []
  },
  winner: '',
};

type PlayerType = {
  board: TileType[][];
  successList: string[];
}

const bingo = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_GAME:
      let next2: PlayerType = {board: [], successList: []};
      next2.successList = [];
      if(state.gameType === '2p') {
        next2.board = populateBorad(tiles, generateRandomSeed());
      }
      return {
        ...state,
        player1: { board: populateBorad(tiles, generateRandomSeed()), successList: [] },
        player2: next2,
        gameState: 'on',
        winner: ''
      };
    case TILE_CLICKED:
      const { tileTitle } = action;
      const nextPlayer1 = { ...state.player1 }
      const nextPlayer2 = { ...state.player2 }
      let nextWinner = state.winner;
      let players: PlayerType[] = [nextPlayer1, nextPlayer2];
      if(state.gameType === '1p') {
        players = [nextPlayer1]
      } else {
        players = [nextPlayer1, nextPlayer2];
      }
      let x, y:any;
      for (let player of players) {
        x = player.board.findIndex((subArr: TileType[]) => {
            y = subArr.findIndex((item) => {return item.title === tileTitle})
            return y !== -1
        })
        player.board[x][y].complete = true
        bingoCheck(player, x, y)
      }
      if (nextPlayer1.successList.length >= 5 && nextPlayer2.successList.length >= 5) {
        nextWinner = 'tie'
      }
      else if (nextPlayer1.successList.length >= 5) {
        nextWinner = 'p1'
      }
      else if (nextPlayer2.successList.length >= 5) {
        nextWinner = 'p2'
      }
      return {
        ...state,
        winner: nextWinner,
        playerTurn: state.playerTurn === 1 ? 2 : 1,
        player1: nextPlayer1,
        player2: nextPlayer2
      }
    case SELECT_GAME_TYPE:
      return {
        ...state,
        gameType: action.gameType,
        player1: { board:[], successList: [] },
        player2: { board:[], successList: [] },
        gameState: 'off',
        playerTurn: 1,
        winner: ''
      }
    case END_GAME:
      return {
        ...state,
        gameType: '1p',
        player1: { board:[], successList: [] },
        player2: { board:[], successList: [] },
        gameState: 'off',
        playerTurn: 1,
        winner: ''
      }
    default:
      return {
        ...state
      };
  }
}

function populateBorad(milestones: TileType[], seed: number) {
  let template = milestones.map((tile) => {
    if(tile.title === 'Conf Call Bingo 😄') {
      tile.complete = true;
    } else {
      tile.complete = false;
    }
    return tile;
  });
  let selectedMilestone: TileType, scrambledBoard = [];
  let index = 0;
  let rng = seedRandom(seed.toString());
  while (scrambledBoard.length < 25) {
    selectedMilestone = template[Math.floor(template.length * rng())];
    selectedMilestone.id = index;
    scrambledBoard.push(selectedMilestone);
    template = template.filter((elem) => {
      if (template.length > 1) {
        return elem !== selectedMilestone;
      } else {
        return elem;
      }
    });
    index++;
  };
  let centerBoardIndex = scrambledBoard.findIndex(el => el.complete === true);
  let centeredBoard = scrambledBoard.filter(el => el.complete === false);
  centeredBoard.splice(12, 0, scrambledBoard[centerBoardIndex]);
  let chunks = [];
  while (centeredBoard.length > 0) {
    chunks.push(centeredBoard.splice(0,5))
  }
  return chunks;
}

function generateRandomSeed() {
  let newSeed = Math.ceil(Math.random() * 999999);
  return newSeed;
}

function bingoCheck (player:any, x:number, y:number) {
  let { board, successList } = player;
  // Horizontal
  let bingo = board[x].every(({complete}: TileType) => complete === true)
  if (bingo) successList.push('Horizontal/'+(x+1).toString())
  // Vertical
  let count = 0
  for (let i  = 0; i < 5; i++) {
    if (board[i][y].complete) count++
  }
  if (count === 5) successList.push('Vertical/'+(y+1).toString())
  // Diagonal 1
  if (x === y) {
    count = 0
    for (let i  = 0; i < 5; i++) {
      if (board[i][i].complete) count++
    }
    if (count === 5) successList.push('Diagonal/1')
  }
  // Diagonal 2
  if (x === 4 - y) {
    count = 0
    for (let i  = 0; i < 5; i++) {
      if (board[i][4 - i].complete) count++
    }
    if (count === 5) successList.push('Diagonal/2')
  }
}

export default bingo;