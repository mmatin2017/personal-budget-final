import React, { Component } from "react";
import axios from "axios";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class Dashboard extends Component {
  state = {
    select: "Pie",

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

  async newUserData() {}

  async componentDidMount() {
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
      tempData.label = res.data[index].data[0].title;
    }
    tempData.label = res.data[index].data[1].title;
    console.log(tempData);

    this.setState({
      data: Object.assign({}, this.state.data, {
        data: tempData,
      }),
    });
  }

  handleSelect = (e) => {
    console.log(e);
    this.setState({ select: e });
    console.log(this.state.select);
  };

  render() {
    return (
      <Form>
        <main className="center" id="main">
          <div className="page-area">
            <div className="text-box">
              <h1>Your Spending</h1>

              <DropdownButton
                id="dropdown-basic-button"
                title="Change expense view"
                onSelect={this.handleSelect}
              >
                <Dropdown.Item eventKey="Pie">Pie</Dropdown.Item>
                <Dropdown.Item eventKey="Bar">Bar</Dropdown.Item>
                <Dropdown.Item eventKey="Doughnut">Doughnut</Dropdown.Item>
              </DropdownButton>

              {this.state.select !== "Pie" ? (
                this.handleSelect
              ) : (
                <Pie data={this.state.data} />
              )}
              {this.state.select !== "Bar" ? (
                this.handleSelect
              ) : (
                <Bar data={this.state.data} />
              )}
              {this.state.select !== "Doughnut" ? (
                this.handleSelect
              ) : (
                <Doughnut data={this.state.data} />
              )}
            </div>
          </div>
        </main>
      </Form>
    );
  }
}

export default Dashboard;
