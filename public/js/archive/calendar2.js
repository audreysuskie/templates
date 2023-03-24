let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let monthAndYear = document.getElementById('monthAndYear');
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let calendar = document.querySelector('.calendar-days'); // body of the calendar

  // clearing all previous calendar day cells
  calendar.innerHTML =
    '<div class="calendar-weekday">Sun</div><div class="calendar-weekday">Mon</div><div class="calendar-weekday">Tue</div><div class="calendar-weekday">Wed</div><div class="calendar-weekday">Thu</div><div class="calendar-weekday">Fri</div><div class="calendar-weekday">Sat</div>';

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + ' ' + year;
  calyear = monthAndYear.innerHTML.split(' ')[1];
  calmonth = monthAndYear.innerHTML.split(' ')[0];

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.querySelector('.calendar-days');

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 35; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('div');
        let cellText = document.createTextNode('');
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement('div');
        cell.classList.add('calendar-day');
        cell.setAttribute('value', months[month] + ' ' + date + ', ' + year);
        let cellText = document.createTextNode(date);
        if (date > today.getDate() || month > today.getMonth()) {
          cell.classList.add('available');
        } else if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add('today-bg');
        }
        // color today's date
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }
  }
}

const booking = document.getElementById('book-date');

$(document).ready(function () {
  $('.available').click(function () {
    date = $(this).attr('value');
    thisday =
      months[new Date().getMonth()] +
      ' ' +
      new Date().getDate() +
      ', ' +
      new Date().getFullYear();
    if (date > thisday) {
      $(this).addClass('available');
    }
    $('.calendar-day').removeClass('selected');
    booking.value = $(this).attr('value');
    $(this).addClass('selected');
  });
});
