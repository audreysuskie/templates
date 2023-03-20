/* eslint-disable */
import '@babel/polyfill';

export const hideAlert = () => {
  const e = document.querySelector('.alert-container');
  if (e) e.parentElement.removeChild(e);
};

export const showAlert = (type, msg, time = 6) => {
  hideAlert();
  const markup = `<div class="alert-container"><div class="alert alert--${type}">${msg}</div></div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};

export const showConfirm = (type, msg, result) => {
  hideAlert();
  const markup = `<div class="alert-container"><div class="alert alert--${type}">${msg}</div></div>
  <button id="confirm" type="button">Confirm</button><button id="cancel" type="button">Cancel</button>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
};
