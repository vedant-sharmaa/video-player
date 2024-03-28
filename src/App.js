import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Player from "./Player"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Player />} />
      </Routes>
    </Router>
  );
}

export default App;
