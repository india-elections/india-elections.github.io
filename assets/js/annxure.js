async function bc1(url, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("\n");
    // console.log(dataset)
    
    dataset.forEach(ele => {
        let rows = ele.split(":");
        let d = rows[1].split(',');
        // console.log(rows);
        // console.log(d);

        const newObj = {};

        newObj.y = [];
        newObj.x = ["General", "SC", "ST"];
        newObj.type = "bar";
        newObj.name = rows[0];


        for (let i = 0; i < d.length - 1; i++) {
            newObj.y.push(d[i]);
        }
        plotData.push(newObj);

    });


    const layout = {
        title: "Postal Votes",
        hovermode: 'closest',
        showlegend: true,
        automargin: true,
        legend: {
            "orientation": "h",
            x: 0,
            y: -0.3
        },
        font: {
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };


    const config = {
        responsive: true,
        displayModeBar: false
    };


    Plotly.newPlot(id, plotData, layout, config);
}


bc1("datasets/csv/annxure.csv", ann1);