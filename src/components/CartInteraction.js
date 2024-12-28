import axios from "axios";
import React, { useState, useEffect } from "react";
export default function CartInteraction() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, SetData] = useState([]);
  const [discount, setDiscountAmt] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);

  // fetch cart items on component load
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    debugger;
    await axios
      .get("https://localhost:7184/api/Shop/GetCartItems")
      .then((result) => {
        SetData(result.data.cartItems);
        setCartItems(result.data.cartItems);
        calculateTotalPrice(result.data.cartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DISCOUNT_CAP = 500; // discnt cap
  const DISCOUNT_PERCENTAGE = 10; // discount percentage
  debugger;
  const calculateTotalPrice = (items) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // apply discount if subtotal exceeds threshold
    const discount =
      subtotal > DISCOUNT_CAP ? (subtotal * DISCOUNT_PERCENTAGE) / 100 : 0;
    const total = subtotal - discount;

    setSubTotalPrice(subtotal);
    setDiscountAmt(discount);
    setTotalPrice(total);
  };

  const handleRemoveItem = async (id) => {
    debugger;
    await axios
      .delete(`https://localhost:7184/api/Shop/RemoveCartItem?cartItemId=${id}`)
      .then((result) => {
        if (result.data.success) {
          debugger;
          const updatedCartItems = cartItems.filter(
            (item) => item.productId !== id
          );
          setCartItems(updatedCartItems);
          calculateTotalPrice(updatedCartItems);
        }
      })
      .catch((error) => {
        console.error("Error removing cart item:", error);
      });
  };

  return (
    <div className="container">
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0" style={{ color: "#1ca3a3" }}>
              <a onClick={(event) => (window.location.href = "/")}>Home</a>{" "}
              <span className="mx-2 mb-0">/</span>
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
                      <th
                        className="product-thumbnail"
                        style={{ color: "#1ca3a3" }}
                      >
                        Image
                      </th>
                      <th className="product-name" style={{ color: "#1ca3a3" }}>
                        Product
                      </th>
                      <th
                        className="product-price"
                        style={{ color: "#1ca3a3" }}
                      >
                        Price
                      </th>
                      <th
                        className="product-quantity"
                        style={{ color: "#1ca3a3" }}
                      >
                        Quantity
                      </th>
                      <th
                        className="product-total"
                        style={{ color: "#1ca3a3" }}
                      >
                        Total
                      </th>
                      <th
                        className="product-remove"
                        style={{ color: "#1ca3a3" }}
                      >
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={item.id}>
                          <td className="product-thumbnail">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="img-fluid"
                            />
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black">
                              {item.productName}
                            </h2>
                          </td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>
                            <div
                              className="input-group mb-3"
                              style={{ maxWidth: "120px" }}
                            >
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-primary js-btn-minus"
                                  type="button"
                                >
                                  &minus;
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control text-center"
                                value={item.quantity}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-primary js-btn-plus"
                                  type="button"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              className="btn btn-primary height-auto btn-sm"
                              onClick={() => handleRemoveItem(item.productId)}
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p className="text-center">No products available.</p>
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <button
                    className="btn btn-outline-primary btn-md btn-block"
                    onClick={fetchCartItems}
                  >
                    Update Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <a
                    onClick={(event) => (window.location.href = "/")}
                    className="btn btn-primary btn-md btn-block"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">
                        Cart Totals
                      </h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">
                        ${subTotalPrice.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                  {discount != 0 ? (
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span
                          className="text-black"
                          style={{ color: "rgb(255, 73, 0)" }}
                        >
                          Discount Applied Over 500$ (10% Off)
                        </span>
                      </div>
                      <div
                        className="col-md-6 text-right"
                        style={{ color: "#ff4900" }}
                      >
                        <strong
                          className="text-black"
                          style={{ color: "#ff4900" }}
                        >
                          (-) ${discount.toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">
                        ${totalPrice.toFixed(2)}
                      </strong>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        onClick={() => (window.location = "getsetgo.html")}
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
}
