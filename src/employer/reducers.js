import { API_URL } from "../common/utils/constants";
import {setNotification} from "../auth/reducers"
import axios from "axios";
import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { showAPIErrors } from "../common/utils/helpers";

const awardsSlice = createSlice({
  name: "awards",
  initialState: { awards: [], loading: false, error: null },
  reducers: {
    fetchAwardsBegin(state, action) {
      state.loading = action.payload;
    },
    fetchAwardsSuccess(state, action) {
      const { awards, loading } = action.payload;
      state.awards = awards;
      state.loading = loading;
    },
    fetchAwardsError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    },
    editAwardSuccess(state, action) {
      const { award, loading } = action.payload;
      let index = state.awards.findIndex(element => element.id === award.id);
      state.awards[index] = award;
      state.loading = loading;
    },
    editAwardError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    },
    addAwardSuccess(state, action) {
      const { award, loading } = action.payload;
      state.awards.push(award);
      state.loading = loading;
    },
    addAwardError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  fetchAwardsBegin,
  fetchAwardsError,
  fetchAwardsSuccess,
  editAwardError,
  editAwardSuccess,
  addAwardSuccess,
  addAwardError
} = awardsSlice.actions;

export function fetchAwards(profile_id, key) {
  return dispatch => {
    dispatch(fetchAwardsBegin({ loading: { isLoading: true } }));
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    return axios
      .get(`${API_URL}/employer/awards/?employer=${profile_id}`, { headers })
      .then(response => {
        dispatch(
          fetchAwardsSuccess({
            awards: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error => {
        dispatch(
          fetchAwardsError({ error: error.data, loading: { isLoading: false } })
        );
        showAPIErrors(error, setNotification);
      });
  };
}
export function editAward(key, awardEdits) {
  return dispatch => {
    const { id } = awardEdits;
    let url = `${API_URL}/employer/awards/${id}/`;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };

    return axios
      .patch(url, awardEdits, { headers })
      .then(response =>
        dispatch(
          editAwardSuccess({
            award: response.data,
            loading: { isLoading: false }
          })
        )
      )
      .catch(error => {
        dispatch(
          editAwardError({ error: error.data, loading: { isLoading: false } })
        );
        showAPIErrors(error, setNotification);
      });
  };
}
export function addAward(profile_id, key, award) {
  return dispatch => {
    award.employer = profile_id;

    let url = `${API_URL}/employer/awards/`;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };

    return axios
      .post(url, award, { headers })
      .then(response =>
        dispatch(
          addAwardSuccess({
            award: response.data,
            loading: { isLoading: false }
          })
        )
      )
      .catch(error => {
        dispatch(
          addAwardError({ error: error.data, loading: { isLoading: false } })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

const jobsSlice = createSlice({
  name: "jobs",
  initialState: { jobs: [], loading: false, error: null},
  reducers: {
    fetchJobsBegin(state, action) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    fetchJobsSuccess(state, action) {
      const { jobs, loading } = action.payload;

      state.jobs = jobs;
      state.loading = loading;
    },
    fetchJobsError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    },
    addJobsSuccess(state, action) {
      const { job, loading } = action.payload;
      state.jobs.push(job);
      state.loading = loading;
    },
    addJobError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  fetchJobsBegin,
  fetchJobsError,
  fetchJobsSuccess,
  addJobError,
  addJobSuccess
} = jobsSlice.actions;

export function fetchJobs(profile_id) {
  return dispatch => {
    dispatch(fetchJobsBegin({ loading: { isLoading: false } }));

    const headers = { "content-type": "application/json" };

    let url = `${API_URL}/jobs/${profile_id ? `?employer=${profile_id}` : ""}`; //Yes, I am ashamed of this.

    return axios
      .get(url, { headers })
      .then(response => {
        dispatch(
          fetchJobsSuccess({
            jobs: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error => {
        dispatch(
          fetchJobsError({ error: error.data, loading: { isLoading: false } })
        );
        showAPIErrors(error, setNotification);
      });
  };
}
export function addJob(profile_id, key, job) {
  return dispatch => {
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    let url = `${API_URL}/jobs/`;

    job.employer_id = profile_id;

    return axios
      .post(url, job, { headers })
      .then(response =>
        dispatch(
          addJobSuccess({ job: response.data, loading: { isLoading: false } })
        )
      )
      .catch(error => {
        console.log(error);
        dispatch(
          addJobError({ error: error.data, loading: { isLoading: false } })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

const profileSlice = createSlice({
  name: "employerProfile",
  intialState: {
    profile: {
      company_name: "KanzuCode",
      location: "",
      industry: "",
      number_of_employees: "",
      phone_number: "",
      social: {
        facebook: "",
        twitter: "",
        linkedin: "",
        behance: "",
        dribbble: "",
        github: "",
        website: ""
      },
      description: ""
    },
    loading: { isLoading: false, loadingText: "" }
  },
  reducers: {
    fetchProfileBegin(state, action) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    fetchProfileSuccess(state, action) {
      const { profile, loading } = action.payload;
      state.profile = profile;
      state.loading = loading;
    },
    fetchProfileError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    },
    editProfileSuccess(state, action) {
      const { profile, loading } = action.payload;
      state.profile = profile;
      state.loading = loading;
    },
    editProfileError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  editProfileSuccess,
  editProfileError,
  fetchProfileBegin,
  fetchProfileError,
  fetchProfileSuccess
} = profileSlice.actions;

export function fetchProfile(user_id, key) {
  return dispatch => {
    dispatch(fetchProfileBegin({ loading: { isLoading: true } }));

    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };

    return axios
      .get(`${API_URL}/employer/profile/?user=${user_id}`, { headers })
      .then(response =>
        dispatch(
          fetchProfileSuccess({
            profile: response.data[0],
            loading: { isLoading: false }
          })
        )
      )
      .catch(error => {
        dispatch(
          fetchProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        );
        showAPIErrors(error, setNotification);
      });
  };
}
export function editProfile(profile_id, key, profile_edits) {
  return dispatch => {
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    return axios
      .patch(`${API_URL}/employer/profile/${profile_id}/`, profile_edits, {
        headers
      })
      .then(response => {
        dispatch(
          editProfileSuccess({
            profile: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error => {
        dispatch(
          editProfileError({
            error: error.data,
            loading: { isLoading: false }
          })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], loading: false, error: null},
  reducers: {
    fetchReviewsBegin(state, action) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    fetchReviewsSuccess(state, action) {
      const { reviews, loading } = action.payload;
      state.reviews = reviews;
      state.loading = loading;
    },
    fetchReviewsError(state, action) {
      const { error, loading } = action.payload;
      state.error = error;
      state.loading = loading;
    }
  }
});
export const {
  fetchReviewsBegin,
  fetchReviewsError,
  fetchReviewsSuccess
} = reviewsSlice.actions;

export function fetchReviews(profile_id, key) {
  return dispatch => {
    dispatch(fetchReviewsBegin({ loading: { isLoading: true } }));
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    return axios
      .get(`${API_URL}/employer/reviews/?employer=${profile_id}`, { headers })
      .then(response => {
        dispatch(
          fetchReviewsSuccess({
            reviews: response.data,
            loading: { isLoading: false }
          })
        );
      })
      .catch(error => {
        dispatch(
          fetchReviewsError({
            error: error.data,
            loading: { isLoading: false }
          })
        );
        showAPIErrors(error, setNotification);
      });
  };
}

export default combineReducers({
  awards: awardsSlice.reducer,
  reviews: reviewsSlice.reducer,
  jobs: jobsSlice.reducer
});
