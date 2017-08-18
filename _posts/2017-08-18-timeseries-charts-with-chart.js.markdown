---
layout: post
title: Timeseries charts with Chart.js
tags: [javascript, react, charts, chart.js]
excerpt: "This is more of a note to myself as I seem to always take ages to do time series charts with Chart.js and somehow can't remember how I did it last time."
hn_id: 15022078
---

Somehow I always end up having to do timeseries charts. Chart.js is my tool of choice for that task, but I never seem to remember what options to pass and what format the data should have. Yesterday I must have spent 2 hours looking at the docs and trying various things, mostly because it didn't occur to me to check the last project where I used them, [Budgt](https://budgt.eu)

So anyway, note to self : this is how you do timeseries graphs in chart.js

``` js

const ctx = document.getElementById('chartCanvas').getContext('2d');
const data = {
            labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
            datasets: [{
                fill: false,
                label: 'Page Views',
                data: [280, 250, 340],
                borderColor: '#fe8b36',
                backgroundColor: '#fe8b36',
                lineTension: 0,
              }
            ]
          }
const options = {
    type: 'line',
    data: data,
    options: {
        fill: false,
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Hours",
                }
            }]
        }
    }
}
const chart = new Chart(ctx, options);

```

That's it. Hopefully I'll remember I posted this here next time I need timeseries charts in chart.js

