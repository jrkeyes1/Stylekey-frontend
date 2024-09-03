import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddItem from './components/AddItem'; 
import EditItem from "./pages/EditItemPage";
import RandomOutfit from './pages/RandomOutfit';
import "./styles/Home.css"

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/add-item">Add New Item</Link>
          <Link to="/random-outfit">Random Outfit</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/edit-item/:id" element={<EditItem />} />
          <Route path="/random-outfit" element={<RandomOutfit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;