import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Home.css"

function EditItem() {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate(); // Navigation hook to redirect after editing
  const [formData, setFormData] = useState({ name: '', category: '', imageUrl: '' });

  useEffect(() => {
    // Fetch the item details by ID to populate the form
    axios.get(`http://localhost:5000/api/items/${id}`)
      .then(response => {
        setFormData({
          name: response.data.name,
          category: response.data.category,
          imageUrl: response.data.imageUrl
        });
      })
      .catch(error => console.error('Error fetching item:', error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/items/${id}`, formData)
      .then(response => {
        alert('Item updated successfully!');
        navigate('/'); // Redirect to home page after successful edit
      })
      .catch(error => console.error('Error updating item:', error));
  };

  return (
    <div className="EditItem">
      <h2>Edit Item</h2>
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
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
}

export default EditItem;
