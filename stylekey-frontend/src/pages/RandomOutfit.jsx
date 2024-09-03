import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Home.css"

function RandomOutfit() {
  const [randomOutfit, setRandomOutfit] = useState(null);

  const fetchRandomOutfit = () => {
    axios.get('http://localhost:5000/api/random-outfit')
      .then(response => setRandomOutfit(response.data))
      .catch(error => console.error('Error fetching random outfit:', error));
  };

  return (
    <div className="RandomOutfit">
      <h2>Random Outfit Generator</h2>
      <button onClick={fetchRandomOutfit} className="refresh-button">Get New Outfit</button>
      {randomOutfit && (
        <div className="random-outfit">
          <div>
            <img src={randomOutfit.top} alt="Top" className="outfit-image" />
            <p>Top</p>
          </div>
          <div>
            <img src={randomOutfit.bottom} alt="Bottom" className="outfit-image" />
            <p>Bottom</p>
          </div>
          <div>
            <img src={randomOutfit.shoes} alt="Shoes" className="outfit-image" />
            <p>Shoes</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomOutfit;
