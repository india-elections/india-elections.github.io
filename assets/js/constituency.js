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
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            Chart("datasets/csv/constituency.csv", o.querySelector("label").innerHTML);
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

        div2.setAttribute('type', 'radio');
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
    console.log(rows);
    searchBar();
}

// addOptions();

const colours = { BJP: "rgb(255, 165, 0)", AITC: "rgb(0,255,0)", NOTA: "rgb(255,0,0)", IND: "rgb(0,0,255)", RSSCMJP: "rgb(0,255,255)" }
const sex = ["male", "female", "third gender", "total"]

async function bc1(row, f, t, title, id) {
    let plotData = [];


    console.log(row);


    for (let i = f; i <= t; i++) {
        const newObj = {};

        newObj.x = [];
        newObj.y = [];
        newObj.type = "bar";
        let data = row[i].split(',');
        newObj.name = data[0];
        for (let j = 1; j < data.length; j++) {
            if (data[j] > 0) {
                newObj.y.push(data[j]);
                newObj.x.push(sex[j - 1])
            }
        }
        plotData.push(newObj);
    }



    const layout = {
        title: title,
        showlegend: true,
        hovermode: 'closest',
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


async function bc2(row, f, t, title, id) {
    let plotData = [];


    console.log(row);

    const newObj = {};

    newObj.x = [];
    newObj.y = [];
    newObj.type = "bar";


    for (let i = f; i <= t; i++) {
        let data = row[i].split(',');
        if (data[1] > 0) {
            newObj.x.push(data[0])
            newObj.y.push(data[1])
        }
    }

    plotData.push(newObj);



    const layout = {
        title: title,
        showlegend: false,
        hovermode: 'closest',
        automargin: true,
        legend: {
            "orientation": "h",
            automargin: true,
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


async function Chart(url, ac_n) {
    const response = await fetch(url);
    let data = await response.text();
    let dataset = data.split('\r\n<br>');
    // console.log(data)
    // console.log(dataset)

    let row;

    for (let i = 0; i < dataset.length; i++) {
        let t = dataset[i].split('\r\n');
        if (t[0].split('-')[2] === ac_n) {
            row = t;
            break;
        }
    }
    // console.log(row)
    bc1(row, 4, 8, 'Candidate', 'con1');
    bc1(row, 10, 13, 'Electors', 'con2');
    bc1(row, 15, 15, 'Voters', 'con3');
    bc2(row, 22, 31, 'Votes', 'con4');
}


searchBar();
Chart("datasets/csv/constituency.csv", "Mekliganj");