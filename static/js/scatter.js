console.log(housingData[0])

function init() {

    let stateDropdown = d3.select("#selDataset");

    let states = [];

    for (let i = 0; i < housingData.length; i++) {

        if (states.includes(housingData[i].State) == false) {
            
            states.push(housingData[i].State);

            stateDropdown.append("option").text(housingData[i].State).property("value", housingData[i].State);

        }
    }

    let firstState = states[0];

    let zipDropdown = d3.select("#selDataset2");

    let zipcodes = [];

    for (let i = 0; i < housingData.length; i++) {

        if (zipcodes.includes(housingData[i]['Zip Code']) == false) {
            
            zipcodes.push(housingData[i]['Zip Code']);

            zipDropdown.append("option").text(housingData[i]['Zip Code']).property("value", housingData[i]['Zip Code']);

        }
    } 

    createScatter(firstState);
}



function createScatter(selectState) {

    let stateCurrent = housingData.filter(state => state.State == selectState);

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
            size: 5,
            color: income
        }
    };

    let layout = {
        title: {
            text: `Median Household Income vs. House Price (${selectState})`,
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

function optionChanged(state) {

    console.log("Showing results for ", state);

    createScatter(state);
}

init();