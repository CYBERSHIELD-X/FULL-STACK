import React from "react";
import ProductList from "./ProductList";

function App() {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Product Catalog
      </h2>
      <ProductList />
    </div>
  );
}

export default App;