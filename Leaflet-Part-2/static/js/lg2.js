// Code for the Leaflet-Step-2 activity

// Define earthquakes plates with GeoJSON data/url 
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonic_platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Create earthquake layerGroup
var earthquakes = new L.LayerGroup();
var tectonic_plates = new L.LayerGroup();

// Define tile layers (steetMap) 
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: API_KEY
});

var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

// Create the 'basemap' tile layer that will be the background of our map.
var baseMap = {
    "Satellite Map": satelliteMap,
    "Grayscale Map": grayscaleMap,
    "Outdoors Map": outdoorsMap,
    "Dark Map": darkMap
};

// Create the overlay object to add to the layer control.
var overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonic_plates
}

// Create the map object with center and zoom options.
let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 2,
    layers: [satelliteMap, earthquakes]
});

// Then add the 'basemap' tile layer to the map.
baseMap.addTo(map);

// Create the layer groups, base maps, and overlays.
L.control.layers(baseMap, overlays,{
    collapsed: false
}).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json(earthquakeURL).then(function (earthquakeData) {
  // Determine marker size by magnitude
    function markerSize(magnitude) {
        return magnitude * 4;
    };

    // Determine marker color by depth
    function markerColor(depth) {
        if (depth > 90) {
            return "#ea2c2c";
          } else if (depth > 70) {
            return "#ea822c";
          } else if (depth > 50) {
            return "#ee9c00";
          } else if (depth > 30) {
            return "#eecc00";
          } else if (depth > 10) {
            return "#d4ee00";
          } else {
            return "#98ee00";
          }
        };

    // Create a GeoJSON layer containing the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    L.geoJSON(earthquakeData, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: " 
            + feature.geometry.coordinates[2] + "<br>Location: " 
            + feature.properties.place);
        },
        pointToLayer: function (feature, latlng) {
            return new L.circle(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                fillOpacity: 1,
                color: "black",
                stroke: true,
                weight: 0.5
            });
        }
    }).addTo(earthquakes);
  
    // Add the earthquakes layer to the map.
    earthquakes.addTo(map);

    // Get the techtonic plate data from the URL
    d3.json(tectonic_platesURL).then(function (plateData) {
        L.geoJSON(plateData, {
            color: "orange",
            weight: 2
        }).addTo(tectonic_plates);
        tectonic_plates.addTo(map);
    });

    // Create a legend control object.
    var legend = L.control({
        position: "bottomright"
    });

    // Add legend
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend"),
      depth = [-10, 10, 30, 50, 70, 90];
      
      div.innerHTML += "<h3 style='text-align: center'>Depth</h3>"
  
      for (var i =0; i < depth.length; i++) {
        div.innerHTML += 
        '<i style="background:' + chooseColor(depth[i] + 1) + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
      };
      legend.addTo(myMap);
});