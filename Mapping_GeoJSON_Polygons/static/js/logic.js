// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map. doing static leaflet style method [13.5.6]
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map. [13.5.6]
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.[13.5.6]
let baseMaps = {
  "Streets": streets,
  "Satellie Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.[13.5.6]
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
})

// Pass our map layers into our layers control and add the layers control to the map.[13.5.4]
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL. [13.5.6]
let torontoHoods = "https://raw.githubusercontent.com/Zohairk4help/Mapping_Earthquakes/main/torontoNeighborhoods.json";



// Create a style for the lines.
let myStyle = {
  color: "#3388ff",
  fillcolor: "#3388ff",
  weight: 1
}

// Grabbing our GeoJSON data.[13.5.6].
d3.json(torontoHoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h3> Area Name:" + feature.properties.AREA_NAME + "</h3> <hr> <h3> Destination:"+ feature.geometry.coordinates + "</h3>");
  }
})
.addTo(map);
});

// // on each function for marker and bindpopup
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2> AirportCode:" + feature.properties.faa + "</h2> <hr> <h3> Airport name:"+ feature.properties.name + feature.properties.country +"</h3>");
//    }
// }).addTo(map);


satelliteStreets.addTo(map);
