import { useMemo, useState } from 'react';

const initValue = () => Array(9).fill('');

const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const useTTT = () => {
  const [board, setBoard] = useState<string[]>(initValue());
  const [isXNext, setIsXNext] = useState(true);

  const calculatedWinner = useMemo(() => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      console.log(WINNING_PATTERNS[i], 'WINNING_PATTERNS[i];');
      console.log(board[a], board[b], board[c]);
      if (
        (board[a] === 'X' || board[a] === 'O') &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  }, [board]);

  const handleClick = (index: number) => {
    if (calculatedWinner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    if (calculatedWinner) return `Player ${calculatedWinner} wins!`;
    if (!board.includes('')) return `Its a draw!`;
    return `Player ${isXNext ? 'X' : 'O'} turn`;
  };

  const resetGame = () => {
    setBoard(initValue());
    setIsXNext(true);
  };

  return {
    board,
    resetGame,
    handleClick,
    getStatusMessage,
  };
};
