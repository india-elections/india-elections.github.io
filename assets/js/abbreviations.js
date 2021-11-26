async function addData() {
    const names = await fetch('datasets/csv/abbreviation.csv');
    const data = await names.text();
    const rows = data.split('\n').splice(1);
    // console.log(rows);
    let des = document.querySelectorAll('.card-category');
    let abb = document.querySelectorAll('.card-title');

    for(let i = 0; i < rows.length; i++) {
        let d = rows[i].split(',');
        // console.log(d);
        abb[i].innerText = d[0];
        des[i].innerText = d[1];
    }
    
}

addData();
// $(document).ready( function () {
//     $('#myTable').DataTable();
// } );