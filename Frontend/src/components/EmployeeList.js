import React, { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";
import AddEmployeeModal from "./AddEmployeeModal";
import axios from "axios";

const EmployeeList = ({ employeesUpdated, searchQuery }) => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const filterEmployees = () => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    fetchEmployees();
  }, [employeesUpdated]);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchQuery]);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8080/employee/all")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container mt-4">
      {error ? (
        <div className="row">
          <div className="col-md-12">
            <p>An error occurred: {error}</p>
          </div>
        </div>
      ) : (
        <div className="row">
          {(filteredEmployees.length > 0 ? filteredEmployees : employees).map(
            (employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onAddEmployee={fetchEmployees}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
