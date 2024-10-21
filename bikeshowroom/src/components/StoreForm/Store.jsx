import React, { useState } from 'react'; 
import './Store.css';
import axios from 'axios';  

function StoreFormData() {
  const [formData, setFormData] = useState({
    name: '', 
    stock: '', 
    price: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try { 
      const response = await axios.post('https://storeitems.onrender.com/api/store/item', formData);
      alert('Data submitted successfully!');
      console.log('Form response:', response.data);
      
      
      setFormData({
        name: '', 
        stock: '', 
        price: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Store Form</h2>
        <input 
          type="text" 
          placeholder="Enter Item Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <input 
          type="number" 
          placeholder="Enter Count number" 
          name="stock" 
          value={formData.stock} 
          onChange={handleChange} 
        />
        <input 
          type="number" 
          placeholder="Enter Item price" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StoreFormData;