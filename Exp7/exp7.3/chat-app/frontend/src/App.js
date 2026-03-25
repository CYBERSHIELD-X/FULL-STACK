import React, { useState } from "react";
import Chat from "./Chat";

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div>
      {!joined ? (
        <div>
          <h2>Enter Username</h2>
          <input onChange={(e) => setUsername(e.target.value)} />
          <button onClick={() => setJoined(true)}>Enter Chat</button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
