import { useMemo, useState } from 'react';

const initValue = () => Array(9).fill('');
const PATTERNS = [
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
  const [board, setBoard] = useState(initValue());
  const [isXNext, setIsXNext] = useState(true);

  const calculatedWinner = useMemo(() => {
    for (let i = 0; i < PATTERNS.length; i++) {
      const [a, b, c] = PATTERNS[i];
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
    setIsXNext((prev) => !prev);
  };

  const getStatus = () => {
    if (calculatedWinner) return `Player ${calculatedWinner} wins`;
    if (!board.includes('')) return `Its a draw`;
    return `Player ${isXNext ? 'X' : 'O'} turn now`;
  };

  const resetGame = () => {
    setBoard(initValue());
    setIsXNext(true);
  };

  return { board, handleClick, getStatus, resetGame };
};
