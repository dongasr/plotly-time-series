const lineColors = {
    green: "#44bb66",
    red: "#bb4466",
    blue: "#4466bb"
}

const config = {
    displayModeBar: false,
    responsive: true
}

const plot1Div = document.getElementById('vis1');
const plot2Div = document.getElementById('vis2');
const plot3Div = document.getElementById('vis3');


Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function(err, rows) {

    var trace0 = {
        type: "scatter",
        mode: "lines",
        name: 'AAPL High',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'AAPL.High'),
        line: { color: lineColors.green }
    }

    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'AAPL Low',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'AAPL.Low'),
        line: { color: lineColors.red }
    }

    var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'AAPL Volume',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'AAPL.Volume'),
        line: { color: '#17BECF' }


    }

    var trace3 = {
        x: unpack(rows, 'Date'),
        close: unpack(rows, 'AAPL.Close'),
        high: unpack(rows, 'AAPL.High'),
        low: unpack(rows, 'AAPL.Low'),
        open: unpack(rows, 'AAPL.Open'),

        // cutomise colors
        increasing: { line: { color: 'black' } },
        decreasing: { line: { color: 'red' } },

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    var data1 = [trace0, trace1];

    var data2 = [trace2];

    var data3 = [trace3];


    var layout1 = {
        title: 'Apple (AAPL) Stock Price',
        xaxis: {
            autorange: true,
            range: ['2015-02-17', '2017-02-16'],
            rangeselector: {
                buttons: [{
                        count: 1,
                        label: '1m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    {
                        count: 6,
                        label: '6m',
                        step: 'month',
                        stepmode: 'backward'
                    },
                    { step: 'all' }
                ]
            },
            rangeslider: { range: ['2015-02-17', '2017-02-16'] },
            type: 'date',
            showspikes: true,
            spikemode: 'across',
            spikecolor: '#333',
            spikesides: true,
            spikethickness: 2
        },
        yaxis: {
            autorange: true,
            range: [86.8700008333, 138.870004167],
            type: 'linear'
        }
    };
    var layout2 = {
        title: 'Apple Stock Sales Volume',
        xaxis: {
            autorange: true,
            range: ['2015-02-17', '2017-02-16'],
            fixedrange: true,
            type: 'date',
            showspikes: true,
            spikemode: 'across',
            spikecolor: '#333',
            spikesides: true,
            spikethickness: 2
        },
        yaxis: {
            autorange: true,
            fixedrange: true,
            type: 'linear'
        }
    };




    var layout3 = {
        title: 'Apple Stock Candle Chart',
        dragmode: 'zoom',
        showlegend: false,
        xaxis: {
            rangeslider: {
                visible: false
            }
        }
    };




    Plotly.newPlot(plot1Div, data1, layout1, config);
    Plotly.newPlot(plot2Div, data2, layout2, config);
    Plotly.newPlot(plot3Div, data3, layout3, config);


    plot1Div.on('plotly_relayout',
        function(eventdata) {


            console.log(eventdata);

            var update;

            if (eventdata['xaxis.autorange']) {
                console.log("auto true");
                update = {
                    xaxis: {
                        autorange: true,
                        fixedrange: true,
                        rangeslider: {
                            visible: false
                        }
                    }
                }
            } else if (eventdata['xaxis.range']) {
                let xScaleStart = eventdata['xaxis.range'][0];
                let xScaleEnd = eventdata['xaxis.range'][1];

                update = {
                    xaxis: {
                        autorange: false,
                        fixedrange: true,
                        range: [xScaleStart, xScaleEnd],
                        rangeslider: {
                            visible: false
                        }
                    }
                }

            } else {
                let xScaleStart = eventdata['xaxis.range[0]'];
                let xScaleEnd = eventdata['xaxis.range[1]'];

                update = {
                    xaxis: {
                        autorange: false,
                        fixedrange: true,
                        range: [xScaleStart, xScaleEnd],
                        rangeslider: {
                            visible: false
                        }
                    }
                }

            }


            Plotly.relayout(plot2Div, update);
            Plotly.relayout(plot3Div, update)

        });
})

function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
}