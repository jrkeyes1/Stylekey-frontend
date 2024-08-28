import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddItem from './components/AddItem'; 
import "./styles/Home.css"

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-item">Add New Item</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;








