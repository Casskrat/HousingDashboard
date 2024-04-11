console.log(housingData[0])
//CODE BLOCK 1//
var stateDropdown = d3.select("#selDataset");

var states = [];

for (let i = 0; i < housingData.length; i++) {

    if (states.includes(housingData[i].State) == false) {
        
        states.push(housingData[i].State);
    }
}

states.sort();
// CODE BLOCK 1 END //

// CODE BLOCK 2 //
var zipDropdown = d3.select("#selDataset2");

var zipcodes = [];

for (let i = 0; i < housingData.length; i++) {

    if (zipcodes.includes(housingData[i]['Zip Code']) == false) {
        
        zipcodes.push(housingData[i]['Zip Code']);
    }
}
// CODE BLOCK 2 END //
function init() {

    // Code Block 1//

    states.map(state => stateDropdown.append("option").text(state).property("value", state));

    //Code Block 2 //

    zipcodes.map(zipcode => zipDropdown.append("option").text(zipcode).property("value", zipcode));

    let firstState = states[0];

    createScatter(firstState);
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
                size: 20
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

function optionChanged(item) {

    console.log("Showing results for", item);

    createScatter(item);

    if (stateDropdown.text().includes(item) == true) {

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
    }
}

init();