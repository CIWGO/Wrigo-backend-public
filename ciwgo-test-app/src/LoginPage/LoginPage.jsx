import { useState } from "react";
import { useNavigate  } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3005/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      
      const data = await response.json();
      // login success
      localStorage.setItem("token", data.token); // store the token in localStorage
      localStorage.setItem("uid", data.uid); // store the uid in localStorage
      localStorage.setItem("username", data.username); // store the username in localStorage
      alert("Login successful!");
      navigate('/userProfile');

    } else if (response.status === 401) {
      // unverified email
      alert("unverified email");
    } else {
      // login failure
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
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
        <button type="submit">Login</button>
      </form>
      <a href="/verifyEmail" className="link">
        Forgot your password?
      </a>
    </div>
  );
}

export default Login;
