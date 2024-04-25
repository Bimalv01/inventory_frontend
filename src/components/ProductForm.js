import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import './ProductForm.css';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [error, setError] = useState(null);
  
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/products/', product);
      console.log('Product added:', response.data);
      setProduct({
        name: '',
        description: '',
        price: '',
        quantity: ''
      });

      // Redirect to ProductList after successful addition
      history.push('/');

    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            style={{ width: '90%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            style={{ width: '90%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            style={{ width: '90%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            style={{ width: '90%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Add
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
