// Bonus Activity
// Function to get values to coordinate x and y for a needle
function gaugePointer(value){
    var degrees = 180 - value;
    var radius = 0.5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = "M -.0 -0.035 L .0 0.035 L ";
    var pathX = String(x);
    var space = " ";
    var pathY = String(y);
    var pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    return path;
}

// Function for a gauge chart
function gauge_chart(location, wfreq){
    // Variable to render center circle
    var trace1 = {
        x: [0],
        y: [0],
        marker: {size: 18, color: '850000'},
        showlegend: false,
        name: "Times a week",
        text: wfreq,
        hoverinfo: "text+name",
        showlegend: false
    };

    // Variable to render a gauge chart
    var trace2 = {
        values: [100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100],
        rotation: 90,
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
        textinfo: "text",
        textposition: "inside",
        direction: "clockwise",
        marker: {
            colors: ["rgb(249, 244, 236)",
                     "rgb(245, 242, 229)",
                     "rgb(234, 231, 201)",
                     "rgb(229, 232, 177)",
                     "rgb(213, 230, 153)",
                     "rgb(183, 205, 143)",
                     "rgb(139, 192, 134)",
                     "rgb(137, 188, 141)",
                     "rgb(131, 181, 137)",
                     "white"]
        },
        hoverinfo: "skip",
        hole: .4,
        type: "pie",
        showlegend: false
    };

    // For rendering a needle and hovering information
    var layout = {
            shapes: [
                {
                type: "path",
                // Degree of a needle: 10 + (Value * 20)
                path: gaugePointer(10 + wfreq * 20),
                fillcolor: "850000",
                line: {color: "850000"}
                }],
            title: "Belly Button Washing Frequency",
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            autosize: true
    };
    
    if(first_load === true)
        Plotly.newPlot(location, [trace1, trace2], layout);
    else
        Plotly.react(location, [trace1, trace2], layout);
}