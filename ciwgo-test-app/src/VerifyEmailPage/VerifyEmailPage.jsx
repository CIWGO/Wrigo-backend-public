import { useState } from "react";

function VerifyEmail() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const checkUsername = () => {
    // may need to add function of check username into backend
    // or split login into 2 functions
  };

  const sendCode = (event) => {
    const btn = event.target;
    btn.disabled = true;
    // disable the button for 5 seconds
    let timeLeft = 5;
    const timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        btn.innerHTML = `Get verification code`;
        btn.disabled = false;
        timeLeft = 5;
        return;
      }
      btn.innerHTML = `Try again after ${timeLeft} second(s)`;
      timeLeft--;
    }, 1000);
  };

  return (
    <div>
      <form action="">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onBlur={checkUsername}
            required
          />
        </label>
        <button onClick={sendCode}>Get verification code</button>
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
