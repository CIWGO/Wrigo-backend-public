import { useState } from "react";
import { Link } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3005/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      // login success
      localStorage.setItem("token", data.token); // store the token in localStorage
      localStorage.setItem("uid", data.uid); // store the uid in localStorage
      localStorage.setItem("username", data.username);
      const dat=localStorage.getItem("uid");
      console.log(dat); // store the username in localStorage
      alert("Login successful!");
    } else if (response.status === 401) {
      // unverified email
      alert("unverified email");
    } else {
      // login failure
      alert("Invalid username or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <Link to="/userProfile">
      <button type="submit">Login</button>
      </Link>
    </form>
  );
}

export default Login;
