import React, { useState, useEffect } from "react";

const CartInteraction = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items on component load
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/Shop/GetCartItems");
      const data = await response.json();
      if (data.success) {
        setCartItems(data.items);
        calculateTotalPrice(data.items);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`/api/Shop/UpdateCartItem?cartItemId=${id}&quantity=${newQuantity}`, {
        method: "PUT",
      });
      const data = await response.json();
      if (data.success) {
        const updatedCartItems = cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`/api/Shop/RemoveCartItem?cartItemId=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await fetch(`/api/Shop/ApplyCoupon?couponCode=${couponCode}`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        alert("Coupon applied successfully!");
        fetchCartItems(); // Refresh cart items and totals
      } else {
        alert("Failed to apply coupon: " + data.message);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  return (
    <div className="container">
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>
              <strong className="text-black">Cart</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12">
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
                    {cartItems.map((item) => (
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
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                              }
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
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <button className="btn btn-primary btn-md btn-block" onClick={fetchCartItems}>
                    Update Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <a href="index.html" className="btn btn-outline-primary btn-md btn-block">
                    Continue Shopping
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" htmlFor="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary btn-md px-4" onClick={handleApplyCoupon}>
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        onClick={() => (window.location = "checkout.html")}
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
