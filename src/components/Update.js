import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooks";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Update() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    title: "",
    budget: "",
  });
  


  async function handleSubmit(event) {
      event.preventDefault();
      const newUser = {
        title: fields.title,
        budget: fields.budget,
      };
      axios.put('http://localhost:5000/updateBudget', newUser);
      history.push("/dashboard");
      history.go(0)
    
  }
    return (
      <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" size="lg">
          <Form.Label>Enter expense name to be updated</Form.Label>
          <Form.Control
            type="input"
            value={fields.title}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="budget" size="lg">
          <Form.Label>Enter new expense</Form.Label>
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