import { useMemo, useState } from 'react';

const initBoard = () => Array.from({ length: 3 }, () => Array(3).fill(''));

const WINNING_PATTERNS = [
  // Rows
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  // Columns
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // Diagonals
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

export const useTTT = () => {
  const [board, setBoard] = useState(initBoard());
  const [isXNext, setIsXNext] = useState(true);

  const calculatedWinner = useMemo(() => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [[r1, c1], [r2, c2], [r3, c3]] = WINNING_PATTERNS[i];
      if (
        board[r1][c1] &&
        board[r1][c1] === board[r2][c2] &&
        board[r1][c1] === board[r3][c3]
      ) {
        return board[r1][c1];
      }
    }
    return null;
  }, [board]);

  const handleClick = (row: number, col: number) => {
    if (calculatedWinner || board[row][col]) return;
    const newBoard = board.map((inner) => inner.slice());
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext((prev) => !prev);
  };

  const getStatus = () => {
    if (calculatedWinner) return `Player ${calculatedWinner} is the winner`;
    if (board.every((row) => row.every((cell) => cell))) return `It's a draw`;
    return `Player ${isXNext ? 'X' : 'O'}'s turn now`;
  };

  const reset = () => {
    setBoard(initBoard());
    setIsXNext(true);
  };

  return { board, getStatus, handleClick, reset };
};
