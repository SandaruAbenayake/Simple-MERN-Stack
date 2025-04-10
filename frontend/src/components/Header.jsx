import React from "react";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#f8f9fa",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "10px 40px",
        borderRadius: "0 0 12px 12px"
      }}
    >
      <a
        className="navbar-brand fw-bold"
        href="#"
        style={{
          color: "#007bff",
          fontSize: "24px",
          fontWeight: "600",
          fontFamily: "Arial, sans-serif"
        }}
      >
        Student Portal
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item active">
            <a className="nav-link" href="/" style={{ color: "#333" }}>
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add" style={{ color: "#333" }}>
              Create Student
            </a>
          </li>
        </ul>

        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search student"
            aria-label="Search"
            style={{ borderRadius: "8px", padding: "8px 12px" }}
          />
          <button
            className="btn btn-success"
            type="submit"
            style={{
              borderRadius: "8px",
              padding: "8px 16px",
              fontWeight: "500"
            }}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Header;
