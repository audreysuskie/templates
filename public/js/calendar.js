let today = new Date();
let calendarShow = 1;

function formatToday(date) {
  var d = new Date(date),
    month = d.getMonth() + 1,
    day = d.getDate(),
    year = d.getFullYear();

  return [month, day, year].join(' ');
}

formatToday(today);

function settingDate(date, day) {
  date = new Date(date);
  date.setDate(day);
  date.setHours(23);
  return date;
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
}

function getDatesBetween(date1, date2) {
  let range1 = new Date(date1);
  let range2 = new Date(date2);
  date1 = settingDate(date1, 31);
  date2 = settingDate(date2, 31);
  let temp;
  let dates = [];
  while (date1 <= date2) {
    if (date1.getDate() != 31) {
      temp = settingDate(date1, 0);
      if (temp >= range1 && temp <= range2) dates.push(temp);
      date1 = settingDate(date1, 31);
    } else {
      temp = new Date(date1);
      if (temp >= range1 && temp <= range2) dates.push(temp);
      date1.setMonth(date1.getMonth() + 1);
    }
  }
  let content =
    '<div class="calendarButtons"><button id="prev" onclick="callprev()" disabled>< Prev</button><button id="next" onclick="callnext()">Next ></button></div>';
  let weekDays = [
    { shortDay: 'Sun', fullDay: 'Sunday' },
    { shortDay: 'Mon', fullDay: 'Monday' },
    { shortDay: 'Tue', fullDay: 'Tuesday' },
    { shortDay: 'Wed', fullDay: 'Wednesday' },
    { shortDay: 'Thu', fullDay: 'Thursday' },
    { shortDay: 'Fri', fullDay: 'Friday' },
    { shortDay: 'Sat', fullDay: 'Saturday' },
  ];

  let LastDate, firstDate;
  for (let i = 0; i < dates.length; i++) {
    LastDate = dates[i];
    firstDate = new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
    firstMonth = getMonthName(i + 1);
    currentDay = firstDate.toString().split(' ')[0];
    currentMonth = firstDate.getMonth() + 1;
    currentYear = firstDate.getFullYear();

    content += '<div id="calendarTable_' + (i + 1) + '" class="calendarDiv">';
    content +=
      '<div class="titleRow">' +
      '<div class="calendarTitle">' +
      firstDate.toLocaleString('en-US', { month: 'long' }) +
      ' ' +
      firstDate.getFullYear() +
      '</div></div>';
    content += '<div class="calendarTable">';
    content += '<div class="thead">';
    weekDays.map((item) => {
      content += '<div class="th">' + item.shortDay + '</div>';
    });
    content += '</div>';
    content += '<div class="tbody">';
    let j = 1;
    let displayNum, idMonth;

    while (j <= LastDate.getDate()) {
      content += '<div class="tr">';

      for (let k = 0; k < 7; k++) {
        displayNum = j;

        if (j === 1) {
          if (firstDate.toString().split(' ')[0] == weekDays[k].shortDay) {
            content +=
              '<div class="td" id="' +
              currentMonth +
              ' ' +
              displayNum +
              ' ' +
              currentYear +
              '" value="' +
              firstDate.toLocaleString('en-US', { month: 'long' }) +
              ' ' +
              displayNum +
              ', ' +
              currentYear +
              '">' +
              displayNum +
              '</div>';
            j++;
          } else {
            content += '<div class="td nohover"></div>';
          }
        } else if (j > LastDate.getDate()) {
          content += '<div class="td nohover"></div>';
        } else {
          content +=
            '<div class="td" id="' +
            currentMonth +
            ' ' +
            displayNum +
            ' ' +
            currentYear +
            '" value="' +
            firstDate.toLocaleString('en-US', { month: 'long' }) +
            ' ' +
            displayNum +
            ', ' +
            currentYear +
            '">' +
            displayNum +
            '</div>';
          j++;
        }
      }
      content += '</div>';
    }

    content += '</div>';
    content += '</div>';
    content += '</div>';
  }
  return content;
}

function callnext() {
  let allmonths = document.getElementsByClassName('calendarDiv');
  document.getElementById('prev').disabled = false;
  calendarShow++;
  if (calendarShow <= allmonths.length) {
    for (let i = 0; i < allmonths.length; i++) {
      allmonths[i].style.display = 'none';
    }
    document.getElementById('calendarTable_' + calendarShow).style.display =
      'block';
    if (calendarShow == allmonths.length) {
      document.getElementById('next').disabled = true;
    }
  }
}

function callprev() {
  let allmonths = document.getElementsByClassName('calendarDiv');
  document.getElementById('next').disabled = false;
  calendarShow--;
  if (calendarShow >= 1) {
    for (let i = 0; i < allmonths.length; i++) {
      allmonths[i].style.display = 'none';
    }
    document.getElementById('calendarTable_' + calendarShow).style.display =
      'block';
    if (calendarShow == 1) {
      document.getElementById('prev').disabled = true;
    }
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}

let content = getDatesBetween(formatDate(today), '2024/01/01');
document.getElementById('calendar').innerHTML = content;

const td = document.getElementById(formatToday(today));
td.classList.add('today');

const booking = document.getElementById('book-date');

$(document).ready(function () {
  $('.td').click(function () {
    $('.td').removeClass('selected');
    booking.value = $(this).attr('value');
    $(this).addClass('selected');
  });
});
