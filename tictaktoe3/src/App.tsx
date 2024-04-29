import './App.css';
import { Board } from './Board';

function App() {
  const size = 3; // или 4, или любой другой размер сетки
  return <Board size={size} />;
}

export default App;
