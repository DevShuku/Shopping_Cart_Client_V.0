import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

export default function ShoppingGrid() {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({}); // Track quantities for each product

  // Fetch all products
  useEffect(() => {
    axios
      .get("https://localhost:7184/api/Shop/GetAllProducts")
      .then((result) => {
        setData(result.data.listProducts);
        // Initialize quantities for each product
        const initialQuantities = result.data.listProducts.reduce(
          (acc, item) => ({ ...acc, [item.id]: 1 }), // Default quantity is 1
          {}
        );
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Increment and decrement quantity for a specific product
  const incrementQuantity = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 1), // Ensure minimum quantity is 1
    }));
  };

  // Add item to cart
  const addToCart = async (itemId, itemPrice) => {
    try {
      const cartItem = {
        productId: itemId,
        quantity: quantities[itemId], // Use specific quantity for the product
        price: itemPrice,
      };

      const response = await axios.post(
        "https://localhost:7184/api/Cart/AddItemToCartAsync",
        cartItem
      );

      if (response.status === 200) {
        alert("Item added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <Fragment>
      <div className="site-wrap">
        <div className="site-navbar py-2">
          {/* Navbar code remains unchanged */}
        </div>

        <div className="site-section">
          <div className="container">
            <div className="row" id="product-list">
              {data && data.length > 0 ? (
                data.map((item) => (
                  <div
                    key={item.id}
                    className="col-sm-6 col-lg-4 text-center item mb-4"
                  >
                    <a href={`shop-single.html?id=${item.id}`}>
                      <img
                        src={item.imageUrl || "assets/images/default.png"}
                        alt={item.name}
                        className="img-fluid"
                      />
                    </a>
                    <h3 className="text-dark">
                      <a href={`shop-single.html?id=${item.id}`}>{item.name}</a>
                    </h3>
                    <p className="price">
                      {item.discountedPrice ? (
                        <>
                          <del>${item.actualPrice}</del> &mdash;{" "}
                        </>
                      ) : null}
                      ${item.discountedPrice || item.actualPrice}
                    </p>

                    <div className="mb-3">
                      <div
                        className="input-group mb-3"
                        style={{ marginLeft: "100px", maxWidth: "150px" }}
                      >
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary js-btn-minus"
                            type="button"
                            onClick={() => decrementQuantity(item.id)}
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          type="text"
                          id="qty"
                          className="form-control text-center"
                          value={quantities[item.id] || 1}
                          readOnly
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary js-btn-plus"
                            type="button"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <p>
                      <button
                        onClick={() => addToCart(item.id, item.discountedPrice || item.actualPrice)}
                        className="buy-now btn btn-sm height-auto px-4 py-3 btn-primary"
                      >
                        Add To Cart
                      </button>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center">No products available.</p>
              )}
            </div>
          </div>
        </div>

        <footer className="site-footer">
          {/* Footer code remains unchanged */}
        </footer>
      </div>
    </Fragment>
  );
}
