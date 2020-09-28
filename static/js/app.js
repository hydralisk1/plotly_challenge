// Variable to check if the page is loaded for the first time
var first_load = true;

// Function calling when the test subject ID is changed
function optionChanged(value){
    // JSON data load
    d3.json("samples.json").then(data =>{
        // Load metadata filtered by selected ID
        var selected_metadata = data.metadata.filter(d => d.id === parseInt(value))[0];
        // How many they clean their belly buttons a week
        var wfreq = selected_metadata.wfreq;
        
        // Remove the previous metadata and render new ones
        d3.selectAll("ul").remove()
        d3.select("#sample-metadata")
          .append("ul")
          .selectAll("li")
          .data(Object.entries(selected_metadata))
          .enter()
          .append("li")
          .text(d => `${d[0]}: ${d[1]}`);
        
        // Load sample data filtered by selected ID
        var selected_data = data.samples.filter(d => d.id === value)[0];
        var otu_ids = selected_data.otu_ids;
        var otu_labels = selected_data.otu_labels;
        var sample_values = selected_data.sample_values;

        // Variables to render a horizontal bar chart
        var bar_x = sample_values.slice(0, 10).reverse();
        var bar_y = otu_ids.slice(0, 10).reverse().map(d => "OTU " + d);
        var bar_text = otu_labels.slice(0, 10).reverse();

        // Render a horizontal bar chart, a gauge chart, and a bubble chart
        hbar_chart("bar", bar_x, bar_y, bar_text);
        gauge_chart("gauge", wfreq);
        bubble_chart("bubble", otu_ids, sample_values, otu_labels);      
    });
}

// Function rendering a horizontal bar chart
function hbar_chart(location, x, y, text){
    var trace = {
        x: x,
        y: y,
        type: "bar",
        orientation: "h",
        text: text
    };
    
    // If this page is loaded for the first time, render a chart.
    // If not, update the chart with changed data
    if (first_load === true)
        Plotly.newPlot(location, [trace]);
    else
        Plotly.react(location, [trace]);
}

// Function rendering a bubble chart
function bubble_chart(location, x, y, text){
    var marker = {
        size: y,
        color: x,
        colorscale: "Portland",
        sizeref: 1.5
    };

    var trace = {
        x: x,
        y: y,
        text: text,
        mode: "markers",
        marker: marker
    };

    var layout = {
        xaxis: {title: "OTU ID"}
    }

    // If this page is loaded for the first time, render a chart, then change the variable, first_load to false
    // If not, update the chart with changed data
    if (first_load === true){
        Plotly.newPlot(location, [trace], layout);
        first_load = false;
    }
    else
        Plotly.react(location, [trace], layout);
}

// Function running initially
function init(){
    d3.json("samples.json").then(data => {
        // Choose the first data to render metadata and charts initially
        d3.select("#selDataset")
          .selectAll("option")
          .data(data.names)
          .enter()
          .append("option")
          .attr("value", d => d)
          .text(d => d);

        optionChanged(data.names[0]);
    });
}

init();