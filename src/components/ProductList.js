import React, { useState, useEffect } from 'react';
import './ProductList.css';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}/`);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditProduct(null);
    setShowModal(false);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/products/${editProduct.id}/`, editProduct);
      setProducts(prevProducts => prevProducts.map(product =>
        product.id === editProduct.id ? editProduct : product
      ));
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="product-list-container">
      <h2>Search Here..</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
  {filteredProducts.map(product => (
    <div key={product.id} className="product-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '50px', width:'200px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{product.name}</h3>
      <p style={{ fontSize: '16px', marginBottom: '10px' }}>{product.description}</p>
      <p style={{ fontSize: '16px', marginBottom: '10px' }}>Price: ₹{product.price}</p>
      <p style={{ fontSize: '16px', marginBottom: '10px' }}>Quantity: {product.quantity}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => handleDelete(product.id)} style={{ padding: '10px 20px', fontSize: '14px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Delete</button>
        <button onClick={() => handleEdit(product)} style={{ padding: '10px 20px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Edit</button>
      </div>
    </div>
  ))}
</div>

      {showModal && (
  <div className="modal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%' }}>
      <h2>Edit Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={editProduct?.name || ''}
        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
        style={{ width: '90%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={editProduct?.description || ''}
        onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
        style={{ width: '90%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />
      <input
        type="number"
        placeholder="Price"
        value={editProduct?.price || ''}
        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
        style={{ width: '90%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={editProduct?.quantity || ''}
        onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
        style={{ width: '90%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleSaveEdit} style={{ padding: '10px 20px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Save</button>
        <button onClick={handleCloseModal} style={{ padding: '10px 20px', fontSize: '14px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Cancel</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductList;