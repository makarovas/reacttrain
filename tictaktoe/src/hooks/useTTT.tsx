import { useState } from 'react';

const initValue = () => Array(9).fill('');

export const useTTT = () => {
  const [board, setBoard] = useState<string[]>(initValue());
  const [isXNext, setIsXNext] = useState<boolean | null>(null);
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

  const calculateWinner = (currBoard: string[]) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];

      if (
        currBoard[a] &&
        currBoard[a] === currBoard[b] &&
        currBoard[a] === currBoard[c]
      ) {
        return currBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O ';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes('')) return `Its a draw!`;
    return `Player${isXNext ? 'X' : 'O'} turn`;
  };

  const resetGame = () => {
    setBoard(initValue);
    setIsXNext(true);
  };

  return {
    board,
    resetGame,
    handleClick,
    getStatusMessage,
  };
};
