function ResetPassword() {
  return (
    <form action="">
      <label>
        New password:
        <input type="password" required />
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
