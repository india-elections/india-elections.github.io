async function addData() {
    const names = await fetch('datasets/csv/wc.csv');
    const data = await names.text();
    const rows = data.split('\n').splice(1);
    console.log(rows);
    rows.forEach(ele => {
        let r = ele.split(',');
        let iDiv = document.createElement('tr');
        console.log(r);
        r.forEach(e => {
            let t1 = document.createElement('td');
            t1.innerText = e;
            iDiv.appendChild(t1);
        })
        document.querySelector('tbody').appendChild(iDiv);
    })
}

// addData();
$(document).ready(function() {
    var groupColumn = 8;
    var table = $('#myTable').DataTable({
        "columnDefs": [
            { "visible": false, "targets": groupColumn }
        ],
        "order": [[ groupColumn, 'asc' ]],
        "displayLength": 25,
        "drawCallback": function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="9" class="bg-secondary">'+group+'</td></tr>'
                    );
 
                    last = group;
                }
            } );
        }
    } );
 
    // Order by the grouping
    $('#myTable tbody').on( 'click', 'tr.group', function () {
        var currentOrder = table.order()[0];
        if ( currentOrder[0] === groupColumn && currentOrder[1] === 'asc' ) {
            table.order( [ groupColumn, 'desc' ] ).draw();
        }
        else {
            table.order( [ groupColumn, 'asc' ] ).draw();
        }
    } );
} );