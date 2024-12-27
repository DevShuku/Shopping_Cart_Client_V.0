import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

export default function ShoppingGrid() {
  const [data, setData] = useState([]);
  const [cartValue, setCartValue] = useState(0);
  const [quantities, setQuantities] = useState([]);

  // fetch all products
  useEffect(() => {
    axios
      .get("https://localhost:7184/api/Shop/GetAllProducts")
      .then((result) => {
        setData(result.data.listProducts);
        const initialQuantities = result.data.listProducts.reduce(
          (acc, item) => ({ ...acc, [item.id]: 1 }),
          {}
        );
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // icrement and decrement quantity for a specific product
  const incrementQuantity = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 1),
    }));
  };

  // add item to cart
  const addToCart = async (itemId, itemPrice) => {
    debugger;
    try {
      const cartItem = {
        productId: itemId,
        quantity: quantities[itemId],
        price: itemPrice,
      };
      const quantity = cartValue + quantities[itemId];
      const response = await axios.post(
        "https://localhost:7184/api/Shop/AddItemToCart",
        cartItem
      );

      if (response.status === 200) {
        setCartValue(quantity != 0 ? quantity : 0);
        alert("Item added to cart successfully!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <Fragment>
      <div class="site-wrap">
        <div class="site-navbar py-2">
          <div class="container">
            <div class="d-flex align-items-center justify-content-between">
              <div class="logo">
                <div class="site-logo">
                  <a href="getsetgo.html" class="js-logo-clone">
                    PharmaCart
                  </a>
                </div>
              </div>
              <div class="main-nav d-none d-lg-block">
                <nav
                  class="site-navigation text-right text-md-center"
                  role="navigation"
                >
                  <ul class="site-menu js-clone-nav d-none d-lg-block">
                    <li>
                      <a onClick={(event) => (window.location.href = "/")}>
                        Home
                      </a>
                    </li>
                    <li class="active">
                      <a onClick={(event) => (window.location.href = "/")}>
                        Store
                      </a>
                    </li>
                    <li>
                      <a href="getsetgo.html">About</a>
                    </li>
                    <li>
                      <a href="getsetgo.html">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="icons">
                <a href="#" class="icons-btn d-inline-block js-search-open">
                  <span class="icon-search"></span>
                </a>
                <a
                  onClick={(event) =>
                    (window.location.href = "/CartInteraction")
                  }
                  class="icons-btn d-inline-block bag"
                >
                  <span class="icon-shopping-bag"></span>
                  <span class="number">{cartValue != 0 ? cartValue : 0}</span>
                </a>

                <a
                  href="#"
                  class="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
                >
                  <span class="icon-menu"></span>
                </a>
              </div>
            </div>
          </div>
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
                    <a href="getsetgo.html">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                      />
                    </a>
                    <h3 className="text-dark">
                      <a href="getsetgo.html">{item.name}</a>
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
                        onClick={() =>
                          addToCart(
                            item.id,
                            item.discountedPrice || item.actualPrice
                          )
                        }
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

        <footer class="site-footer">
          <div class="container">
            <div class="row pt-5 mt-5 text-center">
              <div class="col-md-12">
                <p>
                  Copyright &copy;{" "}
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <script>
        document.addEventListener('DOMContentLoaded', fetchProducts);
      </script>
    </Fragment>
  );
}
