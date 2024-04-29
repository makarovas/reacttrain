import { useState } from 'react';

const initBoardValue = () => Array(3).fill(Array(3).fill(''));

export const useTTT = () => {
  const [board, setBoard] = useState<string[][]>(initBoardValue());
  const [isXNext, setIsXNext] = useState(true);

  const getWinningPatterns = () => {
    const rows = board.length;
    const cols = board[0].length;
    const patterns = [];

    // Rows
    for (let i = 0; i < rows; i++) {
      patterns.push(board[i]);
    }

    // Columns
    for (let j = 0; j < cols; j++) {
      patterns.push(board.map((row) => row[j]));
    }

    // Diagonals
    patterns.push(board.map((row, i) => row[i]));
    patterns.push(board.map((row, i) => row[cols - 1 - i]));

    return patterns;
  };

  const calculateWinner = () => {
    const patterns = getWinningPatterns();
    for (const pattern of patterns) {
      if (
        pattern.every((cell) => cell === 'X') ||
        pattern.every((cell) => cell === 'O')
      ) {
        return pattern[0];
      }
    }
    return null;
  };

  const handleClick = (row: number, col: number) => {
    const winner = calculateWinner();
    if (winner || board[row][col]) return;
    const newBoard = [...board.map((r) => [...r])];
    newBoard[row][col] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner();
    if (winner) return `Player ${winner} wins!`;
    if (board.every((row) => row.every((cell) => cell !== '')))
      return `It's a draw!`;
    return `Player ${isXNext ? 'X' : 'O'} turn`;
  };

  const resetGame = () => {
    setBoard(initBoardValue());
    setIsXNext(true);
  };

  return {
    board,
    resetGame,
    handleClick,
    getStatusMessage,
  };
};
