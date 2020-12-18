import React, { Component } from "react";
import Add from "../components/Add";
import Update from "../components/Update";
import Delete from "../components/Delete";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";



export default class Budget extends Component {
  state = {
    select: "Add"
}

handleSelect = (e) => {
  console.log(e);
  this.setState({ select: e });
  console.log(this.state.select);
};

  render(){
  return (
    <div className="Budget">
      
                <DropdownButton
                id="dropdown-basic-button"
                title="Budget Build Select"
                onSelect={this.handleSelect}
              >
                <Dropdown.Item eventKey="Add">Add an expense</Dropdown.Item>
                <Dropdown.Item eventKey="Update">Edit an expense</Dropdown.Item>
                <Dropdown.Item eventKey="Delete">Delete an expense</Dropdown.Item>
              </DropdownButton>
              {this.state.select !== "Add" ? (
                this.handleSelect
              ) : (
                <Add/>
              )}
              {this.state.select !== "Update" ? (
                this.handleSelect
              ) : (
                <Update/>
              )}
              {this.state.select !== "Delete" ? (
                this.handleSelect
              ) : (
                <Delete/>
              )}

    </div>
  );
  }
}