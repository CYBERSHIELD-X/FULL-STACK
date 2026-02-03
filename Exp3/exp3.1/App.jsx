import ProductCard from "./ProductCard";

function App() {
  return (
    <div>
      <h2>Product Card Experiment</h2>
      <ProductCard
        name="Wireless Mouse"
        price={799}
        inStock={true}
      />
    </div>
  );
}

export default App;
