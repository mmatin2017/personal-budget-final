import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function BudgetPage() {
  return (
    <div className="Login">
      <Form>
        <Form.Group size="lg" controlId="input">
          <Form.Label>Expense Name</Form.Label>
          <Form.Control autoFocus type="input" />
        </Form.Group>
        <Form.Group size="lg" controlId="input">
          <Form.Label>Expense Cost</Form.Label>
          <Form.Control type="input" />
        </Form.Group>
        <Button block size="lg" type="submit">
          Enter Budget Data
        </Button>
      </Form>
    </div>
  );
}

export default BudgetPage;