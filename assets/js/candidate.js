async function bc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("<>");
    const rows = dataset[no].split("\n").splice(1);
    // console.log(rows)
    // console.log(dataset)


    for (let i = 1; i < rows.length - 1; i++) {
        const newObj = {};

        newObj.y = [];
        newObj.x = ["General", "SC", "ST"];
        newObj.type = "bar";

        let d = rows[i].split(',');
        // console.log(d);
        newObj.name = d[0];
        for (let j = 1; j < d.length - 1; j++) {
            newObj.y.push(d[j]);
        }
        plotData.push(newObj);
    }


    const layout = {
        title: rows[0],
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


async function wf1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("<>");
    const rows = dataset[no].split("\n").splice(1);
    // console.log(rows)
    // console.log(dataset)


    let i = rows.length - 1;
    const newObj = {};

    newObj.y = [];
    newObj.x = ["General", "SC", "ST", "Total"];
    newObj.measure = ["relative","relative","relative","total"]
    newObj.type = "waterfall";

    let d = rows[i].split(',');
    // console.log(d);
    newObj.name = d[0];
    for (let j = 1; j < d.length; j++) {
        newObj.y.push(d[j]);
    }
    plotData.push(newObj);



    const layout = {
        title: rows[0],
        hovermode: 'closest',
        showlegend: false,
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


bc1("datasets/csv/Candidate_data_summary.csv", 0, can1);
bc1("datasets/csv/Candidate_data_summary.csv", 1, can2);
bc1("datasets/csv/Candidate_data_summary.csv", 2, can3);
bc1("datasets/csv/Candidate_data_summary.csv", 3, can4);
bc1("datasets/csv/Candidate_data_summary.csv", 4, can5);