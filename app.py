# Import the dependencies.
from flask import Flask, jsonify, render_template

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import numpy as np


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///SQL/housing.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
housing = Base.classes.housing

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# Establish a home route displaying available routes in the API
# as well as formatting instructions for start and start-end routes
@app.route("/")
def home():
    # return (
    #     f"Welcome to the Housing Data API.<br/>"
    #     f"<br/>"
    #     f"Available Routes:<br/>"
    #     f"/api/v1.0/housingjson"
    # )
    return render_template("index.html")

@app.route("/leafletmap")
def openmap():

    return render_template("map.html")

@app.route("/heatmap")
def openmap2():

    return render_template("heatmap.html")
    

@app.route("/api/v1.0/housingjson")
def housingjson():

    data = session.query(housing.ZipCode, housing.Price, housing.Beds, housing.Baths, housing.LivingSpace,
                         housing.Address, housing.City, housing.State, housing.ZipCodePopulation,
                         housing.ZipCodeDensity, housing.County, housing.MedianHouseholdIncome,
                         housing.Latitude, housing.Longitude, housing.BaseDate, housing.ThreeMonth,
                         housing.SixMonth, housing.OneYear)
    
    session.close()

    json_data = []
    for a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r in data:
        data_dict = {}
        data_dict["Zip Code"] = a
        data_dict["Price"] = b
        data_dict["Beds"] = c
        data_dict["Baths"] = d
        data_dict["Living Space"] = e
        data_dict["Address"] = f
        data_dict["City"] = g
        data_dict["State"] = h
        data_dict["Zip Code Population"] = i
        data_dict["Zip Code Density"] = j
        data_dict["County"] = k
        data_dict["Median Household Income"] = l
        data_dict["Latitude"] = m
        data_dict["Longitude"] = n
        data_dict["BaseDate"] = o
        data_dict["3Month"] = p
        data_dict["6Month"] = q
        data_dict["1Year"] = r
        json_data.append(data_dict)

    return jsonify(json_data)


# Run debugger for app
if __name__ == "__main__":
    
    app.run(debug=True)