console.log(housingData[0])

var stateDropdown = d3.select("#selDataset");

var states = [];

for (let i = 0; i < housingData.length; i++) {

    if (states.includes(housingData[i].State) == false) {
        
        states.push(housingData[i].State);
    }
}

states.sort();

var zipDropdown = d3.select("#selDataset2");

var zipcodes = [];

for (let i = 0; i < housingData.length; i++) {

    if (zipcodes.includes(housingData[i]['Zip Code']) == false) {
        
        zipcodes.push(housingData[i]['Zip Code']);
    }
}

stateCompare = d3.select("#selCompare");
zipCompare = d3.select("#selCompare2");

function init() {

    states.map(state => stateDropdown.append("option").text(state).property("value", state));

    zipcodes.map(zipcode => zipDropdown.append("option").text(zipcode).property("value", zipcode));

    states.map(state => stateCompare.append("option").text(state).property("value", state));

    zipcodes.map(zipcode => zipCompare.append("option").text(zipcode).property("value", zipcode));

    let firstState = states[0];
    let secondState = states[1];

    createScatter(firstState);
    createComparescatter(secondState);
}

function createScatter(selectItem) {

    if (stateDropdown.text().includes(selectItem) == true) {

        var itemCurrent = housingData.filter(property => property.State == selectItem);
    }
    else {

        var itemCurrent = housingData.filter(property => property['Zip Code'] == selectItem);
    }

    let price  = [];
    let income = [];

    for (let i = 0; i < itemCurrent.length; i++) {

        price.push(itemCurrent[i].Price);
        income.push(itemCurrent[i]["Median Household Income"]);
    }

    let trace1 = {
        x: income,
        y: price,
        mode: 'markers',
        type: 'scatter',
        text: 'Living Space: ?',
        marker: {
            size: 7,
            color: income
        }
    };

    let layout = {
        title: {
            text: `Median Household Income vs. House Price (${selectItem})`,
            font: {
                size: 16
            }
        },
        xaxis: {
            title: {
                text: 'Income',
                font: {
                    size: 12
                }
            }
            
        },
        yaxis: {
            title: {
                text: 'Price',
                font: {
                    size: 12
                }
            }
        }
    }

    let data = [trace1];

    Plotly.newPlot('scatter', data, layout);
}

function createComparescatter(selectItem) {

    if (stateCompare.text().includes(selectItem) == true) {

        var compCurrent = housingData.filter(property => property.State == selectItem);
    }
    else {

        var compCurrent = housingData.filter(property => property['Zip Code'] == selectItem);
    }

    let priceComp  = [];
    let incomeComp = [];

    for (let i = 0; i < compCurrent.length; i++) {

        priceComp.push(compCurrent[i].Price);
        incomeComp.push(compCurrent[i]["Median Household Income"]);
    }

    let trace2 = {
        x: incomeComp,
        y: priceComp,
        mode: 'markers',
        type: 'scatter',
        text: 'Living Space: ?',
        marker: {
            size: 7,
            color: incomeComp
        }
    };

    let layout2 = {
        title: {
            text: `Median Household Income vs. House Price (${selectItem})`,
            font: {
                size: 16
            }
        },
        xaxis: {
            title: {
                text: 'Income',
                font: {
                    size: 12
                }
            }
            
        },
        yaxis: {
            title: {
                text: 'Price',
                font: {
                    size: 12
                }
            }
        }
    }

    let data2 = [trace2];

    Plotly.newPlot('scatter2', data2, layout2);
}

function adjustZips(dropdown, state) {

    if (dropdown.text().includes(state) == true) {

        if (dropdown == stateDropdown) {

            zipDropdown.selectAll("option").remove();
            var setZips = zipDropdown;
        }
        else {

            zipCompare.selectAll("option").remove();
            var setZips = zipCompare;
        }

        let zipcodes = housingData.filter(property => property.State == state);

        stateZipcodes = [];

        for (let i = 0; i < zipcodes.length; i++) {

            let currentZip = zipcodes[i]['Zip Code'];
            
            if (stateZipcodes.includes(currentZip) == false) {

                stateZipcodes.push(currentZip);

                setZips.append("option").text(currentZip).property("value", currentZip);

            }
        }
    }
}

function optionChanged(item) {

    console.log("Showing results for", item);

    createScatter(item);

    adjustZips(stateDropdown, item);

    /* if (stateDropdown.text().includes(item) == true) {

        zipDropdown.selectAll("option").remove();

        let zipcodes = housingData.filter(property => property.State == item);

        stateZipcodes = [];

        for (let i = 0; i < zipcodes.length; i++) {

            let currentZip = zipcodes[i]['Zip Code'];
            
            if (stateZipcodes.includes(currentZip) == false) {

                stateZipcodes.push(currentZip);

                zipDropdown.append("option").text(currentZip).property("value", currentZip);

            }
        }
    } */
}

function optionChanged2(item) {

    console.log("Showing comparison results for", item);

    createComparescatter(item);

    adjustZips(stateCompare, item);
}

init();