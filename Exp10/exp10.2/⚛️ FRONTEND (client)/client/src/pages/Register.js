import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({username:"", email:"", password:""});

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/auth/register", data);
    alert("Registered Successfully");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e=>setData({...data,username:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;
