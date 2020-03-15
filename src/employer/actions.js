import axios from "axios";

export const FETCH_AWARDS_BEGIN = "FETCH_AWARDS_BEGIN";
export const FETCH_AWARDS_SUCCESS = "FETCH_AWARDS_SUCCESS";
export const FETCH_AWARDS_ERROR = "FETCH_AWARDS_ERROR";

export function fetchAwards(dispatch) {
  return (dispatch) => {
    dispatch(fetchAwardsBegin());
    return axios
      .get(url, headers)
      .then(res => dispatch(fetchAwardsSuccess(res)))
      .catch(err => dispatch(fetchAwardsError(err)));
  };
}

export const fetchAwardsBegin = () => ({ type: FETCH_AWARDS_BEGIN });
export const fetchAwardsSuccess = payload => ({
  type: FETCH_AWARDS_SUCCESS,
  payload
});
export const fetchAwardsError = payload => ({
  type: FETCH_AWARDS_ERROR,
  payload
});
