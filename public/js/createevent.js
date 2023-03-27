/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const createevent = async (
  dateString,
  eventDate,
  eventTime,
  service
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/events/`,
      data: {
        dateString,
        eventDate,
        eventTime,
        service,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your service has been booked successfully');
      window.setTimeout(() => {
        location.assign('/bookings');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
