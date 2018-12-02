const express = require("express");
const router = express.Router();
const keys = require("./keys");
const { Client, Query } = require("pg");

const connStr =
  "postgres://" +
  keys.dbUser +
  ":" +
  keys.dbUserPass +
  "@" +
  keys.dbHost +
  "/" +
  keys.dbName;

router.get("/data", (req, res) => {
  const dbQuery =
    "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((gid, name)) As properties FROM neighborhood_boundaries As lg) As f) As fc limit 10";
  const client = new Client(connStr);
  client.connect();

  const query = client.query(new Query(dbQuery));
  query.on("row", (row, result) => {
    // console.log(row);
    result.addRow(row);
  });

  query.on("end", result => {
    // console.log(result);
    res.send(result.rows[0].row_to_json);
    res.end();
  });
});

//filter geojson by neighborhood name
router.get("/data/filter", (req, res) => {
  const capitalize = name => {
    return name && name[0].toUpperCase() + name.slice(1);
  };

  const name = capitalize(req.query.name);

  //simple input check to prevent some sql injection vulnerability
  if (
    name.indexOf("--") > -1 ||
    name.indexOf("'") > -1 ||
    name.indexOf(";") > -1 ||
    name.indexOf("/*") > -1 ||
    name.indexOf("xp_") > -1
  ) {
    console.log("Bad request detected");
    res.redirect("/map");
    return;
  } else {
    console.log("request passed");
    const dbFilterQuery =
      "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((gid, name)) As properties FROM neighborhood_boundaries As lg WHERE lg.name = '" +
      name +
      "') As f) As fc";

    const client = new Client(connStr);
    client.connect();

    const query = client.query(new Query(dbFilterQuery));
    query.on("row", (row, result) => {
      // console.log(row);
      result.addRow(row);
    });
    query.on("end", result => {
      // console.log(result);
      res.send(result.rows[0].row_to_json);
      res.end();
    });
  }
});

module.exports = router;
