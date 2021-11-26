const colours = { BJP: "rgb(255, 165, 0)", AITC: "rgb(0,255,0)", NOTA: "rgb(255,0,0)", IND: "rgb(0,0,255)", RSSCMJP: "rgb(0,255,255)" }


async function pieChart(url, ac_n, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.json();
    const dataset = data.filter(el => el["AC NAME"] === ac_n);


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.marker = { colors: [] }
    newObj.hole = 0.4;
    let count = 0;
    newObj.type = "pie";

    dataset.forEach(element => {
        if (element["PARTY"] === "AITC" || element["PARTY"] === "BJP" || element["PARTY"] === "NOTA" || element["PARTY"] === "RSSCMJP" || element["PARTY"] === "IND") {
            newObj.values.push(element.TOTAL);
            newObj.labels.push(`${element["CANDIDATE NAME"]}(${element["PARTY"]})`);
            newObj.marker.colors.push(colours[element.PARTY])
        } else {
            count += element.TOTAL;
        }
    });
    newObj.values.push(count);
    newObj.labels.push("OTHER");
    newObj.marker.colors.push("rgb(128,128,128)");

    plotData.push(newObj);

    const layout = {
        showlegend: true,
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


async function pc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("@").splice(1);
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


async function pc2(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("@").splice(1);
    const row = dataset[no];
    const d = row.split('\r\n').splice(1);
    // console.log(d)
    // console.log(dataset)


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.hole = 0.4;
    newObj.type = "pie";

    for (let i = 1; i < d.length - 1; i++) {
        let t = d[i].split(",");
        newObj.values.push(t[5]);
        newObj.labels.push(t[1]);
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


async function bc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const d = data.split('\r\n').splice(1);
    // console.log(d)

    let t = d[no].split(",");
    // console.log(t)


    const newObj = {};

    newObj.x = ["male", "female", "third gender"];
    newObj.y = [t[1], t[2], t[3]];
    newObj.hole = 0.4;
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


async function traces(url, party) {
    const response = await fetch(url);
    let data = await response.json();
    const dataset = data.filter(el => el["PARTY"] === party);

    const newObj = {};

    newObj.x = [];
    newObj.y = [];
    newObj.orientation = 'h';
    newObj.type = 'bar';
    newObj.name = party;
    dataset.forEach(element => {
        newObj.x.unshift(element["% VOTES POLLED"]);
        newObj.y.unshift(element["AC NAME"] + " ");
    });
    if (Object.keys(colours).includes(party)) {
        newObj.marker = {
            color: colours[party]
        }
    }

    return newObj;
}


async function barChart(Title) {
    let plotData = [];

    let data = await fetch("../datasets/csv/allParties.csv")
    let dataset = await data.text();
    let rows = dataset.split("\r\n");

    for (let i = 0; i < rows.length; i++) {
        let partyname = rows[i].split(",");
        let t = await traces("../datasets/d.json", partyname[1]);
        plotData.push(t);
    }

    const layout = {
        title: Title,
        showlegend: false,
        height: 7000,
        margin: {
            l: 140,
            r: 15
        },
        font: {
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
        },
        barmode: 'stack',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            showgrid: false
        }
    };
    const config = { responsive: true };


    Plotly.newPlot(map, plotData, layout, config);
}


pieChart("../datasets/d.json", "Mekliganj", "myDiv");
pc1("../datasets/csv/Electors_Data_Summary.csv", 0, "eds1");
pc1("../datasets/csv/Electors_Data_Summary.csv", 6, "eds2");
pc1("../datasets/csv/Electors_Data_Summary.csv", 7, "eds3");
pc1("../datasets/csv/Electors_Data_Summary.csv", 8, "eds4");
pc1("../datasets/csv/Electors_Data_Summary.csv", 9, "eds5");
pc1("../datasets/csv/Electors_Data_Summary.csv", 10, "eds6");
pc2("../datasets/csv/Electors_Data_Summary.csv", 1, "eds7");
pc2("../datasets/csv/Electors_Data_Summary.csv", 2, "eds8");
pc2("../datasets/csv/Electors_Data_Summary.csv", 3, "eds9");
pc2("../datasets/csv/Electors_Data_Summary.csv", 4, "eds10");
pc2("../datasets/csv/Electors_Data_Summary.csv", 5, "eds11");
bc1("../datasets/csv/Highlight.csv", 0, "eds12");
bc1("../datasets/csv/Highlight.csv", 1, "eds13");
bc1("../datasets/csv/Highlight.csv", 2, "eds14");
barChart("Constituency Results in '%'");