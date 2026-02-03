import ProductCard from "./ProductCard";

function App() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <ProductCard
        name="Wireless Mouse"
        price={799}
        image="https://via.placeholder.com/200"
        inStock={true}
      />

      <ProductCard
        name="Keyboard"
        price={1299}
        image="https://via.placeholder.com/200"
        inStock={false}
      />
    </div>
  );
}

export default App;
