import { useState } from "react";

function ResetPassword() {
  const [password, setPassword] = useState("");

  return (
    <form>
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
        <input type="password" required />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ResetPassword;
