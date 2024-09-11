import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You would typically handle form submission here, e.g., sending data to an API.
    // For now, we will just show a success alert and clear the form.

    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000); // Hide the alert after 5 seconds

    // Clear form fields
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Container className="my-5">
      {showToast && (
        <Alert variant="success">
          We have received your message. Thank you for reaching out!
        </Alert>
      )}
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Contact Us</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="subject" className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="message" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              placeholder="Your Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Send Message
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ContactUs;
