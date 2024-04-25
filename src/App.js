import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Product Management System</h1>
          {isLoggedIn && (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className="add-product-button">
      <Link to="/add-product">
        <button style={{ padding: '12px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Add Product
        </button>
      </Link>
    </div>
    <button onClick={handleLogout} style={{ marginLeft: '20px', padding: '12px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
      Logout
    </button>
  </div>
)}

        </header>
        <main className="App-main">
          <div className="container">
            <Switch>
              <Route path="/login" render={(props) => <Login {...props} onLogin={handleLogin} />} />
              <PrivateRoute path="/add-product" component={ProductForm} />
              <PrivateRoute path="/product-list" component={ProductList} />
              <PrivateRoute path="/" exact component={ProductList} />
            </Switch>
          </div>
        </main>
        <footer className="App-footer">
          <p>© 2024 Product Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
