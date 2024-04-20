// Create constant variable for API url for data access
const url = "/api/v1.0/housingjson";

// Create empty array to push API data to
var globalData = [];

// Initialization function to start the dashboard
function init(data) {

    // Push API data to a global scoped array for easy access
    globalData.push(data);

    var housingData = globalData[0];

    // Use d3 to connect to the states dropdown and create an array of all states in the database
    var stateDropdown = d3.select("#selDataset");

    var states = [];

    for (let i = 0; i < housingData.length; i++) {

        if (states.includes(housingData[i].State) == false) {
            
            states.push(housingData[i].State);
        }
    }

    states.sort();
    states.unshift("Select state...");

    // Use d3 to connect to the cities dropdown and create an array of all cities in the database
    var cityDropdown = d3.select("#selCity");

    var cities = [];

    for (let i = 0; i < housingData.length; i++) {

        if (cities.includes(housingData[i].City) == false) {
            
            cities.push(housingData[i].City);
        }
    }

    cities.sort();
    cities.unshift("Select city...");

    // Use d3 to connect to the zip codes dropdown and create an array of all zip codes in the database
    var zipDropdown = d3.select("#selDataset2");

    var zipcodes = ["Select zip code..."];

    for (let i = 0; i < housingData.length; i++) {

        if (zipcodes.includes(housingData[i]['Zip Code']) == false) {
            
            zipcodes.push(housingData[i]['Zip Code']);
        }
    }

    // Use d3 to connect to the comparison dropdowns for state, city, and zip code
    var stateCompare = d3.select("#selCompare");
    var cityCompare = d3.select("#selCity2");
    var zipCompare = d3.select("#selCompare2");

    // Push the states, cities, and zipcodes arrays to each dropdown as select options
    states.map(state => stateDropdown.append("option").text(state).property("value", state));

    cities.map(city => cityDropdown.append("option").text(city).property("value", city));

    zipcodes.map(zipcode => zipDropdown.append("option").text(zipcode).property("value", zipcode));

    states.map(state => stateCompare.append("option").text(state).property("value", state));

    cities.map(city => cityCompare.append("option").text(city).property("value", city));

    zipcodes.map(zipcode => zipCompare.append("option").text(zipcode).property("value", zipcode));

    let firstState = states[1];
    let secondState = states[2];

    // Call functions to create visualizations on initialization
    createScatter(firstState, secondState);
    populateTable(firstState, secondState);
};

// Create function to calculate mean
function mean(array) {

    return array.reduce((a, b) => a + b) / array.length;
}

// Create function to calculate standard deviation
function getStandardDeviation (array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

// Create function to create all chart visualizations given a parameter for each location to be compared
function createScatter(selectItem, compareItem) {

    // Call set location to 
    let itemCurrent = [setLocation(selectItem), setLocation(compareItem)];

    let estimate = [];
    let estimate2 = [];

    // Iterate through the primary option and the comparing option
    for (let i = 0; i < itemCurrent.length; i++) {

        // Initialize arrays
        let price  = [];
        let income = [];
        let space = [];



        let zips3 = [];
        let zips6 = [];
        let zips1 = [];

        let monthThree = [];
        let monthSix = [];
        let year = [];

        // Iterate through the associated location data and create arrays of each variable for plotting
        for (let j = 0; j < itemCurrent[i].length; j++) {

            let current = itemCurrent[i][j];

            price.push(current.Price);
            income.push(current["Median Household Income"]);
            space.push(current["Living Space"]);

            if (monthThree.includes(current['3Month']) == false && zips3.includes(current['Zip Code']) == false) {

                monthThree.push(current['3Month']);
                zips3.push(current['Zip Code']);
            }
            if (monthSix.includes(current['6Month']) == false && zips6.includes(current['Zip Code']) == false) {

                monthSix.push(current['6Month']);
                zips6.push(current['Zip Code']);
            }
            if (year.includes(current['1Year']) == false && zips1.includes(current['Zip Code']) == false) {

                year.push(current['1Year']);
                zips1.push(current['Zip Code']);
            }
        }
        
        // Push and plot data based on if data is associated with the primary or comparing location
        if (i == 0) {

            estimate.push(mean(monthThree));
            estimate.push(mean(monthSix));
            estimate.push(mean(year));

            var graphTitle = selectItem;
            var histID = 'histogram';
            var scatID = 'scatter';
        }
        else {
            
            estimate2.push(mean(monthThree));
            estimate2.push(mean(monthSix));
            estimate2.push(mean(year));

            var graphTitle = compareItem;
            var histID = 'histogram2';
            var scatID = 'scatter2';
        }

        // Establish trace for price histogram
        let trace1 = {
            x: price,
            name: 'Price',
            type: 'histogram',
            autobinx: false,
            histnorm: 'percent',
            opacity: 0.75,
            xbins: {
                end: mean(price) + getStandardDeviation(price) * 2,
                size: 50000,
                start: 0
            },
            marker: {color: 'red'}
        };

        // Establish trace for income histogram
        let trace2 = {
            x: income,
            name: 'Income',
            type: 'histogram',
            autobinx: false,
            histnorm: 'percent',
            opacity: 0.75,
            xbins: {
                end: Math.max(...income),
                size: 20000,
                start: 0
            },
            marker: {color: 'green'}
        };

        // Establish histogram layout
        let layoutHist = {
            barmode: 'overlay',
            title: {
                text: `(${graphTitle})`,
                font: {
                    size: 16
                }
            },
            xaxis: {
                title: {
                    text: 'USD ($)',
                    font: {
                        size: 12
                    }
                }
                
            },
            yaxis: {
                title: {
                    text: 'Percent',
                    font: {
                        size: 12
                    }
                }
            }
        };

        // Establish trace for scatterplot
        let trace3 = {
            x: space,
            y: price,
            mode: 'markers',
            type: 'scatter',
            marker: {
                size: 7,
                color: space,
                colorscale: 'Jet'
            }
        };

        let layout = {
            title: {
                text: `(${graphTitle})`,
                font: {
                    size: 16
                }
            },
            xaxis: {
                title: {
                    text: 'Living Space (sqft)',
                    font: {
                        size: 12
                    }
                }
                
            },
            yaxis: {
                title: {
                    text: 'Price ($)',
                    font: {
                        size: 12
                    }
                }
            }
        }

        // Create charts for each location using plotly
        var dataHist = [trace1, trace2];

        Plotly.newPlot(histID, dataHist, layoutHist);

        var data = [trace3];

        Plotly.newPlot(scatID, data, layout);
    }

    // Establish traces for estimations line graph
    let trace4 = {
        type: 'scatter',
        x: [90, 180, 365],
        y: estimate,
        mode: 'lines+markers',
        name: selectItem,
        line: {
            color: 'red',
            width: 3
        }
    }

    let trace5 = {
        type: 'scatter',
        x: [90, 180, 365],
        y: estimate2,
        mode: 'lines+markers',
        name: compareItem,
        line: {
            color: 'blue',
            width: 3
        }
    }

    // Establish layout for estimations line graph
    let linelayout = {
        title: {
            text: `Base Date of Estimation: ${globalData[0][0].BaseDate}`,
            font: {
                size: 16
            }
        },
        xaxis: {
            title: {
                text: "Time from Base Date",
                font: {
                    size: 12
                }
            },
            showticklabels: true,
            showline: true,
            nticks: 3,
            tickvals: [90, 180, 270, 365],
            ticktext: ['3 Months', '6 Months', '9 Months', '12 Months'],
            autorange: false,
            range: [80, 375]

        },
        yaxis: {
            title: {
                text: "Percent Change",
                font: {
                    size: 12
                }
            }
        }
        
    }

    // Plot estimations line graph using plotly
    let dataLine = [trace4, trace5];

    Plotly.newPlot('line', dataLine, linelayout);
}

// Create function to identify if the dropdown option is a state, city, or zipcode and if it is 
// our comparison or primary location and filter data accordingly
function setLocation(location) {

    let housingData = globalData[0];

    var stateDropdown = d3.select("#selDataset");
    var cityDropdown = d3.select("#selCity");
    var zipDropdown = d3.select("#selDataset2");

    var stateCompare = d3.select("#selCompare");
    var cityCompare = d3.select("#selCity2");
    var zipCompare = d3.select("#selCompare2");

    if (stateDropdown.text().includes(location) == true) {

        var itemCurrent = housingData.filter(property => property.State == location);
    }
    else if (cityDropdown.text().includes(location) == true || cityCompare.text().includes(location) == true) {

        var itemCurrent = housingData.filter(property => property.City == location);
    }
    else {

        var itemCurrent = housingData.filter(property => property['Zip Code'] == location);
    }

    return itemCurrent;

}

// Create function to populate the html table with averages based on selected locations
function populateTable(selectItem, compareItem) {

    d3.select("#loc1").text(selectItem);
    d3.select("#loc2").text(compareItem);

    let itemCurrent = [setLocation(selectItem), setLocation(compareItem)];

    // Iterate through each selected location, primary and comparison
    for (let i = 0; i < itemCurrent.length; i++) {

        // Initialize arrays
        let price  = [];
        var income = [];
        let space = [];
        let bed = [];
        let bath = [];
        let pop = [];
        let zips = [];
        let popzips = [];

        // Iterate through each dataset variable and push data to the empty arrays
        for (let j = 0; j < itemCurrent[i].length; j++) {

            let current = itemCurrent[i][j];

            price.push(current.Price);
            space.push(current["Living Space"]);
            bed.push(current.Beds);
            bath.push(current.Baths);

            if (income.includes(current["Median Household Income"]) == false && zips.includes(current['Zip Code']) == false) {

                income.push(current["Median Household Income"]);
                zips.push(current['Zip Code']);
            }
            if (pop.includes(current['Zip Code Density']) == false && popzips.includes(current['Zip Code']) == false) {

                pop.push(current['Zip Code Density']);
                popzips.push(current['Zip Code']);

            }
        }

        // Use d3 to push averages for selected data to the appropriate cells in the table
        d3.select(`#price${i}`).text(`$${Math.round(mean(price))}`);

        d3.select(`#income${i}`).text(`$${Math.round(mean(income))}`);

        d3.select(`#space${i}`).text(`${Math.round(mean(space))} sq ft`);

        d3.select(`#rooms${i}`).text(`${Math.round(mean(bed))}/${Math.round(mean(bath))}`);

        d3.select(`#pop${i}`).text(`${Math.round(mean(pop))} per sq mile`);
    }
}

// Create function to adjust dropdowns to filter options scoped by selected state or city
function adjustZips(dropdown, citystate) {

    // Create variables to connect to html dropdowns
    var stateDropdown = d3.select("#selDataset");
    var cityDropdown = d3.select("#selCity");
    var zipDropdown = d3.select("#selDataset2");
    var stateCompare = d3.select("#selCompare");
    var cityCompare = d3.select("#selCity2");
    var zipCompare = d3.select("#selCompare2");

    let housingData = globalData[0];

    // Create variable to identify whether dropdown is a state, city, or zipcode 
    var dropdown = dropdown.property('id');

    // Create conditional to filter data based on selected dropdown
    if (dropdown == stateDropdown.property('id')) {

        cityDropdown.selectAll("option").remove();
        var setCities = cityDropdown;

        zipDropdown.selectAll("option").remove();
        var setZips = zipDropdown;
        var zipcodes = housingData.filter(property => property.State == citystate);
    }
    else if (dropdown == stateCompare.property('id')) {

        cityCompare.selectAll("option").remove();
        var setCities = cityCompare;

        zipCompare.selectAll("option").remove();
        var setZips = zipCompare;
        var zipcodes = housingData.filter(property => property.State == citystate);
    }
    else if (dropdown == cityDropdown.property('id')) {

        zipDropdown.selectAll("option").remove();
        var setZips = zipDropdown;
        var zipcodes = housingData.filter(property => property.City == citystate);
    }
    else {

        zipCompare.selectAll("option").remove();
        var setZips = zipCompare;
        var zipcodes = housingData.filter(property => property.City == citystate);
    }

    // Conditional to run if a state dropdown is selected to filter cities
    if (setCities) {

        let cities = housingData.filter(property => property.State == citystate);

        let stateCities = [];

        // Iterate through all cities and determine if city is present in selected state and udpate dropdown options
        for (let i = 0; i < cities.length; i++) {

            let currentCity = cities[i].City;
            
            if (stateCities.includes(currentCity) == false) {

                stateCities.push(currentCity);

                setCities.append("option").text(currentCity).property("value", currentCity);

            }
        }
    }

    // Iterate through all zip codes and determine if zip code is present in selected state/city and udpate dropdown options
    let stateZipcodes = [];

    for (let i = 0; i < zipcodes.length; i++) {

        let currentZip = zipcodes[i]['Zip Code'];
        
        if (stateZipcodes.includes(currentZip) == false) {

            stateZipcodes.push(currentZip);

            setZips.append("option").text(currentZip).property("value", currentZip);

        }
    }
}

// Create function to run and call visualization creation and update dropdowns when 
// a new dropdown item is selected
function optionChanged(item) {

    console.log("Showing results for", item);

    var holder = d3.select("#loc2").text();

    console.log("Comparison is", holder);

    createScatter(item, holder);
    populateTable(item, holder);

    let housingData = globalData[0];

    var states = [];

    for (let i = 0; i < housingData.length; i++) {

        if (states.includes(housingData[i].State) == false) {
            
            states.push(housingData[i].State);
        }
    }

    var cities = [];

    for (let i = 0; i < housingData.length; i++) {

        if (cities.includes(housingData[i].City) == false) {
            
            cities.push(housingData[i].City);
        }
    }

    var stateDropdown = d3.select("#selDataset");
    var cityDropdown = d3.select("#selCity");

    if (states.includes(item) == true) {

        adjustZips(stateDropdown, item);
    }
    else if (cities.includes(item) == true) {

        adjustZips(cityDropdown, item);
    }
}

// Create function to run and call visualization creation and update dropdowns when 
// a new dropdown comparison item is selected
function optionChanged2(item) {

    console.log("Showing comparison results for", item);

    var holder = d3.select("#loc1").text();

    console.log("Original is", holder);

    createScatter(holder, item);
    populateTable(holder, item);

    let housingData = globalData[0];

    var states = [];

    for (let i = 0; i < housingData.length; i++) {

        if (states.includes(housingData[i].State) == false) {
            
            states.push(housingData[i].State);
        }
    }

    var cities = [];

    for (let i = 0; i < housingData.length; i++) {

        if (cities.includes(housingData[i].City) == false) {
            
            cities.push(housingData[i].City);
        }
    }

    var stateCompare = d3.select("#selCompare");
    var cityCompare = d3.select("#selCity2");

    if (states.includes(item) == true) {

        adjustZips(stateCompare, item);
    }
    else if (cities.includes(item) == true) {

        adjustZips(cityCompare, item);
    }
}

// Connect to the API using d3 and call the init function
d3.json(url).then(data => init(data));
