(function($) {
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

  function renderToDom(monthData, currentDate) {
    var calanderDump = '';

    calanderDump += '<div class="calander-box">';

    monthData.forEach(function(week, weekNo) {
      calanderDump += '<div class="week" data-week-no="'+ weekNo +'">';

        week.forEach(function(day, dayNo) {
          calanderDump += '<div class="day" data-day="'+ day +'">'+ day.getDate() +'</div>';
        });

      calanderDump += '</div>';
    });

    calanderDump += '</div>';

    return calanderDump;
  }

  $.fn.calander = function(options) {
    // These are the defaults.
    var settings = $.extend({
        color: '#fd6721',
        disabledColor: '#dadada',
        backgroundColor: '#fff',
        backgroundGray: '#f7f7f7',
        date: '2017-02-01T00:00:00+05:30'
    }, options );

    $(this).append('<div>Oh Yeah Baby the plugin is working</div>');

    var currentDate = new Date(settings.date);

    console.log('current date', currentDate);

    var day = currentDate.getDay();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();

    var monthData = generateMonthData(currentDate);

    $('.calander-wrapper').html(renderToDom(monthData, currentDate));

    return this;
  }
} (jQuery) );
