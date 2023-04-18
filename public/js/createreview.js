/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const createreview = async (service, rating, review, event) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/reviews/`,
      data: {
        service,
        rating,
        review,
        event,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your review has been submitted!');
      window.setTimeout(() => {
        location.assign('/history');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const updatereview = async (status, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/reviews/${id}`,
      data: {
        status,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'The review has been published.');
      window.setTimeout(() => {
        location.assign('/allreviews');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const deletereview = async (eventId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/reviews/${eventId}`,
      data: null,
    });

    if (res.status === 204) {
      showAlert('success', 'Your review has been deleted.');
      window.setTimeout(() => {
        location.assign('/reviews');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
