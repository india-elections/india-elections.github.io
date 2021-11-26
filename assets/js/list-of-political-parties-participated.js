const parties = {
    "AITC": "1.svg",
    "BJP": "2.svg",
    "BSP": "3.png",
    "CPI": "4.png",
    "CPI(M)": "5.svg",
    "INC": "6.svg",
    "NPEP": "7.svg",
    "AIFB": "8.png",
    "RSP": "9.png",
    "AIMIM": "10.svg",
    "AJSUP": "11.svg",
    "CPI(ML)(L)": "12.svg",
    "IUML": "13.svg",
    "JD(U)": "14.png",
    "LJP": "15.png",
    "ABHM": "16.png",
    "AIMF": "17.jpg",
    "AMB": "18.svg",
    "APoI": "NA_cap_icon.svg",
    "BAHUMP": "NA_cap_icon.svg",
    "BHMP": "21.jpg",
    "BMF": "NA_cap_icon.svg",
    "BMUP": "NA_cap_icon.svg",
    "BNARP": "NA_cap_icon.svg",
    "BTP": "NA_cap_icon.svg",
    "CPIM": "26.png",
    "DSPI": "NA_cap_icon.svg",
    "GMM": "NA_cap_icon.svg",
    "HAMS": "NA_cap_icon.svg",
    "HUMP": "NA_cap_icon.svg",
    "IUC": "NA_cap_icon.svg",
    "JASP": "NA_cap_icon.svg",
    "JeSM": "NA_cap_icon.svg",
    "JSTDVPMTP": "NA_cap_icon.svg",
    "KPPU": "NA_cap_icon.svg",
    "LKSAMYP": "NA_cap_icon.svg",
    "MPOI": "NA_cap_icon.svg",
    "NDPOI": "NA_cap_icon.svg",
    "NRPI": "NA_cap_icon.svg",
    "PDS": "NA_cap_icon.svg",
    "PMPT": "NA_cap_icon.svg",
    "PRDSEP": "NA_cap_icon.svg",
    "PrPP": "NA_cap_icon.svg",
    "RPI(A)": "NA_cap_icon.svg",
    "RPPRINAT": "NA_cap_icon.svg",
    "RSPI": "NA_cap_icon.svg",
    "RSSCMJP": "NA_cap_icon.svg",
    "RTORP": "NA_cap_icon.svg",
    "RVNP": "NA_cap_icon.svg",
    "SDPI": "NA_cap_icon.svg",
    "SJSMP": "NA_cap_icon.svg",
    "SP(I)": "NA_cap_icon.svg",
    "SUCI": "NA_cap_icon.svg",
    "SWJP": "NA_cap_icon.svg",
    "UTSAP": "NA_cap_icon.svg",
    "VINPA": "NA_cap_icon.svg",
    "WBSP": "NA_cap_icon.svg",
    "WPOI": "NA_cap_icon.svg",
    "IND": "NA_cap_icon.svg",
    "NOTA": "NA_cap_icon.svg"
}


async function addData() {
    const names = await fetch('datasets/csv/allParties.csv');
    const data = await names.text();
    const rows = data.split('\n');
    // console.log(rows);
    let abb = document.querySelectorAll(".card-title");
    let type = document.querySelectorAll(".card-category");
    let images = document.querySelectorAll(".bubble-shadow-small");

    for (let i = 0; i < rows.length; i++) {
        let d = rows[i].split(',');
        // console.log(d)
        abb[i].innerText = d[1];
        type[i].innerText = d[2];
        images[i].innerHTML = `<img src="./assets/img/parties/${parties[d[1]]}" alt=""
        class="hwidget rounded bg-grey2">`
    }
}

addData();
// $(document).ready( function () {
//     $('#myTable').DataTable();
// } );