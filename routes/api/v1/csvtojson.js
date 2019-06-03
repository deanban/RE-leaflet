const fs = require("fs");

//require the csvtojson converter class
const Converter = require("csvtojson").Converter;
// create a new converter object
const converter = new Converter({});

// call the fromFile function which takes in the path to your
// csv file as well as a callback function
converter.fromFile("./csvdata/2017_AGE_RACE_Actual_Data.csv", (err, result) => {
  // if an error has occured then handle it
  if (err) {
    console.log("An Error Has Occured");
    console.log(err);
  }
  // create a variable called json and store
  // the result of the conversion
  const json = result;
  //   setTimeout(() => {
  //     fs.writeFile("2017_AGE_RACE.json", JSON.stringify(result), err => {
  //       if (err) console.log(err);
  //       console.log("Successfully Written to File.");
  //     });
  //   }, 3000);

  // log our json to verify it has worked
  console.log(json);
});
