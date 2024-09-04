// ------------------------------------------------------------------------------------------------
// Data aquisition

// Define the API endpoint URL re: USGS earthquake data API
// Chose the "Past 7 Days, All earthquakes" URL from this page: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
let earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to retrieve earthquake data for the past week
d3.json(earthquakesURL).then(function (data) {
    // Once we have the response:
    // (1) Determine the bounds (this will set the initial map zoom level), from the "bounding box" of earthquake locations
    let bbox = data.bbox;
    let corner1 = L.latLng(bbox[1], bbox[0]);
    let corner2 = L.latLng(bbox[4], bbox[3]);
    let mapBounds = L.latLngBounds(corner1, corner2);
    // (2) send the data.features object to the createFeatures function.
    createFeatures(mapBounds, data.features);
});

// ------------------------------------------------------------------------------------------------
// Map points / Legend colour scale

let colours = ['#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026']
// Colour scale values selected from / based on ColorBrewer '9-class Oranges' scale (see https://colorbrewer2.org),

function getDepthRangeColor(d) {
 return    d > 90  ? colours[5] :
           d > 70  ? colours[4] :
           d > 50  ? colours[3] :
           d > 30  ? colours[2] :
           d > 10  ? colours[1] :
           d > -10 ? colours[0] :
                    '#FFEDA0'   ; // Catch-all value (still based on the same colour scale, but outside the expected range of depth values)
}

// ------------------------------------------------------------------------------------------------
// Create a GeoJSON layer to visualise the earthquake data

function createFeatures(mapBounds, earthquakeData) {
    // Create a GeoJSON layer based on the features array on the earthquakeData object.
    let earthquakes = L.geoJSON(earthquakeData, {
        // Map points configuration
        pointToLayer: function (feature, latlng) {
            // Give each feature a popup that describes the place, magnitude, depth, and time of the earthquake.
            let popupText = `<h3>${feature.properties.place}</h3><hr>`; // place
            popupText += `<p>Magnitude: ${feature.properties.mag.toFixed(2)}</p>`; // magnitude
            popupText += `<p>Depth: ${feature.geometry.coordinates[2].toFixed(2)} km</p>`; // depth
            popupText += `<p>${new Date(feature.properties.time)}</p>`; // time

            // Customise data markers as per the challenge instructions, namely - data markers should:
            // - reflect the magnitude of the earthquake by their size and
            // - the depth of theearthquake by colour.
            // - Earthquakes with higher magnitudes should appear larger, and
            // - earthquakes with greater depth should appear darker in colour.
            // Include popups that provide additional information about the earthquake when its associated marker is clicked.
            return L.circleMarker(latlng, {
                // Define circle marker options:
                radius: (feature.properties.mag + 3.0)*2.0,  // Data marker circle radius is based on earthquake magnitude; an otherwise arbitary formula to set a circle size for each point that 'looks good' (not too large, not too small) on the map.
                fillColor: getDepthRangeColor(feature.geometry.coordinates[2]),   // Data marker colour based on earthquake depth.
                color: "#000", // Data marker edge colour
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8    // Data marker fill opacity - allow some opacity so underlying markers can 'show through' to some extent.
            }).bindPopup(popupText);
        }
    });

    // Send our earthquakes layer to the createMap function/
    createMap(mapBounds, earthquakes);
}

// ------------------------------------------------------------------------------------------------
// Create and show the map, including base layer (world map), earthquake data layer, and legend

function createMap(mapBounds, earthquakes) {
    // Initialise a blank map, targeting the 'div' element with id "map"
    let myMap = L.map("map", {});
    // Set the initial map zoom, based on the "bounding box" of earthquake locations
    myMap.fitBounds(mapBounds);

    // Add a tile layer (the background map image) to our map
    let countries = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    countries.addTo(myMap);

    // Add the earthquake markers
    earthquakes.addTo(myMap);

    // Set up the map legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let limits = ["-10 - 10", "10 - 30", "30 - 50", "50 - 70", "70 - 90", "90+"];   // Depth ranges for the map legend
        let labels = [];

        // Create a combination label ('earthquake depth' colour + associated depth value range) for each depth range
        limits.forEach(function(limit, index) {
            labels.push("<div>");
            // Use list item to show the appropriate 'earthquake depth' colour
            labels.push("<li style=\"background-color: " + colours[index] + ";color: " + colours[index] + "\">.</li>");
            // Use a span to show the earthquake depth range values beside the 'earthquake depth' colour
            labels.push("<span>" + limits[index] + "</span>");
            labels.push("</div>");
        });

        // Output the combined labels as a group.
        // Applied CSS styles for the list item and span elements control the layout.
        div.innerHTML = "";
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Finally, add the legend to the map
    legend.addTo(myMap);
}

// ------------------------------------------------------------------------------------------------