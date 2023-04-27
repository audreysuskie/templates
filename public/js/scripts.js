function preload_image(im_url) {
  let img = new Image();
  img.src = im_url;
}

preload_image('/images/JumboImage.jpg');

$(document).ready(function () {
  $('#book-date-note').hide();
  $('#book-date').click(function () {
    $('#book-date-note').show();
  });

  $('.mark-message').click(function () {
    $('.editmessage-wrapper').css('display', 'flex');
    var id = $(this).data('id');
    var name = $(this).data('name');
    var email = $(this).data('email');
    var phone = $(this).data('phone');
    var status = $(this).data('status');
    var message = $(this).data('message');
    $('#messageId').attr('value', id);
    $('#name').text(name);
    $('#email').text(email);
    $('#phone').text(phone);
    $('#message').text(message);
    $('#status').text(status);
    $('.editmessage-wrapper').scrollTop();
  });

  $('.publish-review').click(function () {
    $('.publishmodal-wrapper').css('display', 'flex');
    var id = $(this).data('id');
    var service = $(this).data('service');
    var rating = $(this).data('rating');
    var review = $(this).data('review');
    var status = $(this).data('status');
    var user = $(this).data('user');
    $('#reviewId').attr('value', id);
    $('#service').text(service);
    $('#rating').text(rating);
    $('#review').text(review);
    $('#user').text(user);
    $('#status').text("'" + status + "'");
    $('.publishmodal-wrapper').scrollTop();
  });

  $('.item-logo').click(function () {
    $('.modal-wrapper').css('display', 'flex');
    var modalImage = $(this).attr('src');
    var Item1 = $(this).attr('title');
    var Item2 = $(this).attr('value');
    var Item3 = $(this).attr('name');
    $('.modal-image').attr('src', modalImage);
    $('#item1').text(Item1);
    $('#item2').text(Item2);
    $('#item3').text(Item3);
    $('.modal-wrapper').scrollTop();
  });

  $('.cancel-booking').click(function () {
    $('.modal-wrapper').css('display', 'flex');
    var name = $(this).data('name');
    var email = $(this).data('email');
    var date = $(this).data('date');
    var time = $(this).data('time');
    var service = $(this).data('service');
    var id = $(this).data('id');
    $('#event-date').text(date);
    $('#event-time').text(time);
    $('#event-name').text(name);
    $('#event-email').text(email);
    $('#event-service').text(service);
    $('#cancelId').attr('value', id);
    $('.modal-wrapper').scrollTop();
  });

  $('.create-review').click(function () {
    var event = $(this).data('id');
    var service = $(this).data('service');
    var date = $(this).data('date');
    $('#service-text').text(service);
    $('#service-date').text(date);
    $('#service').attr('value', service);
    $('#event').attr('value', event);
    $('.modal-wrapper').css('display', 'flex');
    $('.modal-wrapper').scrollTop();
  });

  $('.delete-review').click(function () {
    var service = $(this).data('service');
    var date = $(this).data('date');
    var rating = $(this).data('rating');
    var review = $(this).data('review');
    var user = $(this).data('user');
    var id = $(this).data('id');
    $('#review-service').text(service);
    $('#review-date').text(date);
    $('#review-user').text(user);
    $('#review-rating').text(rating + ' out of 5');
    $('#review-review').text(review);
    $('#deleteId').attr('value', id);
    $('.modal-wrapper').css('display', 'flex');
    $('.modal-wrapper').scrollTop();
  });

  $('.delete-message').click(function () {
    $('.deletemessage-wrapper').css('display', 'flex');
    var id = $(this).data('id');
    var name = $(this).data('name');
    var email = $(this).data('email');
    var phone = $(this).data('phone');
    var status = $(this).data('status');
    var message = $(this).data('message');
    $('#messageId2').attr('value', id);
    $('#name2').text(name);
    $('#email2').text(email);
    $('#phone2').text(phone);
    $('#message2').text(message);
    $('#status2').text("'" + status + "'");
    $('.deletemessage-wrapper').scrollTop();
  });

  $('#event-close, #confirm-cancel').click(function () {
    $('#event-date').text('');
    $('#event-time').text('');
    $('#event-name').text('');
    $('#event-email').text('');
    $('#event-service').text('');
    $('#service').attr('value', '');
    $('#event').attr('value', '');
    $('#cancelId').attr('value', '');
    $('.modal-wrapper').css('display', 'none');
    $('.homemodal-wrapper').css('display', 'none');
    $('.publishmodal-wrapper').css('display', 'none');
    $('.editmessage-wrapper').css('display', 'none');
    $('.deletemessage-wrapper').css('display', 'none');
  });

  //Home Page Booking Button Redirect
  $('.home-book-button').hide();
  let homeserviceId;
  let original_link = '/bookService/';
  $('#homeservice').on('change', function () {
    $('.home-book-button').attr('href', original_link);
    homeserviceId = $(this).val();
    var new_href = $('.home-book-button').attr('href') + homeserviceId;
    $('.home-book-button').attr('href', new_href);
    $('.home-book-button').show();
  });

  // Animation
  function isInView(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)) ||
      (rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight))
    );
  }

  var scroll =
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  var scrollAnimation = document.querySelectorAll('.scrollAni');

  function loop() {
    scrollAnimation.forEach(function (element) {
      if (isInView(element)) {
        element.classList.add('is-visible');
      } else {
        element.classList.remove('is-visible');
      }
    });

    scroll(loop);
  }

  loop();
});
