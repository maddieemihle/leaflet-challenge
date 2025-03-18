// Define earthquakes plates with GeoJSON data/url 
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // // Create earthquake layerGroup
// var earthquakes = new L.LayerGroup();

// Create the map object with options.
var map = L.map("mapid", {
  center: [40.7, -94.5],
  zoom: 5,
});

// Create the tile layer that will be the background of our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json(earthquakeURL).then(function (data) {
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: mapColor(feature.geometry.coordinates[2]),
            color: "black",
            radius: mapRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

  // Determine marker size by magnitude
  function mapRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  // Determine marker color by depth 
  function mapColor(depth) {
    switch (true) {
      case depth > 90:
        return "#red";
      case depth > 70:
        return "#orangered";
      case depth > 50:
        return "#orange";
      case depth > 30:
        return "#gold";
      case depth > 10:
        return "#yellow";
      default:
        return "#lighgreen";
    }
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: function (feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: mapColor(feature.geometry.coordinates[2]),
        color: "black",
        radius: mapRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    },

    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag 
        + "<br>Location: " + feature.properties.place 
        + "<br>Depth: " + feature.geometry.coordinates[2]);
    }
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];

    for (var i = 0; i < depth.length; i++) {
      div.innerHTML += '<i style="background:' + mapColor(depth[i] + 1) + '"></i> ' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }
    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(map);
});
