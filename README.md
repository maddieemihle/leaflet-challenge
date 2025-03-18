# Leaflet Challenge

## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. In this challenge, USGS was interested in building a new set of tools to allow them to visualize their earthquake data. The goal was to develop a way to visualize USGS data to allow them to better educate the public and other government organizations on issues facing our planet.  

This challenge used skills learned with JavaScript, leaflet, GeoJSON, and HTML.  

## Challenge 
### Part 1: Develop Earthquake Visualization 
1. Retrieve the dataset from [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to visualize and analyze. Using the URL of the selected data ("All Earthquakes from the past 7 days"), the JSON representation of the data was used.

2. Using Leaflet, a map was created, and the data from the chosen URL was plotted based on longitude and latitude. The data markers reflected the earthquake by size, and the depth was reflected by color. Earthquakes with a higher magnitude appeared larger, and earthquakes with a greater depth appeared darker in color. Pop-ups were included that provided additional information about the earthquake when its associated marker was clicked. A legend was created to provide context for the map data. 

### Part 2: Gather and Plot Data 
1. Using another dataset provided, the map was used to illustrate the relationship between tectonic plates and seismic activity. The data was pulled and visualized along with the original data. 

## Results 
### Part 1 Results: Earthquake Visualization 
![alt text](https://github.com/maddieemihle/leaflet-challenge/blob/main/Images/Level-1.png?raw=true) 

### Part 2 Results: Tectonic Plates and Seismic Activity 
![alt text](https://github.com/maddieemihle/leaflet-challenge/blob/main/Images/Level-2.png?raw=true) 

## Methods Used
* JavaScript
* GeoJSON 
* D3.js 
* Leaflet libraries 
* APIs 

## Software Used
* Visual Studio Code

## References 
The dataset was created by the [United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). Instructions were provided by _edX Boot Camps LLC,_ and are intended for educational purposes only. 
