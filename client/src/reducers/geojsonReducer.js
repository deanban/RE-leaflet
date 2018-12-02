import { GETTING_DATA, GET_DATA } from "../actions/type";

const initialState = {
  loading: false,
  data: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_DATA:
      return {
        ...state,
        loading: true
      };

    case GET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
