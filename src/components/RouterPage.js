import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingGrid from "./ShoppingGrid";
import CartInteraction from "./CartInteraction";

export default function routerPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingGrid />} />
        <Route path="/cartInteraction" element={<CartInteraction />} />
      </Routes>
    </Router>
  );
}
