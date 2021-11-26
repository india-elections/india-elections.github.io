const arr = ['Gen', 'SC', 'ST']

async function pc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("<>").splice(1);
    const row = dataset[no];
    const d = row.split(',').splice(1);
    // console.log(d)
    // console.log(dataset)


    const newObj = {};

    newObj.values = [];
    newObj.labels = ["General", "SC", "ST"];
    newObj.hole = 0.4;
    newObj.type = "pie";

    for (let i = 1; i < d.length - 1; i++) {
        newObj.values.push(d[i]);
    }

    plotData.push(newObj);

    const layout = {
        title: d[0],
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


async function bc3(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("<>").splice(1);
    const row = dataset[no];
    const d = row.split(',').splice(1);
    // console.log(d)
    // console.log(dataset)


    const newObj = {};

    newObj.y = [];
    newObj.x = ["General", "SC", "ST"];
    newObj.hole = 0.4;
    newObj.type = "bar";

    for (let i = 1; i < d.length - 1; i++) {
        newObj.y.push(d[i]);
    }

    plotData.push(newObj);

    const layout = {
        title: d[0],
        showlegend: false,
        automargin: true,
        legend: {
            "orientation": "h",
            x: 0,
            y: 1.5
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


async function bc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("<>").splice(1);
    const row = dataset[no];
    const d = row.split('\n').splice(1);
    // console.log(d)
    // console.log(dataset)


    for (let i = 1; i < d.length - 1; i++) {
        let t = d[i].split(",").splice(1);
        if (t[0] === '"PERCENTAGE(to Postal Votes)"') continue;
        const newObj = {};

        newObj.y = [];
        newObj.x = ['Gen', 'SC', 'ST', 'Total'];
        newObj.type = "bar";


        // console.log(t)
        newObj.name = t[0];
        for (let j = 1; j <= t.length; j++) {
            newObj.y.push(t[j]);
        }
        plotData.push(newObj);
    }


    let T = d[0].split(',');

    const layout = {
        title: T[1],
        showlegend: true,
        automargin: true,
        hovermode: 'closest',
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


async function sun(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("<>").splice(1);
    const row = dataset[no];
    const d = row.split('\n').splice(1);
    // console.log(d)
    // console.log(dataset)
    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.parents = [];
    newObj.type = "sunburst";
    newObj.textfont = {"color": "white"};
    newObj.leaf = { opacity: 0.4 };
    newObj.marker = {line: {width: 2}};
    newObj.text = [];
    newObj.textinfo = "text";
    newObj.hoverinfo = "label";
    newObj.textposition = 'inside';
    newObj.insidetextorientation = 'radial';


    for (let i = 1; i < d.length - 1; i++) {
        let t = d[i].split(",").splice(1);
        if (t[0] === '"PERCENTAGE(to Postal Votes)"') continue;


        // console.log(t)
        newObj.labels.push(t[0] + ': ' + t[4]);
        newObj.text.push(t[0]);
        newObj.values.push(0);
        newObj.parents.push("");
        for (let j = 1; j < t.length - 1; j++) {
            newObj.labels.push(arr[j - 1] + ': ' + t[j])
            newObj.text.push(arr[j-1])
            newObj.values.push(Math.log(t[j]));
            newObj.parents.push(t[0] + ': ' + t[4]);
        }
    }

    plotData.push(newObj);
    // console.log(plotData)


    let T = d[0].split(',');

    const layout = {
        title: T[1],
        automargin: true,
        hovermode: 'closest',
        font: {
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
        },
        paper_bgcolor: '#202940',
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
    const dataset = data.split("<>").splice(1);
    const row = dataset[no];
    const d = row.split('\n').splice(1);
    // console.log(d)
    // console.log(dataset)


    let i = d.length - 1;
    let t = d[i].split(",").splice(1);
    const newObj = {};

    newObj.y = [];
    newObj.x = ['Gen', 'SC', 'ST', 'Total'];
    newObj.measure = ['relative', 'relative', 'relative', 'total']
    newObj.type = "waterfall";


    // console.log(t)
    newObj.name = t[0];
    for (let j = 1; j <= t.length; j++) {
        newObj.y.push(t[j]);
    }
    plotData.push(newObj);


    let T = d[0].split(',');

    const layout = {
        title: T[1],
        showlegend: false,
        automargin: true,
        hovermode: 'closest',
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


async function bc2(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("<>").splice(1);
    const row = dataset[no];
    const d = row.split('\n').splice(1);
    // console.log(d)
    // console.log(dataset)


    for (let i = 1; i < d.length - 1; i++) {
        let t = d[i].split(",").splice(1);
        if (t[0] === '"PERCENTAGE(to Postal Votes)"') {
            const newObj = {};

            newObj.y = [];
            newObj.x = ['Gen', 'SC', 'ST', 'Total'];
            newObj.type = "bar";


            // console.log(t)
            newObj.name = t[0];
            for (let j = 1; j <= t.length; j++) {
                newObj.y.push(t[j]);
            }
            plotData.push(newObj);
        }
    }


    let T = d[0].split(',');

    const layout = {
        title: 'Rejected Votes Percentage(to postal votes)',
        showlegend: false,
        automargin: true,
        hovermode: 'closest',
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


pc1("./datasets/csv/Electors_Data_Summary.csv", 0, "eds1");
pc1("./datasets/csv/Electors_Data_Summary.csv", 6, "eds2");
pc1("./datasets/csv/Electors_Data_Summary.csv", 7, "eds3");
bc3("./datasets/csv/Electors_Data_Summary.csv", 8, "eds4");
pc1("./datasets/csv/Electors_Data_Summary.csv", 9, "eds5");
pc1("./datasets/csv/Electors_Data_Summary.csv", 10, "eds6");
sun("./datasets/csv/Electors_Data_Summary.csv", 1, "eds7");
bc1("./datasets/csv/Electors_Data_Summary.csv", 2, "eds8");
bc1("./datasets/csv/Electors_Data_Summary.csv", 3, "eds9");
bc1("./datasets/csv/Electors_Data_Summary.csv", 4, "eds10");
sun("./datasets/csv/Electors_Data_Summary.csv", 5, "eds11");
bc2("./datasets/csv/Electors_Data_Summary.csv", 5, "eds12");