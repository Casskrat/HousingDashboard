console.log(housingData[0])

function init() {

    let stateDropdown = d3.select("#selDataset");

    var states = [];

    for (let i = 0; i < housingData.length; i++) {

        if (states.includes(housingData[i].State) == false) {
            
            states.push(housingData[i].State);

            //stateDropdown.append("option").text(housingData[i].State).property("value", housingData[i].State);

        }
    }

    states.sort();

    states.map(state => stateDropdown.append("option").text(state).property("value", state));

    let firstState = states[0];

    let zipDropdown = d3.select("#selDataset2");

    var zipcodes = [];

    for (let i = 0; i < housingData.length; i++) {

        if (zipcodes.includes(housingData[i]['Zip Code']) == false) {
            
            zipcodes.push(housingData[i]['Zip Code']);

            zipDropdown.append("option").text(housingData[i]['Zip Code']).property("value", housingData[i]['Zip Code']);

        }
    }

    createScatter(firstState);
}

function createScatter(selectItem) {

    if (d3.select("#selDataset").text().includes(selectItem) == true) {

        var stateCurrent = housingData.filter(state => state.State == selectItem);
    }
    else {

        var stateCurrent = housingData.filter(zipcode => zipcode['Zip Code'] == selectItem);
    }

    //let stateCurrent = housingData.filter(state => state.State == selectItem);

    let price  = [];
    let income = [];

    for (let i = 0; i < stateCurrent.length; i++) {

        price.push(stateCurrent[i].Price);
        income.push(stateCurrent[i]["Median Household Income"]);
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

    console.log("Showing results for ", item);

    createScatter(item);

    if (d3.select("#selDataset").text().includes(item) == true) {

        d3.select("#selDataset2").selectAll("option").remove();

        let zipcodes = housingData.filter(zipcode => zipcode.State == item);

        zipArray = [];

        for (let i = 0; i < zipcodes.length; i++) {
            
            if (zipArray.includes(zipcodes[i]['Zip Code']) == false) {

                zipArray.push(zipcodes[i]['Zip Code']);

                d3.select("#selDataset2").append("option").text(zipcodes[i]['Zip Code']).property("value", zipcodes[i]['Zip Code']);

            }
        }
    }
}

init();