$(document).ready(function () {
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
