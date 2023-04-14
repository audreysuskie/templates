/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const updateservice = async (serviceId, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/services/${serviceId}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Service updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteservice = async (serviceId, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/services/${serviceId}`,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Service deleted successfully!');
      window.setTimeout(() => {
        location.assign('/services');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
