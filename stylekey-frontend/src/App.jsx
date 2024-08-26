import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]); // Initialize items as an empty array
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    axios.get('/api/items')
      .then(response => {
        if (Array.isArray(response.data)) {
          setItems(response.data); // Ensure the response data is an array
        } else {
          console.error('Unexpected response format:', response.data);
          setItems([]); // Fallback to an empty array if the response is not as expected
        }
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setError('Failed to load items. Please try again later.');
        setItems([]); // Set items to an empty array in case of an error
      });
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

      {error ? (
        <p>{error}</p> // Display error message if there's an error
      ) : (
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
            <p>No items found.</p> // Display a message if the items array is empty
          )}
        </div>
      )}
    </div>
  );
}

export default App;
