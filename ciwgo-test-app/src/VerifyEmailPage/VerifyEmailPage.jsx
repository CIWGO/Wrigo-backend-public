function VerifyEmail() {
  return (
    <div>
      <form action="">
        <label>
          Username:
          <input type="text" required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" required />
        </label>
        <button>Get verification code</button>
        <br />
        <label>
          Code:
          <input type="text" required />
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
