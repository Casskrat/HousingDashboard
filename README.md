# Project 3: National Housing Data Dashboard

#### Project Description:
When looking for a new home as a first time buyer, a family looking to move, or even as a property investor, it's always a big decision that requires careful consideration of a multitude of factors including cost, home size, number of bedrooms and bathrooms, population density of the area, and even future changes in home value. Our dashboard aims to provide an easy and useful way to compare these factors between different states and cities across the United States to make the process of searching for a new place to live that much easier.

![Image1](https://github.com/Casskrat/Project3/blob/main/Images/dashboard.png?raw=true)
#### Datasets Used:
* American Housing 2023 csv dataset
* Zillow Home Value Forecast csv dataset (03-31-24)

## Process

Multiple dependencies were used to leverage the creation of the dashboard from initial data cleaning to dashboard functionality.

The following steps were taken in order to create the dashboard:

  1. Data cleaning of csv files with Python Pandas in a Jupyter Notebook
  2. Table creation using SQL to house csv data and creation of an SQLite database
  3. Flask app creation in Python using SQLalchemy to connect to the database and query data
  4. API creation in the Flask app to access stored database data
  5. Use of bootstrap html code to create the base of the dashboard
  6. Use of Javascript d3, plotly, and leaflet libraries to add functionality to data visualizations
  7. Local hosting of the dashboard using the Flask app to access online

## Dashboard Features

### Interactive Dropdown Menus
![Image2](https://github.com/Casskrat/Project3/blob/main/Images/city_filter.png?raw=true) ![Image9](https://github.com/Casskrat/Project3/blob/main/Images/zipcode_filter.png?raw=true)

State level, City level, and Zip Code level drop downs serve to filter and view data visualizations based on the selection. Two sets of drop downs are present, the primary dropdowns and the comparison dropdowns located on the righthand side of the screen. In addition when a state is selected on either dropdown, the City and Zip Code dropdowns will be filtered to only show cities and zip codes present in the selected state. Further, once a city is selected from the City dropdown, the Zip Code dropdown will be filtered to only show zip codes present within the selected city.

### Histogram Comparisons
![Image3](https://github.com/Casskrat/Project3/blob/main/Images/histogram.png?raw=true) 

Gernerated histogram tables utilize the plotly overlay function to show data spreads for median household incomes and prices of homes in the selected location. Each bin increments median household income by 20,000 dollars, and home price by 50,000 dollars. Histograms display percentage of the housing population present within each bin. House prices data has an upper limit of two standard deviations from the average home price of a given location in order to filter out extreme upper outliers and improve visualization of the price histogram.

### Summary Table
![Image4](https://github.com/Casskrat/Project3/blob/main/Images/summary_table.png?raw=true)

The summary table displays calculated averages for the following variables filtered by each location: 
* Price
* Median Household Income
* Living Space
* Beds/Baths
* Population Density

All data is rounded to the nearest whole integer.

### Scatterplot Comparisons
![Image5](https://github.com/Casskrat/Project3/blob/main/Images/scatterplot.png?raw=true)

Scatterplots display living space in sqft on the x-axis measured against home price on the y-axis.

### Future Home Value Estimations
![Image6](https://github.com/Casskrat/Project3/blob/main/Images/estimates.png?raw=true)

The Future Home Value Estimation line graph compares two given locations average calculated percent change in home value at timepoints of three months, six months, and 12 months from the defined basedate. This visualization takes advantage of data from Zillows future home value estimations using their "zestimate" or home valuation algorithm. Points present above the zero line represent a relative increase in home value over time compared to the base date, while points present below the zero line indicate home value decreases relative to the base date.

### Interactive Leaflet Maps
Marker Map
![Image7](https://github.com/Casskrat/Project3/blob/main/Images/marker_map.png?raw=true)

The Leaflet marker map can be accessed via the House Map button on the home page of the dashboard. This interactive map shows markers of listed home locations. Marker color is indicative of house price and can be referenced to the legend in the bottom right corner of the map. Marker size is indicative of number of bedrooms present in the home, with more bedrooms equating to larger markers and less equating to smaller. Markers can be clicked to display specific price and number of bedrooms for each specific home shown on the map.

Heat Map
![Image8](https://github.com/Casskrat/Project3/blob/main/Images/heatmap.png?raw=true)

The Leaflet heatmap can be accessed via the Heat Map button on the home page of the dashboard. This interacitve map shows hotspots of listed home locations based upon zip code that can be filtered on price, population, or living space. A dropdown is present in the top right corner of the map which can be used to filter accordingly. At present moment due to filtering by zip code, this map is better suited to a larger scale view rather than a highly zoomed in one.

## Instructions for Use

The dashboard currently only works when hosted locally using the Flask app. In order to utilize the dashboard perform the following:

1. Clone the github repository to the desired location on your device.
2. Locate the repository and locate the app.py file.
3. Run the app.py file, this will start a local server on your device.
4. Copy the generated local server link and go to it in the desired web browser.
5. The dashboard will load and dropdowns can be utilized to compare housing data from locations of your choice.
6. Marker map and Heat map buttons will link you to a new page to display each map.

## Future Features and Fixes

* Combining the marker map and heatmap into one cohesive map providing both functionalities in one by using multiple overlays.
* Zoom functionality for the generated leaflet map to load zoomed into the location of choice on the dropdown menu.
* A single button to link to two leaflet maps generated side by side based on each selected location for easy visualization and comparison of map data. 
* Expanded data source by linking to the Zillow API to keep housing data up to date, current, and include more states and cities to filter and compare.
* Alphabetization of cities dropdown when filtered by state.

