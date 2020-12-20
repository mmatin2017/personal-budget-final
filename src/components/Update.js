import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooks";
import axios from "axios";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export default function Update() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
        title: "",
        budget: ""
  });

  async function handleSubmit(event) {
    let user = await Auth.currentAuthenticatedUser();
    event.preventDefault();
    const newData = {
      username: user.username,

          title: fields.title,
          budget: fields.budget,
          
       
        

    };
    console.log(newData)
    axios.put("http://64.225.57.235:5000/updateBudget", newData);
    history.push("/dashboard");
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit} role="view">
        <Form.Group controlId="title" size="lg">
          <Form.Label>Enter the expense title</Form.Label>
          <Form.Control
            autoFocus
            type="input"
            value={fields.title}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="budget" size="lg">
          <Form.Label>Enter the expense amount</Form.Label>
          <Form.Control
            type="number"
            value={fields.budget}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </div>
  );
}
