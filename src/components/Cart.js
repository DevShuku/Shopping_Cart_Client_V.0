import React, { useState, useEffect,Fragment } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Ibuprofen", price: 55.0, quantity: 1, image: "images/product_02.png" },
    { id: 2, name: "Bioderma", price: 49.0, quantity: 1, image: "images/product_01.png" },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

 return (
 <Fragment>
  <div className="site-blocks-table">
    <table className="table table-bordered">
      <thead>
        <tr>
          <th className="product-thumbnail">Image</th>
          <th className="product-name">Product</th>
          <th className="product-price">Price</th>
          <th className="product-quantity">Quantity</th>
          <th className="product-total">Total</th>
          <th className="product-remove">Remove</th>
        </tr>
      </thead>
      <tbody>
        {
		  cartItems.map((item) => (
          <tr key={item.id}>
            <td className="product-thumbnail">
              <img src={item.image} alt={item.name} className="img-fluid" />
            </td>
            <td className="product-name">
              <h2 className="h5 text-black">{item.name}</h2>
            </td>
            <td>${item.price.toFixed(2)}</td>
            <td>
              <div className="input-group mb-3" style={{ maxWidth: "120px" }}>
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-primary js-btn-minus"
                    type="button"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    &minus;
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control text-center"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-primary js-btn-plus"
                    type="button"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    &plus;
                  </button>
                </div>
              </div>
            </td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
              <button
                className="btn btn-primary height-auto btn-sm"
                onClick={() => setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id))}>
                X
              </button>
            </td>
          </tr>
        ))
		}
      </tbody>
    </table>
    <div className="text-right">
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  </div>
   <Fragment>
);

};
//Static way 
const handleQuantityChange = (id, newQuantity) => {
  if (newQuantity < 1) return; // Prevent quantities less than 1

  const updatedCartItems = cartItems.map((item) =>
    item.id === id ? { ...item, quantity: newQuantity } : item
  );
  setCartItems(updatedCartItems);
};

//Dynamic way 
const handleQuantityChange = async (id, newQuantity) => {
  if (newQuantity < 1) return;

  try {
    const response = await fetch(`/api/Shop/UpdateCartItem?cartItemId=${id}&quantity=${newQuantity}`, {
      method: "PUT",
    });
    if (response.ok) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCartItems);
    } else {
      console.error("Failed to update quantity");
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};
