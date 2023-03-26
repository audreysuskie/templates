import '@babel/polyfill';
import { login, logout } from './login';
import { createaccount } from './createaccount';
import { createevent } from './createevent';
import { forgotpassword } from './forgotpassword';
import { resetpassword } from './resetpassword';
import { updateSettings } from './updateSettings';
import { showAlert } from './alerts';

const bookingForm = document.getElementById('booking-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('form-signup');
const logOutBtn = document.getElementById('logout');
const submitButton = document.querySelector('.submitButton');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const forgotPasswordForm = document.querySelector('.form--forgotpassword');
const resetPasswordForm = document.querySelector('.form--resetpassword');

const d = new Date();
const formattedDate =
  d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

if (submitButton)
  submitButton.addEventListener('click', (e) => {
    e.target.textContent = 'Submitting...';
  });

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventDate = document.getElementById('book-date').value;
    const eventTime = document.getElementById('book-time').value;
    const service = document.getElementById('service').value;
    createevent(eventDate, eventTime, service);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    createaccount(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const lastLogin = formattedDate;
    login(email, password, lastLogin);
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
    window.setTimeout(function () {
      location.reload(true);
    }, 1500);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordResetToken = document.getElementById('reset').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    resetpassword(passwordResetToken, password, passwordConfirm);
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotpassword(email);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 10);

const close = document.getElementById('close');
const modal = document.querySelector('.modal-wrapper');

if (close)
  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });
