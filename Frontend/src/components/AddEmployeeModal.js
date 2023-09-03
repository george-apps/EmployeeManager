import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const AddEmployeeModal = ({ onAddEmployee }) => {
  const [showModal, setShowModal] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    jobTitle: "",
    phone: "",
    imageUrl: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewEmployee({
      name: "",
      email: "",
      jobTitle: "",
      phone: "",
      imageUrl: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/employee/add", {
        name: e.target.name.value,
        email: e.target.email.value,
        jobTitle: e.target.jobTitle.value,
        phone: e.target.phone.value,
        imageUrl: e.target.imageUrl.value,
      })
      .then((response) => {
        console.log(response.data.message);
        onAddEmployee(); // Notify parent component of successful addition
        //handleModalClose();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });

    handleModalClose();
  };

  return (
    <>
      <Button variant="success" onClick={handleModalOpen}>
        Add New Employee
      </Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={newEmployee.name}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="jobTitle">
              <Form.Control
                type="text"
                name="jobTitle"
                placeholder="jobTitle"
                value={newEmployee.jobTitle}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Control
                type="text"
                name="phone"
                placeholder="phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>

            <Form.Group controlId="imageUrl">
              <Form.Control
                type="text"
                name="imageUrl"
                placeholder="imageUrl"
                value={newEmployee.imageUrl}
                onChange={handleInputChange}
                style={{ marginBottom: 10 }}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="secondary"
                onClick={handleModalClose}
                style={{ marginRight: 10 }}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
