boundaryURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-boundary.geojson"
quadrantURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/dc-quadrants.geojson"
wardURL = "https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/ward-2012.geojson"

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoicmllaGxlYSIsImEiOiJjamlhdWlzcnkxMndiM3FsbWl1aXE0MXJtIn0.g7oyFuzbGAh1O0SXpGI8nw");

var baseMaps = {
  "Street Map": streetmap,
};

function chooseColor(quadrant) {
  switch (quadrant) {
  case "SW":
    return "yellow";
  case "SE":
    return "red";
  case "NE":
    return "orange";
  case "NW":
    return "green";
  default:
    return "black";
  }
}

d3.json(boundaryURL, function(boundaryData) {
  var boundary = L.geoJSON(boundaryData)

d3.json(quadrantURL, function(quadrantData) {
  var quad = L.geoJSON(quadrantData, {
    // Style for each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.QUADRANT),
        fillOpacity: 1,
        weight: 1.5
      };
    }
})
d3.json(wardURL, function(wardData) {
  var ward = L.geoJSON(wardData, {
    onEachFeature: function (feature, layer) {
    var marker1 = layer.bindPopup('<h3> Ward'+feature.properties.WARD_ID+'</h3>');
    marker1.on('mouseover', function (e) {
  this.openPopup();
});
marker1.on('mouseout', function (e) {
  this.closePopup();
});
  }

  })

  var overlayMaps = {
    "DC Boundary": boundary,
    "DC Quadrants": quad,
    "DC Wards": ward,
  }

  var myMap = L.map("map", {
    center: [
      38.9, -77
    ],
    zoom: 11,
    layers: [streetmap, boundary, quad, ward]
  });
})
})
})