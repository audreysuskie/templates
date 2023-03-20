/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const forgotpassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        'The password reset link was sent to your email. The link will expire in 10 minutes.'
      );
      window.setTimeout(() => {
        location.assign('/login');
      }, 2500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
