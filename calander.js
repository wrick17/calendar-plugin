(function($) {

  var settings, el;

  var month = {
    1: 'january',
    2: 'february',
    3: 'march',
    4: 'april',
    5: 'may',
    6: 'june',
    7: 'july',
    8: 'august',
    9: 'sepetember',
    10: 'october',
    11: 'november',
    12: 'december'
  };

  var day = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  };

  function getFirstDayOfMonth(currentDate) {
    var thisDate = currentDate.getMonth() + 1 + ' 1 ' + currentDate.getFullYear();
    return new Date(thisDate);
  }

  function getLastDayOfMonth(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }

  function getLastMonthLastDay(currentDate) {
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    if (month === 0) {
      year -= 1;
      month = 12;
    }
    return new Date(year, month, 0);
  }

  function generateWeekData(currentDate, weekNo) {
    var firstDay = getFirstDayOfMonth(currentDate).getDate();
    var lastDay = getLastDayOfMonth(currentDate).getDate();
    var lastDayFromLastMonth = getLastMonthLastDay(currentDate).getDate();
    var days = [];

    var weekDay = currentDate.getDay();
    var daysFromLastMonth = (weekDay);
    var daysFromNextMonth = 1;

    if (weekDay === 0) daysFromLastMonth = 0;

    if (weekNo === 1) {
      for (var dayFromLastMonth = (daysFromLastMonth-1); dayFromLastMonth >= 0; dayFromLastMonth--) {
        if (currentDate.getMonth())
        var dateObj = new Date((currentDate.getFullYear()), (currentDate.getMonth() - 1), (lastDayFromLastMonth - dayFromLastMonth) );
        days.push(dateObj);
        // days.push({
        //   date: lastDayFromLastMonth - dayFromLastMonth,
        //   month: -1
        // });
      }
      var daysLength = 7 - days.length;
      for (var monthDate = 0; monthDate < daysLength; monthDate++) {
        var dateObj = new Date((currentDate.getFullYear()), (currentDate.getMonth()), (firstDay + monthDate) );
        days.push(dateObj);
        // days.push({
        //   date: firstDay + monthDate,
        //   month: 0
        // });
      }
    } else {
      var startWeekFrom = (weekNo * 7) - daysFromLastMonth;
      for (var i = 1; i <= 7; i++) {
        if ((startWeekFrom + i) <= lastDay) {
          var dateObj = new Date((currentDate.getFullYear()), (currentDate.getMonth()), (startWeekFrom + i) );
          days.push(dateObj);
          // days.push({
          //   date: startWeekFrom + i,
          //   month: 0
          // });
        } else {
          var dateObj = new Date((currentDate.getFullYear()), (currentDate.getMonth() + 1), (daysFromNextMonth++) );
          days.push(dateObj);
          // days.push({
          //   date: daysFromNextMonth++,
          //   month: 1
          // });
        }
      }
    }
    // console.log(days);
    return days;
  }

  function generateMonthData(currentDate) {
    var firstDay = getFirstDayOfMonth(currentDate);
    var lastMonthLast = getLastDayOfMonth(currentDate).getDate();
    var lastDayFromMonth = getLastDayOfMonth(currentDate).getDate();
    var weeks = parseInt(lastMonthLast / 7);

    var monthData = [];
    for (var weekNo = 1; weekNo <= weeks; weekNo++) {
      monthData.push(generateWeekData(currentDate, weekNo));
    }
    var lastBlock = monthData[monthData.length - 1];
    if (lastBlock[lastBlock.length - 1].date < lastDayFromMonth) {
      monthData.push(generateWeekData(currentDate, weekNo));
    }
    return monthData;
  }

  function generateDomString(monthData, currentDate) {
    var calanderDump = '';

    calanderDump += '<div class="calander-box">';

      calanderDump += '<button class="prev-button">Prev</button><span class="month-container"><span class="month">'+ month[(currentDate.getMonth() + 1)] +'</span><span class="year">'+ currentDate.getFullYear() +'</span></span><button class="next-button">Next</button>'

      calanderDump += '<div class="weeks-wrapper header">';
        calanderDump += '<div class="week" data-week-no="'+ 0 +'">';

        for (var weekDay in day) {
          if (day.hasOwnProperty(weekDay)) {
            calanderDump += '<div class="day header" data-day="'+ weekDay +'">'+ day[weekDay].substring(0, settings.weekDayLength) +'</div>';
          }
        }

        calanderDump += '</div>';
      calanderDump += '</div>';

      calanderDump += '<div class="weeks-wrapper">';
      monthData.forEach(function(week, weekNo) {
        calanderDump += '<div class="week" data-week-no="'+ weekNo+1 +'">';

          week.forEach(function(day, dayNo) {
            var disabled = false;
            if (day.getMonth() !== currentDate.getMonth()) disabled = true;
            disabled = disabled ? 'disabled' : '';

            var highlight = false;
            if (day.getDay() === currentDate.getDay()) highlight = true;
            highlight = highlight ? 'highlight' : '';

            var current = false;
            if (day == currentDate.toString()) current = true;
            current = current ? 'current' : '';

            calanderDump += '<div class="day '+ highlight +' '+ disabled +' '+ current +'" data-day="'+ day +'">'+ day.getDate() +'</div>';
          });

        calanderDump += '</div>';
      });
      calanderDump += '</div>';

    calanderDump += '</div>';

    return calanderDump;
  }

  function renderToDom(currentDate) {

    var monthData = generateMonthData(currentDate);

    el.html(generateDomString(monthData, currentDate));

  }

  $.fn.calander = function(options) {
    // These are the defaults.
    settings = $.extend({
        date: '2017-02-01T00:00:00+05:30',
        weekDayLength: 1
    }, options );

    el = $(this);

    var currentDate = new Date(settings.date);

    // console.log('current date', currentDate);

    renderToDom(currentDate);

    $('body').off('click', '.prev-button').on('click', '.prev-button', function(e) {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      // console.log(currentDate);
      renderToDom(currentDate);
    });

    $('body').off('click', '.next-button').on('click', '.next-button', function(e) {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      // console.log(currentDate);
      renderToDom(currentDate);
    });

    $('body').off('click', '.day').on('click', '.day', function(e) {
      var date = $(this).data('day');
      console.log(date);
    });

    return this;
  }
} (jQuery) );
