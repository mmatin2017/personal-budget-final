import React, { Component } from "react";
import Add from "../components/Add";
import Update from "../components/Update";



export default class Budget extends Component {
  render(){
  return (
    <div className="Budget">
    <Add/>
    <Update/>
    </div>
  );
  }
}