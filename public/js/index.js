import '@babel/polyfill';
import { login, logout } from './login';
import { createaccount } from './createaccount';
import { createevent } from './createevent';
import { deleteevent } from './deleteevent';
import { createservice } from './createservice';
import { createreview } from './createreview';
import { deletereview } from './createreview';
import { updatereview } from './createreview';
import { updateservice, deleteservice } from './updateservice';
import { forgotpassword } from './forgotpassword';
import { resetpassword } from './resetpassword';
import { updateSettings } from './updateSettings';
import { contactrequest } from './contactrequest';
import { markmessage } from './markmessage';
import { deletemessage } from './markmessage';
import { showAlert } from './alerts';

const bookingForm = document.getElementById('booking-form');
const bookingForm2 = document.getElementById('booking-form2');
const serviceForm = document.getElementById('new-service-form');
const updateServiceForm = document.getElementById('update-service-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('form-signup');
const logOutBtn = document.getElementById('logout');
const submitButton = document.querySelector('.submitButton');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const forgotPasswordForm = document.querySelector('.form--forgotpassword');
const resetPasswordForm = document.querySelector('.form--resetpassword');
const deleteService = document.getElementById('delete-service');
const createReview = document.getElementById('create-review');
const contactForm = document.getElementById('contact-form');

const d = new Date();
const formattedDate =
  d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

if (submitButton)
  submitButton.addEventListener('click', (e) => {
    e.target.textContent = 'Submitting...';
  });

if (deleteService)
  deleteService.addEventListener('click', (e) => {
    const serviceId = document.getElementById('serviceId').value;
    const form = new FormData();
    form.append('active', false);
    deleteservice(serviceId, form, 'data');
  });

if (serviceForm) {
  serviceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', document.getElementById('service-title').value);
    form.append('subtitle', document.getElementById('service-subtitle').value);
    form.append(
      'description',
      document.getElementById('service-description').value
    );
    form.append('photo', document.getElementById('service-photo').files[0]);
    createservice(form, 'data');
  });
}

if (bookingForm2) {
  bookingForm2.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventDate = document.getElementById('book-date').value;
    const eventTime = document.getElementById('book-time').value;
    const service = document.getElementById('service').value;
    const dateString = document.getElementById('date-string').value;
    createevent(dateString, eventDate, eventTime, service);
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventDate = document.getElementById('book-date').value;
    const eventTime = document.getElementById('book-time').value;
    const service = document.getElementById('service').value;
    const dateString = document.getElementById('date-string').value;
    createevent(dateString, eventDate, eventTime, service);
  });
}

if (createReview) {
  createReview.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('service').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const review = document.getElementById('review').value;
    const event = document.getElementById('event').value;
    createreview(service, rating, review, event);
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

if (updateServiceForm) {
  updateServiceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const serviceId = document.getElementById('serviceId').value;
    const form = new FormData();
    form.append('title', document.getElementById('service-title').value);
    form.append('subtitle', document.getElementById('service-subtitle').value);
    form.append(
      'description',
      document.getElementById('service-description').value
    );
    form.append('photo', document.getElementById('service-photo').files[0]);
    form.append('active', document.getElementById('service-active').value);
    updateservice(serviceId, form, 'data');
    window.setTimeout(function () {
      location.reload(true);
    }, 1500);
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
const cancel = document.getElementById('delete-event');
const deleteReview = document.getElementById('delete-review');
const publishReview = document.getElementById('publish-review');
const markMessage = document.getElementById('mark-message');
const deleteMessage = document.getElementById('delete-message');

if (markMessage)
  markMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('messageId').value;
    const status = 'read';
    markmessage(status, id);
  });

if (deleteMessage)
  deleteMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('messageId2').value;
    deletemessage(id);
  });

if (publishReview)
  publishReview.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('reviewId').value;
    const status = 'published';
    updatereview(status, id);
  });

if (deleteReview)
  deleteReview.addEventListener('submit', (e) => {
    e.preventDefault();
    const deleteId = document.getElementById('deleteId').value;
    deletereview(deleteId);
  });

if (cancel)
  cancel.addEventListener('submit', (e) => {
    e.preventDefault();
    const eventId = document.getElementById('cancelId').value;
    deleteevent(eventId);
  });

if (close)
  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

const formatphone = document.getElementById('phone');
formatphone.addEventListener('keyup', function (e) {
  if (
    e.key != 'Backspace' &&
    (formatphone.value.length === 3 || formatphone.value.length === 7)
  ) {
    formatphone.value += '-';
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('contact-message').value;
    contactrequest(name, email, phone, message);
  });
}
