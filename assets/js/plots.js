//Bhangar,Kalimpong
const colours = { BJP: "rgb(255, 165, 0)", AITC: "rgb(0,255,0)", NOTA: "rgb(255,0,0)", IND: "rgb(0,0,255)", RSSCMJP: "rgb(0,255,255)" }


async function pieChart(url, ac_no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.json();
    const dataset = data.filter(el => el["AC NO."] === ac_no);


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.marker = { colors: [] }
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
        font:{
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
          },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };
    const config = { responsive: true };


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
        newObj.y.unshift(element["AC NO."] + " " + element["AC NAME"] + " ");
    });
    if(Object.keys(colours).includes(party)){
        newObj.marker = {
            color: colours[party]
        }
    }

    return newObj;
}

async function getData(rows) {
    let plotData = [];

    rows.forEach(async ele => {
        let partyname = ele.split(",");
        let t = await traces("datasets/d.json", partyname[1]);
        plotData.push(t);
    });

    return plotData;
}


async function barChart(Title) {

    let data = await fetch("datasets/csv/allParties.csv")
    let dataset = await data.text();
    let rows = dataset.split("\r\n");

    const layout = {
        title: Title,
        height: 7000,
        font:{
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
          },
        margin: {
            l: 200,
            r: 20,
            t: 50,
            b: 70,
            pad: 10
        },
        barmode: 'stack',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            showgrid: false
        }
    };
    const config = { responsive: true };

    const plotData = await getData(rows);
    setTimeout(() => {
        Plotly.newPlot(map, plotData, layout, config);
    }, 2000);
}


pieChart("datasets/d.json", 1, "myDiv");
barChart("Constituency Results in '%'");
