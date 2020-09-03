import * as React from 'react';
import {useEffect, useState} from "react";
import {api} from "../dal/api";
import {Line} from "react-chartjs-2";
import numeral from "numeral"

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a")
                    }
                }
            }
        ]


    }
}

const LineGraph = ({casesType='cases'}) => {
    const [data, setData] = useState({});

    const buildChartData = (data, casesType = 'cases') => {
        const charData = []
        let lastDataPoint;

        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                charData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        }
        return charData
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.historyData()
            let charData = buildChartData(data, "cases")
            setData(charData)
        }
        fetchData()

    }, [casesType])


    return (
        <div>
            {data && data.length > 0 && (
                <Line data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204,16,52,0.6)",
                            borderColor: "CC1034",
                            data: data
                        }
                    ]


                }}
                      options={options}/>
            )}

        </div>
    );
};

export default LineGraph