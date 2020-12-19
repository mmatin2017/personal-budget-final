import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Auth } from "aws-amplify";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Update from "../components/Update";
import Add from "../components/Add";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { onError } from "../lib/errors";

class Dashboard extends Component {
  state = {
    select: "Pie",
    selectBudget: "Add",

    data: {
      username: "",
      datasets: [
        { 
          label: "Budget",
          data: [],
          backgroundColor: [],
        },
      ],
      labels: [],
    },
  };

  

  async componentDidMount() {
    try {
      let user = await Auth.currentAuthenticatedUser();
    const newUser = {
      username: user.username,
    };
    console.log(newUser.username);
    axios.post("http://localhost:5000/addBudget", newUser);
    const res = await axios.get("http://localhost:5000/budget");
    let tempData = this.state.data;
    let index;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].username === newUser.username) {
        console.log(true);
        index = i;
        break;
      }
    }
    console.log(index);

    for (let j = 0; j < res.data[index].data.length; j++) {
      tempData.datasets[0].data[j] = res.data[index].data[j].budget;
      tempData.labels[j] = res.data[index].data[j].title;
      tempData.datasets[0].backgroundColor[j] = res.data[index].data[j].color;
    }
    console.log(tempData);

    this.setState({
      data: Object.assign({}, this.state.data, {
        data: tempData,
      }),
    });
    } catch(event){
      onError(event)
    }
  }

  handleSelectBudget = (e) => {
    console.log(e);
    this.setState({ selectBudget: e });
    console.log(this.state.selectBudget);
  };

  handleSelectChartView= (e) => {
    console.log(e);
    this.setState({ select: e });
    console.log(this.state.select);
  };


  render() {
    return (
     
        <main className="center" id="main">
          <div className="page-area">
            <div className="text-box">
              <h1>Your Budget Data</h1>
              <CardGroup role = "layout">
              <Card style={{ width: "10rem" }}
              align = "left"
              size = "small">
          <Card.Img variant="top"/>
          <Card.Body>
            <DropdownButton
              id="dropdown-basic-button"
              title="Budget Build Select"
              onSelect={this.handleSelectBudget}
              menuAlign="left"
              size = "small" 
              role="selectionMenu"
            >
              <Dropdown.Item eventKey="Add" role="selection" >Add an expense</Dropdown.Item>
              <Dropdown.Item eventKey="Update" role="selection">Edit an expense</Dropdown.Item>
              <Dropdown.Item eventKey="Delete" role="selection">Delete an expense</Dropdown.Item>
            </DropdownButton>
            {this.state.selectBudget !== "Add" ? this.handleSelectBudget : <Add/>}
            {this.state.selectBudget !== "Update" ? this.handleSelectBudget : <Update />}
            </Card.Body>
          </Card>
          <Card style={{ width: "14rem" }}
              align = "left">
          <Card.Img variant="middle"/>
          <Card.Body>
        
              <DropdownButton
                id="dropdown-basic-button"
                title="Change expense view"
                onSelect={this.handleSelectChartView}
                align="right"
                size = "small"
                menuAlign="right"
                role="selectionMenu"

              >
                <Dropdown.Item eventKey="Pie" role="selection">Pie</Dropdown.Item>
                <Dropdown.Item eventKey="Bar" role="selection">Bar</Dropdown.Item>
                <Dropdown.Item eventKey="Doughnut" role="selection">Doughnut</Dropdown.Item>
              </DropdownButton>

              {this.state.select !== "Pie" ? (this.handleSelect) : 
              (<Pie data={this.state.data}
                role="pieData" />)}
              {this.state.select !== "Bar" ? (this.handleSelect) : 
              (<Bar data={this.state.data}
                role="pieData" />)}
              {this.state.select !== "Doughnut" ? (this.handleSelect) : 
              (<Doughnut data = {this.state.data} 
                role="doughnutData"/>
              )}
              </Card.Body>
          </Card>
          </CardGroup>
            </div>
          </div>
        </main>
      
    );
  }
}

export default Dashboard;
