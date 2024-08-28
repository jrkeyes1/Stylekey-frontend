import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [randomOutfit, setRandomOutfit] = useState(null);

  useEffect(() => {
    // Fetch items from your own database
    axios.get('http://localhost:5000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));

    // Fetch random outfit from external API
    axios.get('http://localhost:5000/api/random-outfit')
      .then(response => setRandomOutfit(response.data))
      .catch(error => console.error('Error fetching random outfit:', error));
  }, []);

  return (
    <div className="App">
      <h1 className="app-title">My Chic Closet</h1>
      
      <div className="item-grid">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item._id} className="item-card">
              <img src={item.imageUrl} alt={item.name} className="item-image"/>
              <h2 className="item-name">{item.name}</h2>
              <p className="item-category">{item.category}</p>
            </div>
          ))
        ) : (
          <p className="no-items">No items found. Add some items to your closet!</p>
        )}
      </div>

      <h2 className="section-title">Random Outfit</h2>
      {randomOutfit && (
        <div className="random-outfit">
          <div>
            <img src={randomOutfit.top} alt="Top" className="outfit-image"/>
            <p>Top</p>
          </div>
          <div>
            <img src={randomOutfit.bottom} alt="Bottom" className="outfit-image"/>
            <p>Bottom</p>
          </div>
          <div>
            <img src={randomOutfit.shoes} alt="Shoes" className="outfit-image"/>
            <p>Shoes</p>
          </div>
        </div>
      )}

      <button onClick={() => refreshRandomOutfit()} className="refresh-button">Get New Outfit</button>
    </div>
  );
}

export default App;



