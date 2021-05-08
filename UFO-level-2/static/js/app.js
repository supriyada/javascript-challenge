// from data.js
var tableData = data;

//console.log(tableData);
//Populate the drop down menu with unique list of countries in the dataset
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


var stateList = [];
var stateSelect = document.getElementById("state");
var cityList = [];
var citySelect = document.getElementById("city");
var shapeList = [];
var shapeSelect = document.getElementById("shape");

//generates list of states based on country selected
function myState(){
    var countrySel = countrySelect.value;
    
    removeAll(stateSelect);
    stateList = [];
    var opt = document.createElement("option");
    opt.value = "selection";
    opt.text = "<--Select-->";
    stateSelect.appendChild(opt);
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
function myCity(){
    var stateSel = d3.select("#state").node().value;
    
    removeAll(citySelect);
    var opt = document.createElement("option");
    opt.value = "selection";
    opt.text = "<--Select-->";
    citySelect.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "all";
    opt.text = "All";
    citySelect.appendChild(opt);

    if(stateSel === 'all'){
           
        removeAll(shapeSelect);
        
        list1 = [];
        list2 = [];
        var stateData = tableData.filter(cityFn => cityFn.country == countrySelect.value);
        stateData.map(function(stateFn){
            var city = stateFn.city;
            var shape = stateFn.shape;
            
            if (!(list1.includes(city))){
                
                list1.push(city);
                var opt = document.createElement("option");
                opt.value = city;
                opt.text = toTitleCase(city);
                citySelect.appendChild(opt);
            }
            if (!(list2.includes(shape))){
                list2.push(shape);
                var opt = document.createElement("option");
                opt.value = shape;
                opt.text = toTitleCase(shape);
                shapeSelect.appendChild(opt);
            }
        })
    }
    else{
    

    cityList = [];
    
    
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
    })}
}

//generate the shape of UFO's spotted
function myShape(){
    removeAll(shapeSelect);
    var opt = document.createElement("option");
    opt.value = "selection";
    opt.text = "<--Select-->";
    shapeSelect.appendChild(opt);
    var opt = document.createElement("option");
    opt.value = "all";
    opt.text = "All";
    shapeSelect.appendChild(opt);

    var citySel  = d3.select("#city").node().value;
    
    if (citySel == "all" && stateSelect.value == "all"){
        var slist = [];
        var sData = tableData.filter(cityFn => cityFn.country == countrySelect.value);
        var shapeData = sData.map(sListFn => sListFn.shape);

        shapeData.forEach((shapeName) => {
        if (!(slist.includes(shapeName))){     
            slist.push(shapeName);
            var opt = document.createElement("option");
            opt.value = shapeName;
            opt.text = toTitleCase(shapeName);
            shapeSelect.appendChild(opt);
        }
    });
    }
    else if(citySel === 'all'){
        
        list2 = [];
        var cityData = tableData.filter(shapeFn => shapeFn.state == stateSelect.value);
        cityData.map(function(stateFn){
            var shape = stateFn.shape;
            
            if (!(list2.includes(shape))){
        
                list2.push(shape);
                var opt = document.createElement("option");
                opt.value = shape;
                opt.text = toTitleCase(shape);
                shapeSelect.appendChild(opt);
            }
        })
    }
    
    else{ 
    shapeList = [];
       
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
    })}
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

//To check if the option to filter is provided or not
function isEmpty(s){
    return !s.length;    
}

function isBlank(s){
    return isEmpty(s.trim());    
}

//***************************
//appends a table to the web page and then adds new rows of data for each UFO sighting on Page load
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

//search through the table to find rows that match user input
var ufoButton = d3.select("#filter-btn");
var ufoForm = d3.select("#form");

ufoButton.on("click", runEnter);
ufoForm.on("submit", runEnter);

function runEnter(){
    d3.event.preventDefault();

    //Retrieve all the chosen values to filter
    var inputElement = d3.select("#datetime");
    var filterDate = inputElement.property("value");

    var country = d3.select("#country").node().value;
    var state = d3.select("#state").node().value;
    var city = d3.select("#city").node().value;
    var shape = d3.select('#shape').node().value;
    
    //Several conditions to filter the table data based on the user input
    if (!(isBlank(country))){
        var countryTable = tableData.filter(ufoSightings => (ufoSightings.country === country));
        
    }
    else{
        var filteredTable = tableData;
    }

    if (!(isBlank(state)) && (state != "all")){
        var stateTable = countryTable.filter(ufoSightings => (ufoSightings.state === state));
    }
    else if (!(isBlank(state)) && (state === "all")){
        var stateTable = countryTable;
    }
    else{
        var filteredTable = countryTable;
    }

    if (!(isBlank(city)) && (city != "all")){
        var cityTable = stateTable.filter(ufoSightings => (ufoSightings.city === city));
    }
    else if (!(isBlank(city)) && (city === "all")){
        shlist = [];
        removeAll(shapeSelect);
        var opt = document.createElement("option");
        opt.value = "all";
        opt.text = "All";
        shapeSelect.appendChild(opt);
        stateTable.map(function (shapeListFn) {
            if (shapeListFn.state == state){
                var shape = shapeListFn.shape;
                if (!(shlist.includes(shape))){

                    shlist.push(shape);
                    var opt = document.createElement("option");
                    opt.value = shape;
                    opt.text = toTitleCase(shape);
                    shapeSelect.appendChild(opt);
                }
            }
        })
        var cityTable = stateTable;
    }
    else{
        var filteredTable = stateTable;
        
    }
    if (!(isBlank(shape)) && (shape != "all")){
        var shapeTable = cityTable.filter(ufoSightings => (ufoSightings.shape === shape));
        
    }
    else if (!(isBlank(shape)) && (shape === "all")){
        var shapeTable = cityTable;    
    }
    else{
        var filteredTable = cityTable;
    }
    if (!(isBlank(filterDate))){
        var dateTable = shapeTable.filter(ufoSightings => (ufoSightings.datetime === filterDate));
    }
    else{
        var filteredTable = shapeTable;
    }
    

    if (dateTable != null){
        var filteredTable = dateTable;
    }

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