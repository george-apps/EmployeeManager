import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import EmployeeList from "./components/EmployeeList";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [employeesUpdated, setEmployeesUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddEmployee = () => {
    setEmployeesUpdated(!employeesUpdated);
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state
  };

  return (
    <div className="App">
      <Navbar onAddEmployee={handleAddEmployee} onSearch={handleSearch} />
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <EmployeeList
                employeesUpdated={employeesUpdated}
                searchQuery={searchQuery}
              />
            }
          />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
