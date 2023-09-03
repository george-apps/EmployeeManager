package com.geoApps.employeeManager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geoApps.employeeManager.exceptions.UserNotFoundException;
import com.geoApps.employeeManager.model.Employee;
import com.geoApps.employeeManager.repository.EmployeeRepo;

@Service
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee updateEmployeeById(Integer id, Employee employee) {
        return employeeRepo.findById(id).map(Employee -> {
            Employee.setName(employee.getName());
            Employee.setEmail(employee.getEmail());
            Employee.setJobTitle(employee.getJobTitle());
            Employee.setPhone(employee.getPhone());
            Employee.setImageUrl(employee.getImageUrl());
            return employeeRepo.save(Employee);
        }).orElseThrow(() -> new UserNotFoundException("User by id " + id + "was not found"));
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeById(Integer id) {
        return employeeRepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + "was not found"));
    }

    public void deleteEmployee(Integer id) {
        employeeRepo.deleteById(id);
    }

}
