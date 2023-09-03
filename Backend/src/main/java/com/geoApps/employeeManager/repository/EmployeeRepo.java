package com.geoApps.employeeManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.geoApps.employeeManager.model.Employee;




public interface EmployeeRepo extends JpaRepository<Employee, Integer> {


}
