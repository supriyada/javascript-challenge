// from data.js
var tableData = data;

//console.log(tableData);
var countryList = [];
var countryData = tableData.map(countryListFn => countryListFn.country);

var countrySelect = document.getElementById("country");
countryData.forEach((countryName) => {
    if (!(countryList.includes(countryName))){     
        countryList.push(countryName);
        var opt = document.createElement("option");
        opt.value = countryName;
        opt.text = countryName.toUpperCase();
        countrySelect.appendChild(opt);
    }
});

//generates list of states based on country selected
var stateList = [];
var stateSelect = document.getElementById("state");
function myState(){
    var countrySel = countrySelect.value;

    removeAll(stateSelect);

    stateList = [];
    var opt = document.createElement("option");
    opt.value = "all";
    opt.text = "All";
    stateSelect.appendChild(opt);

    var ss = tableData.map(function (stateListFn) {
        if (stateListFn.country == countrySel){
            var state = stateListFn.state;
            if (!(stateList.includes(state))){
        
                stateList.push(state);
                var opt = document.createElement("option");
                opt.value = state;
                opt.text = state.toUpperCase();
                stateSelect.appendChild(opt);
            }
        }
    })
}

//generates the list of cities based on state selected
var cityList = [];
var citySelect = document.getElementById("city");
function myCity(){
    var stateSel = stateSelect.value;

    removeAll(citySelect);

    cityList = [];
    var opt = document.createElement("option");
    opt.value = "all";
    opt.text = "All";
    citySelect.appendChild(opt);
    
    var cs = tableData.map(function (cityListFn) {
        if (cityListFn.state == stateSel ){
            var city = cityListFn.city;
            if (!(cityList.includes(city))){
        
                cityList.push(city);
                var opt = document.createElement("option");
                opt.value = city;
                opt.text = toTitleCase(city);
                citySelect.appendChild(opt);
            }
        }
    })
}

//generate the shape of UFO's spotted
var shapeList = [];
var shapeSelect = document.getElementById("shape");
function myShape(){
    
    var citySel = citySelect.value;

    removeAll(shapeSelect);

    shapeList = [];
    var opt = document.createElement("option");
    opt.value = "all";
    opt.text = "All";
    shapeSelect.appendChild(opt);
    
    var shapeS = tableData.map(function (shapeListFn) {
        if (shapeListFn.city == citySel){
            var shape = shapeListFn.shape;
            if (!(shapeList.includes(shape))){
        
                shapeList.push(shape);
                var opt = document.createElement("option");
                opt.value = shape;
                opt.text = toTitleCase(shape);
                shapeSelect.appendChild(opt);
            }
        }
    })
}

// To empty the select option
function removeAll(selectBox,selList) {
    while (selectBox.options.length > 0) {
        selectBox.remove(0);
    }
}

//To convert to titlecase
function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
}

//***************************
//appends a table to the web page and then adds new rows of data for each UFO sighting
var ufoTableBody = d3.select("tbody");
function tableLoad(){
tableData.forEach( (ufoReport) =>{
    var ufoRow = ufoTableBody.append("tr");
    
    Object.entries(ufoReport).forEach(([key,value]) => {
        
        var ufoCell = ufoRow.append("td");
        ufoCell.text(value);
    });
});
}
tableLoad();
//countryLoad();
//stateLoad();
//search through the `date/time` column to find rows that match user input
var ufoButton = d3.select("#filter-btn");
var ufoForm = d3.select("#form");

ufoButton.on("click", runEnter);
ufoForm.on("submit", runEnter);

function runEnter(){
    d3.event.preventDefault();

    var inputElement = d3.select("#datetime");

    var filterDate = inputElement.property("value");

    console.log(`Country:${countrySelect.value}`);
    console.log(`State:${stateSelect.value}`);
    console.log(`City:${citySelect.value}`);
    console.log(`Shape:${shapeSelect.value}`);
    console.log(`Date:${filterDate}`);

    var country = countrySelect.value;
    var state = stateSelect.value;
    var city = citySelect.value;
    var shape = shapeSelect.value;
    
    if (!(isBlank(country))){
        if((!(isBlank(state))) && (state != "all")){
            if((!(isBlank(city))) && (city != "all")){
                if((!(isBlank(shape))) && (shape != "all")){
                    if(!(isBlank(filterDate))){
                        var filteredTable = tableData.filter(ufoSightings => 
                            ((ufoSightings.datetime === filterDate) && (ufoSightings.country === country)
                            && (ufoSightings.state === state) && (ufoSightings.city === city)
                            && (ufoSightings.shape === shape)));
                    }
                    else{
                        var filteredTable = tableData.filter(ufoSightings => 
                            ((ufoSightings.country === country)
                            && (ufoSightings.state === state) && (ufoSightings.city === city)
                            && (ufoSightings.shape === shape)));
                    }
                 
                }
                else if((!(isBlank(city))) && (city === "all")){
                    var filteredTable = tableData.filter(ufoSightings => ((ufoSightings.country === country)) 
                    && (ufoSightings.state === state) && (ufoSightings.city === city));
                    
                }
                else{
                    var filteredTable = tableData.filter(ufoSightings => ((ufoSightings.country === country))
                    && (ufoSightings.state === state) && (ufoSightings.city === city));
                }          
            }
            else if((!(isBlank(city))) && (city === "all")){
                var filteredTable = tableData.filter(ufoSightings => ((ufoSightings.country === country)) 
                && (ufoSightings.state === state));
            }
            else{
                var filteredTable = tableData.filter(ufoSightings => ((ufoSightings.country === country))
                && (ufoSightings.state === state));
            }
        
        }
        else if((!(isBlank(state))) && (state === "all")){
            var filteredTable = tableData.filter(ufoSightings => ((ufoSightings.country === country)));
        }
        else{
            var filteredTable = tableData.filter(ufoSightings => ((ufoSightings.country === country)));
        }
    }
    else{
        tableLoad();
    }

    if (filteredTable == null){
        console.log("No records found");
    }
    else{
    //console.log(filteredTable);
        ufoTableBody.html("");

        filteredTable.forEach( (ufoReport) =>{
            var ufoRow = ufoTableBody.append("tr");
        
            Object.entries(ufoReport).forEach(([key,value]) => {
                //console.log(key,value);
                var ufoCell = ufoRow.append("td");
                ufoCell.text(value);
            });
        });
    }
}