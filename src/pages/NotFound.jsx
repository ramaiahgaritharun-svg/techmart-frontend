import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <h1 style={{ fontSize: "90px" }}>404</h1>

      <h3>Page Not Found</h3>

      <p>The page you are looking for doesn't exist.</p>

      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
