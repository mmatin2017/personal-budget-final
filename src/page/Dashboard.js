import React, { Component } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Auth } from "aws-amplify";

class Dashboard extends Component {
  state = {
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
  async newUserData() {
    let user = await Auth.currentAuthenticatedUser();
    const newUser = {
      username: user.username,
    };
    console.log(newUser.username);
    axios.post("http://localhost:5000/addBudget", newUser);
  }

  async componentDidMount() {
    this.newUserData();
    let user = await Auth.currentAuthenticatedUser();
    const newUser = {
      username: user.username,
    };
    const res = await axios.get("http://localhost:5000/budget");
    let tempData = this.state.data;
    let index;
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i].username === newUser.username) {
        console.log(true);
        index = i;
      }
    }
    console.log(index);

    for (let j = 0; j < res.data[0].data.length; j++) {
      tempData.datasets[0].data[j] = res.data[0].data[j].budget;
      tempData.labels[j] = res.data[0].data[j].title;
      tempData.datasets[0].backgroundColor[j] = res.data[0].data[j].color;
    }

    this.setState({
      data: Object.assign({}, this.state.data, {
        data: tempData,
      }),
    });
  }

  render() {
    return (
      <main className="center" id="main">
        <div className="page-area">
          <div className="text-box">
            <h1>Your Spending</h1>
            <p>
              <Pie data={this.state.data} />
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default Dashboard;
