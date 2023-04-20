/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const contactrequest = async (name, email, phone, message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/messages/`,
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Thank you! Your contact request has been sent');
      window.setTimeout(() => {
        location.assign('/contact');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
