import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [visible, setVisibility] = useState(false);
  document.title = "Khedmah || Register";
  

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const user = {
    name,
    email,
    password,
    adminRole : false
  };
  const createUser = async (e) => {
    e.preventDefault();
    const {data} = await axios.post("http://localhost:5000/api/register", user)
    if (data.status === "success") {
      document.location.pathname = "/login";
    }
    setError(data.message);
  };
  return (
    <form onSubmit={createUser} className="form-user">
      <h5>
        <span>Re</span>gister
      </h5>
      <div className="input-parent">
        <span>
          <i className="fas fa-user"></i>
        </span>
        <input type="text" required placeholder="Enter Your name"  onChange={(e) => setName(e.target.value.trim())} value={name || ""}/>
      </div>
      <div className="input-parent">
        <span>
          <i className="fas fa-envelope"></i>
        </span>
        <input type="email" required placeholder="Enter Your email" onChange={(e) => setEmail(e.target.value.trim())} value={email || ""}/>
        <p className="text-danger">
        {error}
      </p>
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
          minLength={8}
        />
        <span className="show-password" onClick={() => setVisibility(!visible)}>
          <i className={visible ? "fas fa-eye-slash" : "fas fa-eye"}></i>
        </span>
      </div>
      <button type="submit" onSubmit={createUser}>Register now</button>
      <p>
        Already have an account? <a href="/login">Login now</a>
      </p>
    </form>
  );
}

export default Register;
