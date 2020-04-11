import { API_URL } from "../shared/utils/constants";
import axios from "axios";
import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { setNotification, setLoading } from "../auth/reducers";
import { showAPIErrors } from "../shared/utils/helpers";

const awardsSlice = createSlice({
  name: "awards",
  initialState: { awards: [], error: null },
  reducers: {
    fetchAwardsSuccess(state, action) {
      state.awards = action.payload.awards;
    },
    fetchAwardsError(state, action) {
      state.error = action.payload.error;
    },
    editAwardSuccess(state, action) {
      const { award } = action.payload;
      let index = state.awards.findIndex(element => element.id === award.id);
      state.awards[index] = award;
    },
    editAwardError(state, action) {
      state.error = action.payload.error;
    },
    addAwardSuccess(state, action) {
      state.awards.push(action.payload.award);
    },
    addAwardError(state, action) {
      state.error = action.payload.error;
    }
  }
});
export const {
  fetchAwardsError,
  fetchAwardsSuccess,
  editAwardError,
  editAwardSuccess,
  addAwardSuccess,
  addAwardError
} = awardsSlice.actions;

export function fetchAwards(profileId, key) {
  return dispatch => {
    dispatch(setLoading({ isLoading: true, loadingText: "Fetching Your Data..." }));

    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    return axios
      .get(`${API_URL}/employer/awards/?employer=${profileId}`, { headers })
      .then(response => {
        dispatch(fetchAwardsSuccess({ awards: response.data }));
        dispatch(setLoading({ isLoading: false }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(fetchAwardsError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}
export function editAward(key, awardEdits) {
  return dispatch => {
    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    return axios
      .patch(`${API_URL}/employer/awards/${awardEdits.id}/`, awardEdits, { headers })
      .then(response => {
        dispatch(editAwardSuccess({ award: response.data }));
        dispatch(setLoading({ isLoading: false }));
        dispatch(setNotification({ message: "Changes Saved!" }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(editAwardError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}
export function addAward(profileId, key, award) {
  return dispatch => {
    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };
    award.employer = profileId;

    return axios
      .post(`${API_URL}/employer/awards/`, award, { headers })
      .then(response => {
        dispatch(addAwardSuccess({ award: response.data }));
        dispatch(setLoading({ isLoading: false }));
        dispatch(setNotification({ message: "Award added!" }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(addAwardError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}

const jobsSlice = createSlice({
  name: "jobs",
  initialState: { jobs: [], error: null },
  reducers: {
    fetchJobsSuccess(state, action) {
      state.jobs = action.payload.jobs;
    },
    fetchJobsError(state, action) {
      state.error = action.payload.error;
    },
    addJobSuccess(state, action) {
      state.jobs.push(action.payload.job);
    },
    addJobError(state, action) {
      state.error = action.payload.error;
    }
  }
});
export const {
  fetchJobsError,
  fetchJobsSuccess,
  addJobError,
  addJobSuccess
} = jobsSlice.actions;

export function fetchJobs(profileId) {
  return dispatch => {
    dispatch(setLoading({ isLoading: false }));

    const headers = { "content-type": "application/json" };
    const url = `${API_URL}/jobs/${profileId ? `?employer=${profileId}` : ""}`; //Yes, I am ashamed of this.

    return axios
      .get(url, { headers })
      .then(response => {
        dispatch(fetchJobsSuccess({ jobs: response.data }));
        dispatch(setLoading({ isLoading: false }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(fetchJobsError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}

export function addJob(profileId, key, job) {
  return dispatch => {
    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };
    job.employer_id = profileId;

    return axios
      .post(`${API_URL}/jobs/`, job, { headers })
      .then(response => {
        dispatch(addJobSuccess({ job: response.data }));
        dispatch(setLoading({ isLoading: false }));
        dispatch(setNotification({ message: "Job post created!" }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(addJobError({ error: error.data }));
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
    }
  },
  reducers: {
    fetchProfileSuccess(state, action) {
      state.profile = action.payload.profile;
    },
    fetchProfileError(state, action) {
      state.error = action.payload.error;
    },
    editProfileSuccess(state, action) {
      state.profile = action.payload.profile;
    },
    editProfileError(state, action) {
      state.error = action.payload.error;
    }
  }
});
export const {
  editProfileSuccess,
  editProfileError,
  fetchProfileError,
  fetchProfileSuccess
} = profileSlice.actions;

export function fetchProfile(userId, key) {
  return dispatch => {
    dispatch(setLoading({ isLoading: true }));

    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    return axios
      .get(`${API_URL}/employer/profile/?user=${userId}`, { headers })
      .then(response => {
        dispatch(fetchProfileSuccess({ profile: response.data[0] }));
        dispatch(setLoading({ isLoading: false }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(fetchProfileError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], error: null },
  reducers: {
    fetchReviewsSuccess(state, action) {
      state.reviews = action.payload.reviews;
    },
    fetchReviewsError(state, action) {
      state.error = action.payload.error;
    }
  }
});
export const { fetchReviewsError, fetchReviewsSuccess } = reviewsSlice.actions;

export function fetchReviews(profileId, key) {
  return dispatch => {
    dispatch(setLoading({ isLoading: true }));

    const headers = { "content-type": "application/json", Authorization: `Token ${key}` };

    return axios
      .get(`${API_URL}/employer/reviews/?employer=${profileId}`, { headers })
      .then(response => {
        dispatch(fetchReviewsSuccess({ reviews: response.data }));
        dispatch(setLoading({ isLoading: false }));
      })
      .catch(error => {
        dispatch(setLoading({ isLoading: false }));
        dispatch(fetchReviewsError({ error: error.data }));
        showAPIErrors(error, setNotification);
      });
  };
}

export default combineReducers({
  awards: awardsSlice.reducer,
  reviews: reviewsSlice.reducer,
  jobs: jobsSlice.reducer
});
