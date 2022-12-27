import React from "react";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [visible, setVisibility] = useState(false);
  document.title = "Khedmah || Login";



  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const user = {
    email,
    password
  };
  const sendData = async (e) => {
    e.preventDefault();
    const {data} = await axios.post("http://localhost:5000/api/login", user)
    localStorage.setItem("token", data.token);
    if (data.status === "success") {
      document.location.pathname = "/";
    } else {
      console.log("please check your email and password");
    }
  };


  return (
    <form onSubmit={sendData} className="form-user">
      <h5><span>Lo</span>gin</h5>
      <div className="input-parent">
        <span>
          <i className="fas fa-envelope"></i>
        </span>
        <input type="email" required placeholder="Enter Your email"  onChange={(e) => setEmail(e.target.value.trim())} value={email || ""}/>
      </div>
      <div className="input-parent">
        <span>
          <i className="fas fa-lock"></i>
        </span>
        <input
          type={visible ? "text" : "password"}
          required
          placeholder="Confirm a password"
          onChange={(e) => setPassword(e.target.value.trim())} value={password || ""}
        />
        <span className="show-password" onClick={() => setVisibility(!visible)}>
          <i className={visible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
        </span>
      </div>
      <button type="submit" onSubmit={sendData}>Login Now</button>
      <p>
        Don't have an account? <a href="/register">Signup now</a>
      </p>
    </form>
  );
}

export default Login;
