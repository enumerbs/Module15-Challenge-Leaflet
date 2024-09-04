# Module15-Challenge-Leaflet
Data Analytics Boot Camp - Module 15 - Mapping
Leaflet Challenge

---

# Results

To access the 'All Earthquakes from the Past 7 Days' interactive map for this project, either:
1. Visit this repository's GitHub Pages site at: https://enumerbs.github.io/Module15-Challenge-Leaflet/ for the full 'Leaflet-Part-2' implementation including map layers control and optional display of tectonic plate boundaries.
or
1. load the ***index.html*** file from the 'Leaflet-Part-1' folder from this repository in your browser, for the simpler implementation without those extra features.


# Implementation notes

Part 1: Create the Earthquake Visualisation

- Rather than setting an arbitrary initial map zoom level, since the data feed includes the 'bounding box' ("bbox" key in the JSON data), its latitude/longitude extents were used to set the initial map zoom level.
- Used the 'ColorBrewer' site to choose a visually pleasing colour scale for the map points / legend (see References for details).
- Source code initial structure (main functions) based on the student activity sample code (see References for details).

Part 2: Gather and Plot More Data

- The Part 1 implementation notes also apply for Part 2.
- To work-around a CORS-related error when accessing the tectonic plate boundaries data from GitHub, the relevant JSON file was downloaded locally and included in the project as a source file. Additional comments about how this was then loaded and processed are in the source code (and see References for related details).
- To configure GitHub pages to present the implementation from the 'Part 2' subfolder, a GitHub Action was configured to publish from that subfolder (see References for details).

# References

The following references were used in the development of the solution for this Challenge.

## Data source
- USGS GeoJSON feed
    - Past 7 days 'All earthquakes' URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

## GitHub pages - build and deployment
- Publishing a site from a specified repository subfolder https://stackoverflow.com/questions/42941170/how-to-set-up-github-pages-to-look-for-index-html-in-a-different-location

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

## Reading data from a local JSON file
- https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
- https://www.geeksforgeeks.org/read-json-file-using-javascript/
- https://www.geeksforgeeks.org/how-to-access-variables-from-another-file-using-javascript/
- https://stackoverflow.com/questions/58679410/how-can-i-use-modules-in-the-browser-but-also-refer-to-variables-and-functions

## Retrieving / processing GeoJSON data
- Class notes/student activity files for 'Mapping', Monash University 'Data Analytics Boot Camp'
    - In particularly the '10-Stu_GeoJson' student activity sample code was used as a guide for this implementation.