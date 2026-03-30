import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({email:"", password:""});

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    alert("Login Success");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;
