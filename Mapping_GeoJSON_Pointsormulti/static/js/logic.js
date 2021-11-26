// Add console.log to check to see if our code is working.
console.log("working");

// // Create the map object with center at the San Francisco airport. [13.5.2]
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create the map object with center and zoom level. [13.5.3]
//let map = L.map('mapid').setView([30, 30], 2);
// We create the tile layer that will be the background of our map. doing static leaflet style method [13.2.4]
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map. [13.5.4]
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.[13.5.4]
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.[13.5.4]
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.[13.5.4]
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL [13.5.4]
let airportData = "https://raw.githubusercontent.com/Zohairk4help/Mapping_Earthquakes/main/majorAirports.json";
// to add GeoJSON objects are added to the map through a GeoJSON layer
// Grabbing our GeoJSON data. with pointtolayer function for marker 
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>"+ feature.properties.city + feature.properties.country +"</h3>");
//   }

// }).addTo(map);


// Grabbing our GeoJSON data.[13.5.4]
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data).addTo(map);
});

// // on each function for marker and bindpopup
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2> AirportCode:" + feature.properties.faa + "</h2> <hr> <h3> Airport name:"+ feature.properties.name + feature.properties.country +"</h3>");
//    }
// }).addTo(map);


streets.addTo(map);
