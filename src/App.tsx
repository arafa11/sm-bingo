import React from 'react';
import { useSelector } from 'react-redux';
import Template from './components/Template';
import Nav from './components/Nav';
import players from './data/players.json';
import Stars from './components/Stars';

const App = () => {
  const gameType = useSelector((state: any) => state.bingo.gameType);
  const gameState = useSelector((state: any) => state.bingo.gameState);
  const winner = useSelector((state: any) => state.bingo.winner);
  const p1 = useSelector((state: any) => state.bingo.player1);
  const p2 = useSelector((state: any) => state.bingo.player2);

  const renderStars = () => {
    if(winner === 'p1') {
      return (
        <>
          <p className="gameResult">Player 1 Wins!</p>
          <Stars />
        </>
      )
    } else if( winner === 'p2') {
      return (
        <>
          <p className="gameResult">Player 2 Wins!</p>
          <Stars />
        </>
      )
    } else if( winner === 'tie') {
      return (
        <p className="gameResult">It's a tie</p>
      )
    }
  }

  return (
    <div className="App">
      <Nav />
      <div className="container">
        {
          gameState === 'off' ? 
          <div className="row rules">
            <p>Select The number of players ( one or two ).</p>
            <p>Click Start to start the game.</p>
            <p>You have to make 5 bingos to win the Game.</p>
          </div>
          :
          <div className="row">
            {renderStars()}
            {
              gameType === '1p' ? <Template player={players[0]} board={p1.board} successList={p1.successList}/> : 
              <>
                <Template player={players[0]} board={p1.board} successList={p1.successList}/>
                <Template player={players[1]} board={p2.board} successList={p2.successList}/>
              </>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;
