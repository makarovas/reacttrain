import './Board.css';
import { useTTT } from './hooks/useTTT';

export const Board = () => {
  const { getStatus, board, reset, handleClick } = useTTT();

  return (
    <div className='game'>
      <h1 className='status'>{getStatus()}</h1>
      <button className='reset' onClick={reset}>
        Reset Game
      </button>
      <div className='board'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='board-row'>
            {row.map((cell, colIndex) => (
              <button
                className='cell'
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                disabled={!!cell}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
