var globalData = [];

let url = "/api/v1.0/housingjson";

function initmap(data) {

    console.log(data);

    globalData.push(data);

    var housing = globalData[0];


    let markers=[];
    function mapRadius(price) {
        if (price <= 100000) return 10000;
        else if (price <= 200000) return 20000;
        else if (price <= 300000) return 30000;
        else if (price <= 400000) return 40000;
        else if (price <= 500000) return 50000;
        else if (price <= 600000) return 60000;
        else return 7000;
        };

    for (let i = 0; i < housing.length; i++) {
        let radius = "";
        if (housing[i].Beds <=1) {
            radius = 100;
        }
        else if (housing[i].Beds==2) {
            radius = 140;
        }
        else if (housing[i].Beds==3) {
            radius = 180;
        }
        else if (housing[i].Beds==4) {
            radius = 220;
        }
        else {
            radius = 260;
        }

        let fillcolor = "";
        if (housing[i].Price <=200000) {
            fillcolor = "yellow";
        }
        else if (housing[i].Price <=300000) {
            fillcolor = "orange";
        }
        else if (housing[i].Price <=400000) {
            fillcolor = "red";
        }
        else if (housing[i].Price <=500000) {
            fillcolor = "purple";
        }
        else {
            fillcolor = "maroon";
        }
        markers.push(
            L.circle([housing[i].Latitude, housing[i].Longitude],{
                opacity: 0.75,
                fillOpacity: 0.75,
                fillcolor: "black",
                color: fillcolor,
                radius: radius,
                stroke: true,
                weight: 0.1
            }).bindPopup(`<h2>${housing[i].City}, ${housing[i].State}</h1> <hr> <h3>Price:$${housing[i].Price}</h3> <hr> <h3>Number of Beds:${housing[i].Beds}</h3>`)
    )};

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    let houses = L.layerGroup(markers);
    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    let overlayMaps = {
        "Houses": houses
    };
    
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [street, houses]
    });
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    function Fillcolor(prices){
        if (prices <=100) return "yellow";
        else if (prices <=200) return "orange";
        else if (prices <=300) return "#CD5C5C";
        else if (prices <=400) return "red";
        else if (prices <=500) return "purple";
        else return "maroon";
    }

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "info legend"),
            price = [0, 100, 200, 300, 400, 500];
            labels = []
        div.innerHTML += "<h3 style='text-align: center'>Price </h3>"
        for (var i = 0; i < price.length; i++) {
            div.innerHTML +=
                '<i style="background:' + Fillcolor(price[i]+1)+ '"></i> ' + 
                price[i]+'k' + (price[i + 1] ? '&ndash;' + price[i + 1] +'k'+ '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap) 

}

d3.json(url).then(data => initmap(data));