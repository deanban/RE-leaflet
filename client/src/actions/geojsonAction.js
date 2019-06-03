import axios from "axios";
import { GETTING_DATA, GET_DATA, GET_ERRORS, SEND_DATA } from "./type";

export const getData = () => dispatch => {
  dispatch({
    type: GETTING_DATA
  });

  // axios.get("api/v1/data").then(res =>
  //   dispatch({
  //     type: GET_DATA,
  //     payload: res.data
  //   })
  // );
  axios
    .get(
      "https://raw.githubusercontent.com/OpenDataDE/State-zip-code-GeoJSON/master/ny_new_york_zip_codes_geo.min.json"
    )
    .then(res =>
      res
        ? dispatch({
            type: GET_DATA,
            payload: res.data
          })
        : {}
    )
    .catch(err =>
      err
        ? dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        : {}
    );
};
