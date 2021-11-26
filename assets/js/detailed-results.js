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
            pieChart("datasets/d.json", o.querySelector("label").innerHTML, "myDiv");
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
    const rows = data.split('\n').splice(1);
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


async function pieChart(url, ac_n, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.json();
    const dataset = data.filter(el => el["AC NAME"] === ac_n);
    // console.log(ac_n)


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.text = [];
    newObj.marker = { colors: [] }
    newObj.hole = 0.4;
    let count = 0;
    newObj.type = "pie";
    newObj.textinfo = 'percent'

    dataset.forEach(element => {
        if (element["PARTY"] === "AITC" || element["PARTY"] === "BJP" || element["PARTY"] === "NOTA" || element["PARTY"] === "RSSCMJP" || element["PARTY"] === "IND") {
            newObj.values.push(element.TOTAL);
            newObj.labels.push(`${element["CANDIDATE NAME"]}`);
            newObj.marker.colors.push(colours[element.PARTY]);
            newObj.text.push(`Sex: ${element.SEX}<br>Age: ${element.AGE}<br>Party: ${element.PARTY}<br>General: ${element.GENERAL}<br>Postal: ${element.POSTAL}`);
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
            y: -0.5
        },
        font: {
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
        },
        height: 500,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };
    const config = {
        responsive: true,
        displayModeBar: false
    };


    Plotly.newPlot(id, plotData, layout, config);
}


searchBar();
pieChart("datasets/d.json", "Mekliganj", "myDiv");