// from data.js
var tableData = data;

//console.log(tableData);

var city = document.getElementById("city");
var state = document.getElementById("state");
var shape = document.getElementById("shape");
var country = document.getElementById("country");
var optSelect = [country,city,state,shape];
console.log(optSelect);

//adds the list of countries to the select option
function countryLoad(){
var countryList = [];
var countryData = tableData.map(countryListFn => countryListFn.country);

countryData.forEach((countryName) => {
    if (!(countryList.includes(countryName))){     
        countryList.push(countryName);
        var opt = document.createElement("option");
        opt.value = countryName;
        opt.text = countryName.toUpperCase();
        country.appendChild(opt);
    }
});
}

function shapeLoad(){
var stateList = [];
var stateData = tableData.map(stateListFn => stateListFn.state);

stateData.forEach((stateName) => {
    if (!(stateList.includes(stateName))){     
        stateList.push(stateName);
        var opt = document.createElement("option");
        opt.value = stateName;
        opt.text = stateName.toUpperCase();
        state.appendChild(opt);
    }
});
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

  
 function myChange(element){
    var sampleList = [];
    var optionChoosen = element.name;
    console.log(`You chose: ${element.value}`);
    
    switch (optionChoosen){
        case country:
            
            optSelect.forEach(function (item){
                var option = item.name;
                //var optCheck = item.value;
                console.log(optionChoosen);
                removeAll(item);
                console.log(`Removed ${item}`);
                
                                
                var opt = document.createElement("option");
                opt.value = "all";
                opt.text = "All";
                item.appendChild(opt);
                var ss = tableData.map(function (ListFn) {
                
                    if(ListFn[optionChoosen] == element.value){
                        var state = ListFn[option];
                        console.log(option);
                        if (!(sampleList.includes(state))){
                            console.log("Inside state list");
                            sampleList.push(state);
                            var opt = document.createElement("option");
                            opt.value = state;
                            opt.text = state.toUpperCase();
                            item.appendChild(opt);
                        }
                                    
                    }
                })
                if (optionChoosen === item){
                    countryLoad();
                }
                
            });
            break;
        case state:
            break;
        case city:
            break;
        case shape:
            break;
    }    
      
}
      
     

function isEmpty(s){
    return !s.length;    
}

function isBlank(s){
    return isEmpty(s.trim());    
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
countryLoad();
stateLoad();
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