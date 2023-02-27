import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "http://localhost:3005/users/resetPassword/verifyOTP",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: "45f23e97-7ab4-4c33-ba44-c1361f878d91",
          userInput: code,
        }),
      }
    );

    if (response.ok) {
      alert("Successful verification. Redirecting...");
      navigate("/resetPassword");
    } else if (response.status === 401) {
      alert("Invalid code");
    } else {
      alert("Something went wrong");
    }
  };

  const sendCode = async (event) => {
    const btn = event.target;
    btn.disabled = true;
    // disable the button for 60 seconds
    let timeLeft = 60;
    const timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        btn.innerHTML = `Get verification code`;
        btn.disabled = false;
        timeLeft = 60;
        return;
      }
      btn.innerHTML = `Try again after ${timeLeft} second(s)`;
      timeLeft--;
    }, 1000);

    const emailResponse = await fetch(
      "http://localhost:3005/users/resetPassword/sendOTPViaEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: "45f23e97-7ab4-4c33-ba44-c1361f878d91",
          username: username,
        }),
      }
    );
    if (emailResponse.ok) {
      alert("send email successful!");
    } else if (emailResponse.status === 500) {
      alert("send fail 500 (Something went wrong)");
    } else {
      alert("send fail other than 500");
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
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyEmail;
