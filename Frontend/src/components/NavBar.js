import React, { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";

const Navbar = ({ onAddEmployee, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    onSearch(value); // Notify parent component of search query
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Employee Manager
        </a>
        <AddEmployeeModal onAddEmployee={onAddEmployee} />
        <form className="d-flex" onSubmit={handleSearchFormSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
