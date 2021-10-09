import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGametype, startGame, endGame } from '../../redux/actions';

const Nav = () => {
  const dispatch = useDispatch();
  const gameType = useSelector((state: any) => state.bingo.gameType);
  const gameState = useSelector((state: any) => state.bingo.gameState);
  console.log(gameType);
  const p1Color = gameType === '1p'? 'success' : 'light';
  const p2Color = gameType === '2p'? 'success' : 'light';

  const changeGameType = (type: string) => {
    dispatch(selectGametype(type));
  }
  const onStartBingo = () => {
    dispatch(startGame());
  }

  const onEndBingo = () => {
    dispatch(endGame());
  }

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Conf. Call Bingo!</a>
        <div>
          <span>{gameType === '1p' ? '1 Player ' : '2 Players '}</span>
          <button type="button" className={`btn btn-${p1Color}`} onClick={() => changeGameType('1p')}> 1P</button>
          <button type="button" className={`btn btn-${p2Color}`} onClick={() => changeGameType('2p')}>2P</button>
          {
            gameState === 'off' ? 
            <button type="button" className="btn btn-primary" onClick={onStartBingo}>Start!</button>
            :
            <button type="button" className="btn btn-danger" onClick={onEndBingo}>End Game</button>
          }
          
        </div>
      </div>
    </nav>
  )
}

export default Nav;