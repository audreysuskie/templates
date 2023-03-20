/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateAccount';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      const dataType = type;
      const dataType2 = dataType.charAt(0).toUpperCase() + dataType.slice(1);

      showAlert('success', `${dataType2} updated successfully!`);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
