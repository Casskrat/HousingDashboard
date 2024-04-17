var globalData = [];

let url = "/api/v1.0/housingjson";

function initHeatmap(data) {

    globalData.push(data);

    var housingData = globalData[0];

    // Initialize the map centered on the USA with zoom level 4
    var map = L.map('map').setView([37.8, -96], 5);

    // Add a basemap layer (OpenStreetMap) to display the map of the USA
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19 
    }).addTo(map);

    // Initialize a variable for the heat layer
    var heatLayer;

    // Function to update the heat layer based on the selected attribute
    function updateHeatLayer(attribute) {
        // Create an array of heat points based on the selected attribute
        var heatPoints = housingData.map(function(point) {
            // Return the point array: [latitude, longitude, attribute value]
            return [point.Latitude, point.Longitude, point[attribute]];
        });

        // If a heat layer exists, remove it
        if (heatLayer) {
            map.removeLayer(heatLayer);
        }

        // Create a new heat layer using the heat points array
        heatLayer = L.heatLayer(heatPoints, {
            radius: 10,  // Adjust the radius as desired
            blur: 15,    // Adjust the blur as desired
            maxZoom: 17  // Adjust the max zoom as desired
        }).addTo(map);
    }

    // Event listener for dropdown menu changes
    document.getElementById('attributeDropdown').addEventListener('change', function(event) {
        var selectedAttribute = event.target.value;
        // Update the heat layer based on the selected attribute
        updateHeatLayer(selectedAttribute);
    });

    // Initialize the heat layer with the default attribute ("Price")
    updateHeatLayer("Price");

}

d3.json(url).then(data => initHeatmap(data));
