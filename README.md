# Module15-Challenge-Leaflet
Data Analytics Boot Camp - Module 15 - Mapping
Leaflet Challenge

---

# Results

To access the 'All Earthquakes from the Past 7 Days' interactive map for this project, either:
1. Visit this repository's GitHub Pages site at: https://enumerbs.github.io/Module15-Challenge-Leaflet/
or
1. load the ***index.html*** file for either the 'Leaflet-Part-1' or 'Leaflet-Part-2' folders from the repository in your browser.


# Implementation notes

Part 1: Create the Earthquake Visualisation

- Rather than setting an arbitrary initial map zoom level, since the data feed includes the 'bounding box' ("bbox" key in the JSON data), its latitude/longitude extents were used to set the initial map zoom level.
- Used the 'ColorBrewer' site to choose a visually pleasing colour scale for the map points / legend (see References for details).
- Source code initial structure (main functions) based on the student activity sample code (see References for details).

# References

The following references were used in the development of the solution for this Challenge.

## Data source
- USGS GeoJSON feed
    - Past 7 days 'All earthquakes' URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

## HTML / CSS
- HTML span element https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
- CSS display: inline-block https://developer.mozilla.org/en-US/docs/Web/CSS/display


## Leaflet documentation
- Zooming the map to fit a particular set of locations
    - https://leafletjs.com/reference.html#map-fitbounds
    - https://leafletjs.com/reference.html#latlngbounds

## Map points / legend colour scale
- 'ColorBrewer' tool
    - Chosen colour scale based on the ColorBrewer '9-class Oranges' scale https://colorbrewer2.org/#type=sequential&scheme=Oranges&n=9

## Retrieving / processing GeoJSON data
- Class notes/student activity files for 'Mapping', Monash University 'Data Analytics Boot Camp'
    - In particularly the '10-Stu_GeoJson' student activity sample code was used as a guide for this implementation.