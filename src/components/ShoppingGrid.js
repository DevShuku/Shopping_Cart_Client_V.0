import React, { Fragment } from "react";
import products from "../../src/components/ShoppingGridData";

export default function ShoppingGrid() {
  return (
    <Fragment>
      <div className="row">
      {products.map((product) => (
        <div className="col-sm-6 col-lg-4 text-center item mb-4" key={product.id}>
          {product.tag && <span className="tag">{product.tag}</span>}
          <a href={product.link}>
            <img src={product.image} alt={product.name} />
          </a>
          <h3 className="text-dark">
            <a href={product.link}>{product.name}</a>
          </h3>
          <p className="price">
            {product.price.original && <del>${product.price.original}</del>} &mdash; ${product.price.current}
          </p>
        </div>
      ))}
    </div>
    </Fragment>
  );
}
