import './Board.css';
import { useTTT } from './hooks/useTTT';

export const Board = () => {
  const { board, resetGame, handleClick, getStatusMessage } = useTTT();
  return (
    <div className='game'>
      <h1 className='status'>{getStatusMessage()} </h1>
      <button className='reset' onClick={resetGame}>
        Reset Game
      </button>
      <div className='board'>
        {board.map((b, i) => (
          <button
            className='cell'
            key={i}
            onClick={() => handleClick(i)}
            disabled={!!b}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};
