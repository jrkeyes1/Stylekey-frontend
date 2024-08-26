import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';  // Assuming you have global styles here

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/add-item">Add Item</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>

      <h1>My Closet</h1>
      <div className="item-grid">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item._id} className="item-card">
              <img src={item.imageUrl} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.category}</p>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default App;
