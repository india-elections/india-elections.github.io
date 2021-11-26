//Bhangar,Kalimpong
const colours = { BJP: "rgb(255, 165, 0)", AITC: "rgb(0,255,0)", NOTA: "rgb(255,0,0)", IND: "rgb(0,0,255)", RSSCMJP: "rgb(0,255,255)" }


function searchBar() {
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");
    const searchBox = document.querySelector(".search-box input");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");

        searchBox.value = "";
        filterList("");

        if (optionsContainer.classList.contains("active")) {
            searchBox.focus();
        }
    });

    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            optionsList.classList.toggle("selected");
        });
    });

    searchBox.addEventListener("keyup", function (e) {
        filterList(e.target.value);
    });

    const filterList = searchTerm => {
        searchTerm = searchTerm.toLowerCase();
        optionsList.forEach(option => {
            let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
            if (label.indexOf(searchTerm) != -1) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        });
    };
}

async function addOptions() {
    const names = await fetch('datasets/csv/List_of_Successful_Candidates.csv');
    const data = await names.text();
    const rows = data.split('\r\n').splice(1);
    rows.forEach(ele => {
        let r = ele.split(',');
        let iDiv = document.createElement('div');

        iDiv.setAttribute('class', 'option');
        iDiv.style.display = 'block';

        let div2 = document.createElement('input');

        div2.setAttribute('type', 'checkbox');
        div2.setAttribute('class', 'radio');
        div2.setAttribute('id', `${r[1]}`);
        div2.setAttribute('name', 'category');
        iDiv.appendChild(div2);

        let div3 = document.createElement('label');
        div3.setAttribute('for', `${r[1]}`);
        div3.innerHTML = `${r[1]}`;

        iDiv.appendChild(div3);
        document.querySelector('.options-container').appendChild(iDiv);
    })
    // console.log(rows);
    searchBar();
}

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
        showlegend: false,
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


async function barChart(Title) {
    let plotData = [];

    let data = await fetch("datasets/csv/allParties.csv")
    let dataset = await data.text();
    let rows = dataset.split("\r\n");

    for(let i = 0; i < rows.length; i++) {
        let partyname = rows[i].split(",");
        let t = await traces("datasets/d.json", partyname[1]);
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
        font:{
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


addOptions();
// pieChart("datasets/d.json", 1, "myDiv");
barChart("Constituency Results in '%'");
