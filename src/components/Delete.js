import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooks";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Delete() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    title: "",
  });
  


  async function handleSubmit(event) {
      event.preventDefault();
      
      axios.delete('http://localhost:5000/deleteBudget', {
          data: { title: fields.title }
      });
      history.push("/dashboard");
      history.go(0)
    
  }
    return (
      <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" size="lg">
          <Form.Label>Enter expense name to be deleted</Form.Label>
          <Form.Control
            type="input"
            value={fields.title}
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