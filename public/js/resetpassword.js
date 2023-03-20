/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const resetpassword = async (
  passwordResetToken,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${passwordResetToken}`,
      data: {
        passwordResetToken,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password changed successfully');
      window.setTimeout(() => {
        location.assign('/account');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
