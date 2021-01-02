import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooks";
import axios from "axios";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export default function Add() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
        title: "",
        budget: "",
  });
  let color;
  var newData;

  async function handleSubmit(event) {
    color = "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    let user = await Auth.currentAuthenticatedUser();
    event.preventDefault();
    newData = {
      username: user.username,
      data: [
        {
          title: fields.title,
          color: color,
          budget: fields.budget,
        },
        
      ]
    };
    console.log(newData)
    await axios.put("http://64.225.57.235:5000/add", newData);
    history.go(0);
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit} role="view">
        <Form.Group controlId="title" size="lg">
          <Form.Label>Enter the budget title</Form.Label>
          <Form.Control
            autoFocus
            type="input"
            value={fields.title}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="budget" size="small">
          <Form.Label>Enter the budget amount</Form.Label>
          <Form.Control
            type="number"
            value={fields.budget}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Button block size="lg" type="submit" variant="success" role="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
