import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [randomOutfit, setRandomOutfit] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/random-outfit')
      .then(response => setRandomOutfit(response.data))
      .catch(error => console.error('Error fetching random outfit:', error));
  }, []);

  return (
    <div className="App">
      <h2>Random Outfit</h2>
      {randomOutfit && (
        <div className="random-outfit">
          <div>
            <img src={randomOutfit.top} alt="Top" />
            <p>Top</p>
          </div>
          <div>
            <img src={randomOutfit.bottom} alt="Bottom" />
            <p>Bottom</p>
          </div>
          <div>
            <img src={randomOutfit.shoes} alt="Shoes" />
            <p>Shoes</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


