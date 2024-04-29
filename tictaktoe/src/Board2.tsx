import './Board.css';
import { useTTT } from './hooks/useTTT';

export const Board = () => {
  const { getStatusMessage, board, resetGame, handleClick } = useTTT();

  return (
    <div className='game'>
      <h1 className='status'>{getStatusMessage()}</h1>
      <button onClick={resetGame}>reset</button>
      <div className='board'>
        {board.map((b, i) => (
          <button key={`${i}-${b[i]}`} onClick={() => handleClick(i)}>
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};
