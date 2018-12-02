import axios from "axios";
import { GETTING_DATA, GET_DATA, GET_ERRORS } from "./type";

export const getData = () => dispatch => {
  dispatch({
    type: GETTING_DATA
  });

  axios
    .get("api/v1/data")
    .then(res =>
      dispatch({
        type: GET_DATA,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
