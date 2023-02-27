import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const comparePasswords = () => {
    const isMatch = document.getElementById("isMatch");
    isMatch.innerHTML =
      confirmPassword === password
        ? "Passwords match"
        : "Passwords do not match";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3005/users/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: "45f23e97-7ab4-4c33-ba44-c1361f878d91",
        username: "chang019",
        password: password,
      }),
    });

    if (response.ok) {
      alert("Successful password change. Redirecting to login page...");
      navigate("/login");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm new password:
        <input
          type="password"
          onChange={(event) => setConfirmPassword(event.target.value)}
          onBlur={comparePasswords}
          required
        />
      </label>
      <span id="isMatch"></span>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ChangePassword;
