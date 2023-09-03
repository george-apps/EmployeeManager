import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const EmployeeCard = ({ employee, onAddEmployee }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({
    name: employee.name,
    email: employee.email,
    jobTitle: employee.jobTitle,
    phone: employee.phone,
    imageUrl: employee.imageUrl,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleEditModalOpen = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditedEmployee({
      name: employee.name,
      email: employee.email,
      jobTitle: employee.jobTitle,
      phone: employee.phone,
      imageUrl: employee.imageUrl,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/employee/update/${employee.id}`, {
        name: e.target.name.value,
        email: e.target.email.value,
        jobTitle: e.target.jobTitle.value,
        phone: e.target.phone.value,
        imageUrl: e.target.imageUrl.value,
      })
      .then((response) => {
        console.log(response.data.message);
        onAddEmployee(); // Notify parent component of successful addition
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });

    handleEditModalClose();
  };

  const handleDeleteEmployee = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/employee/delete/${employee.id}`)
      .then((response) => {
        console.log(response.data.message);
        onAddEmployee(); // Notify parent component of successful deletion
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div className="col-md-4 text-center">
      <div className="card mb-4" style={{ width: "18rem" }}>
        <img src={employee.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{employee.name}</h5>
          <p className="card-text">
            <strong>Email:</strong> {employee.email}
          </p>
          <p className="card-text">
            <strong>Job Tittle:</strong> {employee.jobTitle}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {employee.phone}
          </p>
          <button className="btn btn-primary m-3" onClick={handleEditModalOpen}>
            edit
          </button>
          <button className="btn btn-danger" onClick={handleDeleteEmployee}>
            delete
          </button>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={editedEmployee.name}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="email"
                value={editedEmployee.email}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="jobTitle">
              <Form.Control
                type="text"
                name="jobTitle"
                placeholder="jobTitle"
                value={editedEmployee.jobTitle}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Control
                type="text"
                name="phone"
                placeholder="phone"
                value={editedEmployee.phone}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="imageUrl">
              <Form.Control
                type="text"
                name="imageUrl"
                placeholder="imageUrl"
                value={editedEmployee.imageUrl}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="secondary"
                onClick={handleEditModalClose}
                style={{ marginRight: 10 }}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeCard;
