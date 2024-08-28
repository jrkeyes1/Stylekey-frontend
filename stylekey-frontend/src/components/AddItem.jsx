import React, { useState } from 'react';
import axios from 'axios';

function AddItem() {
  const [formData, setFormData] = useState({ name: '', category: '', imageUrl: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/items', formData)
      .then(response => {
        alert('Item added successfully!');
        // Redirect to the home page or reset the form
      })
      .catch(error => console.error('Error adding item:', error));
  };

  return (
    <div className="add-item">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
