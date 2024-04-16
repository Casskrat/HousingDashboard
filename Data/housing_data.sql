CREATE TABLE housing_data (
    zip_code INTEGER,
    price NUMERIC(11,2),
    beds INTEGER,
    baths INTEGER,
    living_space INTEGER,
    address VARCHAR(255),
    city VARCHAR(20),
    state VARCHAR(20),
    zip_code_population INTEGER,
    zip_code_density REAL,
    county VARCHAR(255),
    median_household_income NUMERIC(11,2),
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6)
);
