/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const deleteevent = async (eventId) => {
  try {
    const res = await axios({
      method: 'Delete',
      url: `/api/v1/events/${eventId}`,
      data: null,
    });

    if (res.status === 204) {
      showAlert('success', 'Your appointment has been cancelled.');
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
