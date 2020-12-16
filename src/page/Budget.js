import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooks";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Budget() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    title: "",
    budget: "",
  });
  


  async function handleSubmit(event) {
      let color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
      event.preventDefault();

      const newUser = {
        title: fields.title,
        budget: fields.budget,
        color: color
      };

      axios.post('http://localhost:5000/addBudget', newUser);
      history.push("/dashboard");
      history.go(0)
    
  }
    return (
      <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" size="lg">
          <Form.Label>Expense Name</Form.Label>
          <Form.Control
            autoFocus
            type="input"
            value={fields.title}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="budget" size="lg">
          <Form.Label>budget</Form.Label>
          <Form.Control
            type="number"
            value={fields.budget}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          variant="success"
          >
          Submit
        </Button>
      </Form>
      </div>
    );
  

}