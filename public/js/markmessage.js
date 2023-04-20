/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const markmessage = async (status, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/messages/${id}`,
      data: {
        status,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'The message has been marked as read.');
      window.setTimeout(() => {
        location.assign('/messages');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const deletemessage = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/messages/${id}`,
      data: null,
    });

    if (res.status === 204) {
      showAlert('success', 'The message has been deleted.');
      window.setTimeout(() => {
        location.assign('/messages');
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
