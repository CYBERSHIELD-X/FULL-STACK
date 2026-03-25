import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("join", username);

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("typing", (user) => {
      setTyping(user + " is typing...");
      setTimeout(() => setTyping(""), 2000);
    });

    socket.on("users", (userList) => {
      setUsers(userList);
    });

  }, [username]);

  const sendMessage = () => {
    socket.emit("message", { username, message });
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", username);
  };

  return (
    <div>
      <h2>Chat App</h2>
      <h4>Online Users: {users.length}</h4>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.username}:</b> {msg.message}
          </p>
        ))}
      </div>

      <p>{typing}</p>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleTyping}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
