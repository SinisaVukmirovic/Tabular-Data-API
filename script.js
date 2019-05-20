// calling the function at the very start to have the data chart displayed properly
chartIt();

async function chartIt() {

    const data = await getData();

    const ctx = document.getElementById('chart').getContext('2d');
    
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [
                {
                    label: 'Global Average Temperature in ℃ since 1880 until 2018',
                    data: data.ys,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.4)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value) {
                            return `${value} ℃`;
                        }
                    }
                }]
            }
        }
    });
}



async function getData() {
    
    const xs = [];
    const ys = [];

    const response = await fetch('ZonAnn.Ts.csv');
    const data = await response.text();

    // first splitting the string data on new row 
    //  and removing the first row with names and not data, using slice
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xs.push(year);
        const temp = columns[1];
        ys.push(parseFloat(temp) + 14);
        console.log(year, temp);
    });
    return { xs, ys }; 
}