import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";

export default function routerPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
      </Routes>
    </Router>
  );
}
