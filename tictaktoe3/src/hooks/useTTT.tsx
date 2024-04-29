import { useCallback, useMemo, useState } from 'react';

const initBoard = (size: number) =>
  Array.from({ length: size }, () => Array(size).fill(''));

export const useTTT = (size: number) => {
  const [board, setBoard] = useState(() => initBoard(size));
  const [isXNext, setIsXNext] = useState(true);

  const getWinningPatterns = (size: number) => {
    const patterns = [];

    // Rows
    for (let i = 0; i < size; i++) {
      patterns.push(Array.from({ length: size }, (_, k) => i * size + k));
    }

    // Columns
    for (let i = 0; i < size; i++) {
      patterns.push(Array.from({ length: size }, (_, k) => k * size + i));
    }

    // Diagonals
    patterns.push(Array.from({ length: size }, (_, k) => k * size + k));
    patterns.push(
      Array.from({ length: size }, (_, k) => (size - k - 1) * size + k)
    );

    return patterns;
  };

  const calculatedWinner = useMemo(() => {
    const patterns = getWinningPatterns(size);
    for (const pattern of patterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, [board, size]);

  const handleClick = useCallback(
    (row: number, col: number) => {
      if (calculatedWinner || board[row][col]) return;
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext((prev) => !prev);
    },
    [board, calculatedWinner, isXNext]
  );

  const status = useMemo(() => {
    if (calculatedWinner) return `Player ${calculatedWinner} wins!`;
    if (board.every((row) => row.every((cell) => cell))) return "It's a draw!";
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  }, [calculatedWinner, board, isXNext]);

  const resetGame = useCallback(() => {
    setBoard(initBoard(size));
    setIsXNext(true);
  }, [size]);

  return { board, resetGame, handleClick, status };
};
