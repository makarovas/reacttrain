// hooks/useTTT.js
import { useCallback, useMemo, useState } from 'react';

export const useTTT = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = useCallback(() => {
    const lines = [
      // row
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // cols
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of lines) {
      if (line[0] && line.every((cell) => cell === line[0])) {
        return line[0];
      }
    }
    return null;
  }, [board]);

  const status = useMemo(() => {
    const winner = calculateWinner();
    if (winner) return `Player ${winner} wins!`;
    if (board.flat().every((cell) => cell)) return "It's a draw!";
    return `Player ${isXNext ? 'X' : 'O'} turn`;
  }, [calculateWinner, board, isXNext]);

  const handleClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      if (board[rowIndex][colIndex] || calculateWinner()) {
        return;
      }
      const newBoard = [...board].map((row) => [...row]);
      newBoard[rowIndex][colIndex] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);
    },
    [board, calculateWinner, isXNext]
  );

  const resetGame = useCallback(() => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setIsXNext(true);
  }, []);

  return { board, handleClick, resetGame, status };
};
