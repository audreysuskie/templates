/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const addAvailability = async (serviceId, availability) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/services/availability/${serviceId}`,
      data: {
        availability,
      },
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Your available dates have been added to the calendar.'
      );
      window.setTimeout(() => {
        location.assign('/availability');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
