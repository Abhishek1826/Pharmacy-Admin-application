import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import LoginPage from "./LoginPage";
import OrdersListingPage from "./OrdersListingPage";
import ProductsListingPage from "./ProductsListingPage";
import UsersListing from "./UsersListing";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check login status when the app mounts
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  const login = () => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Navbar loggedIn={loggedIn} logout={logout} />
      <Routes>
        <Route path="/LoginPage" element={<LoginPage login={login} />} />
        <Route path="/OrdersListingPage" element={<OrdersListingPage />} />
        <Route path="/ProductsListingPage" element={<ProductsListingPage />} />
        <Route path="/UsersListing" element={<UsersListing />} />
        
      </Routes>
    </Router>
  );
}

export default App;
