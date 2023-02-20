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
          signup page
        </a>
      </header>
    </div>
  );
}

export default NavigationPage;
