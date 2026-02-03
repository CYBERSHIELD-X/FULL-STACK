import { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" }
  ]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  const addBook = () => {
    if (title && author) {
      setBooks([...books, { title, author }]);
      setTitle("");
      setAuthor("");
    }
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Library Management System</h1>

      <input
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="form">
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {filteredBooks.map((book, index) => (
        <div className="book-card" key={index}>
          <div>
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
          </div>
          <button className="remove" onClick={() => removeBook(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
