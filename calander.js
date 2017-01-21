(function($) {

  var settings, el, selectedDate;

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
    var firstDay = getFirstDayOfMonth(currentDate);
    var firstDayDate = firstDay.getDate();
    var lastDay = getLastDayOfMonth(currentDate);
    var lastDayDate = lastDay.getDate();
    var lastDayFromLastMonth = getLastMonthLastDay(currentDate).getDate();
    var days = [];

    var weekDay = firstDay.getDay();
    var daysFromLastMonth = (weekDay);
    var daysFromNextMonth = 1;

    if (weekDay === 0) daysFromLastMonth = 0;

    if (weekNo === 1) {

      for (var dayFromLastMonth = (daysFromLastMonth-1); dayFromLastMonth >= 0; dayFromLastMonth--) {
        if (currentDate.getMonth())
        var dateObj = new Date((currentDate.getFullYear()), (currentDate.getMonth() - 1), (lastDayFromLastMonth - dayFromLastMonth) );
        days.push(dateObj);
      }

      var daysLength = 7 - days.length;
      for (var monthDate = 0; monthDate < daysLength; monthDate++) {
        var dateObj = new Date((firstDay.getFullYear()), (firstDay.getMonth()), (firstDayDate + monthDate) );
        days.push(dateObj);
      }

    } else {

      var startWeekFrom = (weekNo * 7) - daysFromLastMonth;
      for (var i = 1; i <= 7; i++) {

        if ((startWeekFrom + i) <= lastDay) {
          var dateObj = new Date((currentDate.getFullYear()), (currentDate.getMonth()), (startWeekFrom + i) );
          days.push(dateObj);

        } else {

          var dateObj = new Date((currentDate.getFullYear()), (currentDate.getMonth() + 1), (daysFromNextMonth++) );
          days.push(dateObj);
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

  function generateMonthHeaderDOM(currentDate) {
    return ''+
      '<div class="buttons-container">'+
        '<button class="prev-button">'+ settings.prevButton +'</button>'+
        '<span class="month-container">'+
          '<span class="month">'+
            month[(currentDate.getMonth() + 1)] +
          '</span>'+
          settings.monthYearSeparator+
          '<span class="year">'+
          currentDate.getFullYear() +
          '</span>'+
        '</span>'+
        '<button class="next-button">'+ settings.nextButton +'</button>'+
      '</div>';
  }

  function generateWeekHeaderDOM(currentDate) {
    var str = '';
    str += '<div class="weeks-wrapper header">';
      str += '<div class="week" data-week-no="'+ 0 +'">';

      for (var weekDay in day) {
        if (day.hasOwnProperty(weekDay)) {
          str += '<div class="day header" data-day="'+ weekDay +'">'+ day[weekDay].substring(0, settings.weekDayLength) +'</div>';
        }
      }

      str += '</div>';
    str += '</div>';
    return str;
  }

  function generateWeekDOM(monthData, currentDate) {
    var str = '';
    str += '<div class="weeks-wrapper">';

    monthData.forEach(function(week, weekNo) {
      str += '<div class="week" data-week-no="'+ (weekNo+1) +'">';

        week.forEach(function(day, dayNo) {
          var disabled = false;
          if (day.getMonth() !== currentDate.getMonth()) disabled = true;
          disabled = disabled ? 'disabled' : '';

          // var highlight = false;
          // if (day.getDay() === selectedDate.getDay() && day.getMonth() === selectedDate.getMonth() && day.getFullYear() === selectedDate.getFullYear()) highlight = true;
          // highlight = highlight ? 'highlight' : '';

          var selected = false;
          if (day == selectedDate.toString()) selected = true;
          selected = selected ? 'selected' : '';

          var today = false;
          var todayDate = new Date();
          todayDate.setHours(0,0,0,0);
          if (day == todayDate.toString()) today = true;
          today = today ? 'today' : '';

          str += '<div class="day '+ disabled +' '+ selected +' '+ today +'" data-date="'+ day +'">'+ day.getDate() +'</div>';
        });

      str += '</div>';
    });
    str += '</div>';
    return str;
  }

  function generateDomString(monthData, currentDate) {
    var calanderDump = '';

    calanderDump += '<div class="calander-box">';

      calanderDump += generateMonthHeaderDOM(currentDate);

      calanderDump += generateWeekHeaderDOM(currentDate);

      calanderDump += generateWeekDOM(monthData, currentDate);

    calanderDump += '</div>';

    return calanderDump;
  }

  function highlightDays() {
    var selectedElement = el.find('.selected');

    if (selectedElement.length > 0) {
      var date = new Date(selectedElement.data('date'));
      var weekDayNo = date.getDay();

      // console.log(weekDayNo);

      el.find('.week').each(function(i, elm) {
        $(elm).find('.day:eq('+(weekDayNo - 0)+')').addClass('highlight');
      });
    }
  }

  function renderToDom(currentDate) {

    var monthData = generateMonthData(currentDate);

    el.html(generateDomString(monthData, currentDate));

    highlightDays();

  }

  $.fn.calander = function(options) {
    // These are the defaults.
    settings = $.extend({
        date: '2017-02-21T00:00:00+05:30',
        weekDayLength: 1,
        prevButton: '<',
        nextButton: '>',
        monthYearSeparator: ' ',
        onClickDate: function(){} 
    }, options );

    el = $(this);

    selectedDate = new Date(settings.date);
    var currentDate = selectedDate;

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
      var date = $(this).data('date');
      settings.onClickDate(date);
    });

    return this;
  }
} (jQuery) );
