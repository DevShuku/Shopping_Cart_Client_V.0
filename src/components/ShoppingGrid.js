import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

export default function ShoppingGrid() {
  const [data, SetData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7184/api/Shop/GetAllProducts")
      .then((result) => {
        SetData(result.data.listProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const productList = document.getElementById("product-list");

  const [num, setNum] = useState(0);

  const CounterI = () => {
    setNum(num + 1);
  };
  const CounterD = () => {
    setNum(num - 1);
  };

  return (
    <Fragment>
      <div class="site-wrap">
        <div class="site-navbar py-2">
          <div class="container">
            <div class="d-flex align-items-center justify-content-between">
              <div class="logo">
                <div class="site-logo">
                  <a href="main.html" class="js-logo-clone">
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
                      <a href="main.html">Home</a>
                    </li>
                    <li class="active">
                      <a href="shop.html">Store</a>
                    </li>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="icons">
                <a href="#" class="icons-btn d-inline-block js-search-open">
                  <span class="icon-search"></span>
                </a>
                <a href="cart.html" class="icons-btn d-inline-block bag">
                  <span class="icon-shopping-bag"></span>
                  <span class="number">2</span>
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
                data.map((item, index) => (
                  <div
                    key={index}
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

                    <div class="mb-3">
                      <div
                        class="input-group mb-3"
                        style={{ marginLeft: "100px", maxWidth: "150px" }}
                      >
                        <div class="input-group-prepend">
                          <button
                            class="btn btn-outline-primary js-btn-minus"
                            type="button"
                            onClick={CounterD}
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          type="text"
                          id="qty"
                          class="form-control text-center"
                          value={num}
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />

                        <div class="input-group-append">
                          <button
                            onClick={CounterI}
                            class="btn btn-outline-primary js-btn-plus"
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <p>
                      <button
                        onClick={(event) =>
                          (window.location.href = "/CartInteraction")
                        }
                        class="buy-now btn btn-sm height-auto px-4 py-3 btn-primary"
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
