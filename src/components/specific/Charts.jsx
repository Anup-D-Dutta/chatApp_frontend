import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJS, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins } from 'chart.js'
import { red, redLight, oranges } from '../../constants/color';
import { getLast7days } from '../../lib/features'

ChartJS.register(Tooltip, CategoryScale, LinearScale, LineElement, PointElement, Filler, ArcElement, Legend);

const labels = getLast7days();

const lineChatOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
}

const LineChart = ({ value = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                label: "Revenue",
                fill: true,
                // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                backgroundColor: redLight,

                // borderColor: 'rgba(75,192,192,1)'
                borderColor: red

            },
        ],
    };

    return <Line data={data} options={lineChatOptions} />

};


const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        // title: {
        //     display: false,
        // }
    },
    cutout: 120,
}

const DoughnutChart = ({ value = [], labels = [] }) => {

    const data = {
        labels,
        datasets: [
            {
                data: value,
                fill: true,
                backgroundColor: [redLight, oranges],
                hoverbackgroundColor: [red, oranges],
                borderColor: [red, oranges],
                offset: 30,
            },
        ],
    };


    return (
        <Doughnut style={{ zIndex: 10 }} data={data} options={doughnutChartOptions} />
    )
}


export { LineChart, DoughnutChart };
