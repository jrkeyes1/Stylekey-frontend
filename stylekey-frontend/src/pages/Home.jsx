import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/Home.css"

function Home() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  // Fetch items from your backend
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, []);

  // Filter items by category
  const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

  // Delete an item
  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="Home">
      <h1 className="app-title">StyleKey</h1>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Tops')}>Tops</button>
        <button onClick={() => setFilter('Bottoms')}>Bottoms</button>
        <button onClick={() => setFilter('Shoes')}>Shoes</button>
      </div>

      {/* Display Items in Grid */}
      {loading ? (
        <p className="loading">Loading items...</p>
      ) : (
        <div className="item-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item._id} className="item-card">
                <img src={item.imageUrl} alt={item.name} className="item-image" />
                <h2 className="item-name">{item.name}</h2>
                <p className="item-category">{item.category}</p>
                <button onClick={() => deleteItem(item._id)} className="delete-button">Delete</button>
                <Link to={`/edit-item/${item._id}`} className="edit-button">Edit</Link>
              </div>
            ))
          ) : (
            <p className="no-items">No items found. Add some items to your closet!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
