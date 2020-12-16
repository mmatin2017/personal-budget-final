import React, { Component } from 'react'
import axios from 'axios';
import { Pie } from 'react-chartjs-2';


class Dashboard extends Component {
  state = {
    data: {
      datasets: [
        {
            data: [],
            backgroundColor:[]
            
        }
      ],
      labels: []
    } 
  }

  async componentDidMount(){
    const res = await axios.get('http://localhost:5000/budget');
    let tempData = this.state.data;
    for(let i=0;i<res.data.length;i++){
        tempData.datasets[0].data[i] = res.data[i].budget;
        tempData.labels[i] = res.data[i].title;
        tempData.datasets[0].backgroundColor[i] = res.data[i].color;

    }

    this.setState({
      data: Object.assign({}, this.state.data, {
          data: tempData
      })
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
