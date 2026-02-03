function ProductCard(props) {
  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>₹{props.price}</p>
      <p>{props.inStock ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
}
