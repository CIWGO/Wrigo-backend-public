import { useState } from "react";

function VerifyEmail() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <div>
      <form action="">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <button>Get verification code</button>
        <br />
        <label>
          Code:
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
          />
        </label>
        <br />
        <a href="/resetPassword" className="link">
          Verify
        </a>
      </form>
    </div>
  );
}

export default VerifyEmail;
