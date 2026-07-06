import "./Loader.css";

function Loader() {
  return (
    <main className="loader-screen">
      <div className="loader" aria-hidden="true" />
      <p className="loader-message">Hold on, my love...</p>
    </main>
  );
}

export default Loader;
