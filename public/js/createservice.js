/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const createservice = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/services/createService`,
      enctype: 'multipart/form-data',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your new service has been successfully added.');
      window.setTimeout(() => {
        location.assign('/services');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
