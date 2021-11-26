const gender = ['male', 'female'];


async function bc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    // console.log(data);
    const d = data.split('\n').splice(1);
    // console.log(d)

    let t = d[no].split(',');
    // console.log(t)


    const newObj = {};

    newObj.measure = ['relative', 'relative', 'relative', 'total']
    newObj.x = ["male", "female", "third gender", 'total'];
    newObj.y = [t[1], t[2], t[3], t[4]];
    newObj.type = "waterfall";


    plotData.push(newObj);

    const layout = {
        title: t[0],
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


async function radar(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    // console.log(data);
    const d = data.split('\n').splice(1);
    // console.log(d)

    for(let j = 0; j <= 1; j++) {
        const newObj = {};
        newObj.name = gender[j];
        newObj.fill = 'toself';
        newObj.type = 'scatterpolar';
        newObj.theta = [];
        newObj.r = [];
        newObj.text = [];
        newObj.hoverinfo = 'text';
        // newObj.marker = {color: '#a9afbbd1'}

        for (let i = 0; i <= no; i++) {
            let t = d[i].split(',');
            // console.log(t)
    
            newObj.theta.push(t[0]);
            newObj.r.push(Math.log(t[j+1]));
            newObj.text.push(t[j+1]);
        }
        plotData.push(newObj);
    }
    // console.log(plotData)

    const layout = {
        title: "Log Radar",
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
        polar: {
            bgcolor: 'rgba(0,0,0,0)',
            radialaxis: {
              visible: true,
              showticklabels: false,
              label: false
            }
          }
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
    // console.log(data);
    const d = data.split('\n').splice(1);
    // console.log(d)

    let t = d[no].split(',');
    // console.log(t)


    const newObj = {};

    // newObj.measure = ['relative','relative','relative','total']
    newObj.x = ["male", "female", "third gender"];
    newObj.y = [t[1], t[2], t[3]];
    newObj.type = "bar";


    plotData.push(newObj);

    const layout = {
        title: t[0],
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


async function pc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const d = data.split('<>');
    // console.log(d)

    let t = d[no].split("\n").splice(1);
    // console.log(t)


    const newObj = {};

    newObj.labels = t[0].split(',').splice(1);
    newObj.values = t[1].split(',').splice(1);
    newObj.type = "pie";

    for (let i = 1; i < t.length; i++) {

    }


    plotData.push(newObj);

    const layout = {
        title: 'No. of Contestants in a Constituency',
        showlegend: true,
        automargin: true,
        legend: {
            "orientation": "h",
            x: 0,
            y: -0.5
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


async function pc2(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const d = data.split('<>');
    // console.log(d)

    let t = d[no].split("\n").splice(1);
    // console.log(t)


    const newObj = {};

    newObj.labels = [];
    newObj.values = [];
    newObj.type = "pie";

    for (let i = 0; i < t.length; i++) {
        let temp = t[i].split(',');
        newObj.labels.push(temp[0]);
        newObj.values.push(temp[1]);
    }


    plotData.push(newObj);

    const layout = {
        title: t[1].split(',')[0],
        showlegend: true,
        automargin: true,
        legend: {
            "orientation": "h",
            x: 0,
            y: -0.5
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


// bc1("./datasets/csv/Highlight.csv", 0, "hl1");
// bc1("./datasets/csv/Highlight.csv", 1, "hl2");
// bc1("./datasets/csv/Highlight.csv", 2, "hl3");
// bc1("./datasets/csv/Highlight.csv", 3, "hl4");
// bc1("./datasets/csv/Highlight.csv", 4, "hl5");
radar("./datasets/csv/Highlight.csv", 4, "hl1");
bc2("./datasets/csv/Highlight.csv", 5, "hl2");
pc1("./datasets/csv/Highlight.csv", 1, "hl3");
pc2("./datasets/csv/Highlight.csv", 2, "hl4");
