import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from 'react-notifications-component';
import { PlayerType, TileType } from '../../types';
import { tileClicked } from '../../redux/actions';

type TemplateProps = {
  player: PlayerType,
  board: TileType[],
  successList: string[]
}

const Template = (props: TemplateProps) => {
  const { player } = props;
  const dispatch = useDispatch();
  const gameType = useSelector((state: any) => state.bingo.gameType);
  const playerTurn = useSelector((state: any) => state.bingo.playerTurn);
  let click = new Audio('./audio/click.wav');
  let wrongTurn = new Audio('./audio/wrongTurn.wav');
  const { board, successList } = props;

  const boardSize = gameType === '1p' ? '12' : '6';

  const onTileClick = (el: TileType) => {
    if(playerTurn === 1 && player.id === 2 && gameType === '2p'){
      wrongTurn.play();
      store.addNotification({
        title: "Wrong Turn",
        message: "wait for your turn",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true
        }
      });
    } else if(playerTurn === 2 && player.id === 1 && gameType === '2p'){
      wrongTurn.play();
      store.addNotification({
        title: "Wrong Turn",
        message: "wait for your turn",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1500,
          onScreen: true
        }
      });
    } else {
      click.play();
      dispatch(tileClicked(el.title));
    }
  }

  return (
    <div className={`col-sm-${boardSize}`}>
      <p className="textHighlight">{props.player.name}</p>
      <table className="table">
        <tbody>
          { board.map((chunk:any, i: number) => {
            return (
              <tr key={i}>
                {
                  chunk.map((el: TileType) => {
                    const isSelected = el.complete ? 'selected' : '';
                    return (
                      <td className={isSelected} onClick={() => onTileClick(el)} key={el.id}>{el.title}</td>
                    )
                  })
                }
              </tr>
            )
          }) }
        </tbody>
        <div className="successList">
          { successList.length > 0 ? <p className="textHighlight">Bingos:</p> :  ''}
          { successList && successList.map((item, i) => {
            return (
              <div className="alert alert-primary" role="alert">
                {item}
              </div>
            )
          }) }
        </div>
      </table>
    </div>
  )
}

export default Template;