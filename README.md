# Project 3: National Housing Data Dashboard

#### Project Description:
When looking for a new home as a first time buyer, a family looking to move, or even as a property investor, it's always a big decision that requires careful consideration of a multitude of factors including cost, home size, number of bedrooms and bathrooms, population density of the area, and even future changes in home value. Our dashboard aims to provide an easy and useful way to compare these factors between different states and cities across the United States to make the process of searching for a new place to live that much easier.

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

#### Interactive Dropdown Menus

#### Histogram Comparisons

#### Summary Table

#### Scatterplot Comparisons

#### Future Home Value Estimations

#### Interactive Leaflet Maps

## Instructions for Use

The dashboard currently only works when hosted locally using the Flask app. In order to utilize the dashboard perform the following:

1. Clone
2. Locate cloned
3. Locate app.py
4. run it
5. utilize dropdowns to begin comparing

## Future Features and Fixes

* combination of heat and marker map
* map working with dropdown to zoom on load
* connection to zillow API for more udpated and current data
* 

