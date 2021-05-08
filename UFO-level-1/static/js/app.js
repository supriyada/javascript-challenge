// from data.js
var tableData = data;

//console.log(tableData);

var ufoTableBody = d3.select("tbody");

//appends a table to the web page and then adds new rows of data for each UFO sighting
tableData.forEach( (ufoReport) =>{
    var ufoRow = ufoTableBody.append("tr");

    Object.entries(ufoReport).forEach(([key,value]) => {
        //console.log(key,value);
        var ufoCell = ufoRow.append("td");
        ufoCell.text(value);
    });
});

//search through the `date/time` column to find rows that match user input
var ufoButton = d3.select("#filter-btn");
var ufoForm = d3.select("#form");

ufoButton.on("click", runEnter);
ufoForm.on("submit", runEnter);

function runEnter(){
    d3.event.preventDefault();

    var inputElement = d3.select("#datetime");

    var filterDate = inputElement.property("value");
  
    var filteredTable = tableData.filter(ufoSightings => ufoSightings.datetime === filterDate);

    //Alerts if no records are found for the criteria
    if (filteredTable.length == 0){
        ufoTableBody.html("");
        
        window.alert("No matches found for the filter criteria. Please try some other combination!")
    }
    else{
        //Clear the previous table
        ufoTableBody.html("");
        //Load the filtered data into table
        filteredTable.forEach( (ufoReport) =>{
            var ufoRow = ufoTableBody.append("tr");
        
            Object.entries(ufoReport).forEach(([key,value]) => {
                var ufoCell = ufoRow.append("td");
                ufoCell.text(value);
            });
        });
    }
}