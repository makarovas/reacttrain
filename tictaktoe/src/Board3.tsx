import './Board3.css';
import { useTTT } from './hooks/useTTT2';

export const Board = () => {
  const { board, getStatus, resetGame, handleClick } = useTTT();
  return (
    <div className='game'>
      <h1 className='status'>{getStatus()}</h1>
      <button className='reset' onClick={resetGame}>
        Reset game
      </button>
      <div className='board'>
        {board.map((b, i) => {
          return (
            <button
              key={i}
              disabled={!!b}
              onClick={() => handleClick(i)}
              className='cell'
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
};
