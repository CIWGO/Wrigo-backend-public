import "./NavPage.css";
function NavigationPage() {
  return (
    <div className="box">
      <header>
        <p>essay input page implemented, please navigate to /evaluate to use</p>

        <a href="/evaluate" className="link">
          essay evaluate page
        </a>
        <a href="/signup" className="link">
          sign up page
        </a>
        <a href="/login" className="link">
          login page
        </a>
        <a href="/userProfile" className="link">
        userProfile page
        </a>
        <a href="/updateUserProfile" className="link">
        update UserProfile page
        </a>
      </header>
    </div>
  );
}

export default NavigationPage;
