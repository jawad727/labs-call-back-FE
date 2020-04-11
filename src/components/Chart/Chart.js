import React from 'react';
import { Bar } from 'react-chartjs-2';
import './chart.css';


const Chart = (props) => {



   

    const obj = {}

    props.StoreArray.forEach(item => {
    if (!obj[item]) return obj[item] = 1
    obj[item] = obj[item] + 1;
    })

    const arrayOfArrays = Object.entries(obj)

    arrayOfArrays.sort((a,b) => a[1] > b[1] ? -1 : 1 )

    const labels = [];
    const data = [];

    arrayOfArrays.forEach(item => {
    labels.push(item[0])
    data.push(item[1])
    })

    
        const chartData = {
            labels: labels.slice(0, 5),
            datasets: [{
                data: data.slice(0, 5),
                backgroundColor: [
                    'rgba(242, 125, 125, 1)',
                    'rgba(239, 206, 97, 1)',
                    'rgba(125, 242, 197, 1)',
                    'rgba(172, 242, 125, 1)',
                    'rgba(139, 125, 242, 1)',
                ]
            }],
            
           
        }
    

        return (
            <div>

                <Bar 
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: "Most Frequently Reviewed"
                        },
                        legend: {
                            display: false,
                            position: 'right'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                        
                    }}
                />

            </div>
        )
    
}

export default Chart;