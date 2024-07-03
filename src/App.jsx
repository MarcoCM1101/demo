import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import AuthenticationCallback from "./components/AuthenticationCallback";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Cart />} />
          <Route
            path="/authentication-callback"
            element={<AuthenticationCallback />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
