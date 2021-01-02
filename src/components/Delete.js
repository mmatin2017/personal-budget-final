import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooks";
import axios from "axios";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export default function Delete() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    title: "",
  });
  var newData;

  async function handleSubmit(event) {
    let user = await Auth.currentAuthenticatedUser();
    event.preventDefault();
    newData = {
      username: user.username,
      title: fields.title,
    };

    await axios.put("http://64.225.57.235:5000/remove", newData);

    history.go(0);
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" size="lg">
          <Form.Label>Enter title of budget to delete</Form.Label>
          <Form.Control
            type="input"
            value={fields.title}
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
