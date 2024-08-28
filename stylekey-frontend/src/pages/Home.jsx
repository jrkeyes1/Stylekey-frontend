import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Home() {
  const [items, setItems] = useState([]);
  const [randomOutfit, setRandomOutfit] = useState(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', imageUrl: '' });

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

  // Fetch random outfit from external API
  const fetchRandomOutfit = () => {
    axios.get('http://localhost:5000/api/random-outfit')
      .then(response => setRandomOutfit(response.data))
      .catch(error => console.error('Error fetching random outfit:', error));
  };

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

  // Start editing an item
  const startEditing = (item) => {
    setEditingItem(item._id);
    setFormData({ name: item.name, category: item.category, imageUrl: item.imageUrl });
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update an item
  const updateItem = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/items/${editingItem}`, formData)
      .then(response => {
        setItems(items.map(item => (item._id === editingItem ? response.data : item)));
        setEditingItem(null); // Exit editing mode
        setFormData({ name: '', category: '', imageUrl: '' });
      })
      .catch(error => console.error('Error updating item:', error));
  };

  return (
    <div className="Home">
      <h1 className="app-title">My Chic Closet</h1>

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
                <img src={item.imageUrl} alt={item.name} className="item-image"/>
                <h2 className="item-name">{item.name}</h2>
                <p className="item-category">{item.category}</p>
                <button onClick={() => deleteItem(item._id)} className="delete-button">Delete</button>
                <button onClick={() => startEditing(item)} className="edit-button">Edit</button>
              </div>
            ))
          ) : (
            <p className="no-items">No items found. Add some items to your closet!</p>
          )}
        </div>
      )}

      {/* Edit Form */}
      {editingItem && (
        <form onSubmit={updateItem} className="edit-form">
          <h2>Edit Item</h2>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={() => setEditingItem(null)} className="cancel-button">Cancel</button>
        </form>
      )}

      {/* Display Random Outfit */}
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

      {/* Button to Refresh Random Outfit */}
      <button onClick={fetchRandomOutfit} className="refresh-button">Get New Outfit</button>
    </div>
  );
}

export default Home;




