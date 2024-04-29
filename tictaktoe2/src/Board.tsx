// Board.js
import './Board.css';
import { useTTT } from './hooks/useTTT';

export const Board = () => {
  const { board, resetGame, handleClick, status } = useTTT();

  return (
    <div className='game'>
      <h1 className='status'>{status} </h1>
      <button className='reset' onClick={resetGame}>
        Reset Game
      </button>
      <div className='board'>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              className='cell'
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              disabled={!!cell}
            >
              {cell}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
