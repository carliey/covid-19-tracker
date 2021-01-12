import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral'

//graphline options
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function Graph() {
    const [data, setData] = useState(null);

    const buildChartData = (data, casesType ='cases') =>{
        let chartData = [];
        let lastDataPoint;

        for(let date in data.cases){
            if(lastDataPoint){
              let newDataPoint = 
                {
                    x: date,
                    y: data['cases'][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data['cases'][date];
        };
        return chartData;
    }

    useEffect(() => {
        const fetchData = async () =>{
            const res = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=30`);
            const data = await res.json();
            console.log(data);
            const chartData = (buildChartData(data))
            setData(chartData);
        }
        fetchData();
    }, [])

console.log(data)
    return (
        <div>
          {data !== null? 
            <Line 
              data={{
                datasets:[
                  {
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data: data,
                  }
                ]
              }}
              options={options}
            />
            :
            <div>loading</div>
          }
            
        </div>
    )
}

export default Graph
