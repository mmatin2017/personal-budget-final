import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Auth } from "aws-amplify";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Update from "../components/Update";
import Delete from "../components/Delete";
import Add from "../components/Add";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

class Dashboard extends Component {
  state = {
    select: "Pie",
    selectBudget: "Add",

    data: {
      username: "",
      datasets: [
        {
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

      axios.post("http://64.225.57.235:5000/create", newUser);
      const res = await axios.get("http://64.225.57.235:5000/budget");
      let tempData = this.state.data;
      let index;
      
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].username === newUser.username) {
          index = i;
          break;
        }
      }

      for (let j = 0; j < res.data[index].data.length; j++) {
        tempData.datasets[0].data[j] = res.data[index].data[j].budget;
        tempData.labels[j] = res.data[index].data[j].title;
        tempData.datasets[0].backgroundColor[j] = res.data[index].data[j].color;
      }
      console.log(user);
      this.setState({
        data: Object.assign({}, this.state.data, {
          data: tempData,
        }),
      });
    } catch (event) {
      console.log(event);
    }
  }

  handleSelectBudget = (e) => {
    this.setState({ selectBudget: e });
    console.log(this.state.selectBudget);
  };

  handleSelectChartView = (e) => {
    this.setState({ select: e });
    console.log(this.state.select);
  };

  renderAdd(){
   return(
      <Add/>
   )
  }

  renderUpdate(){
    return(
      <Update/>
    )
    
  }

  renderDelete(){
    return(
      <Delete/>
    )
    
  }

  render() {
    return (
      <main className="center" id="main">
        <div className="page-area">
          <div className="text-box">
            <h1>Your Budget Data</h1>
            <CardGroup role="layout">
              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                <DropdownButton
              id="dropdown-basic-button"
              title="Change expense view"
              onSelect={this.handleSelectBudget}
              align="left"
              size="small"
              menuAlign="left"
              role="selectionMenu"
            >
              <Dropdown.Item eventKey="Add" role="selection">
                Add
              </Dropdown.Item>
              <Dropdown.Item eventKey="Update" role="selection">
                Update
              </Dropdown.Item>
              <Dropdown.Item eventKey="Delete" role="selection">
                Remove
              </Dropdown.Item>
            </DropdownButton>
              {this.state.selectBudget !== "Add" ? (this.handleSelect ) : (this.renderAdd())}
              {this.state.selectBudget !== "Update" ? (this.handleSelect ) : (this.renderUpdate() )}
              {this.state.selectBudget !== "Delete" ? (this.handleSelect ) : (this.renderDelete())}
                  
          
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" />
                <Card.Body>
                <DropdownButton
              id="dropdown-basic-button"
              title="Change expense view"
              onSelect={this.handleSelectChartView}
              align="right"
              size="small"
              menuAlign="right"
              role="selectionMenu"
            >
              <Dropdown.Item eventKey="Pie" role="selection">
                Pie
              </Dropdown.Item>
              <Dropdown.Item eventKey="Bar" role="selection">
                Bar
              </Dropdown.Item>
              <Dropdown.Item eventKey="Doughnut" role="selection">
                Doughnut
              </Dropdown.Item>
            </DropdownButton>

            {this.state.select !== "Pie" ? (
              this.handleSelect
            ) : (
              <Pie data={this.state.data} role="pieData"/>
            )}
            {this.state.select !== "Bar" ? (
              this.handleSelect
            ) : (
              <Bar data={this.state.data} role="pieData" />
            )}
            {this.state.select !== "Doughnut" ? (
              this.handleSelect
            ) : (
              <Doughnut data={this.state.data} role="doughnutData" />
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
