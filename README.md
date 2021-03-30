# Simple jQuery Calendar Plugin
*A simple jQuery calendar plugin to show the date and stuff*

**Demo** and **Playground** - [calendar.wrick17.com](https://calendar.wrick17.com/)

**Very basic styling included. It is totally upto you to style it.**
*Of course, so that there is almost no conflict with your own styles. The CSS is put mostly for reference*

To initialize it, include jQuery and the calendar.js script file in your HTML.
```
<script src="https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/wrick17/calendar-plugin@master/calendar.min.js"></script>
```
And the CSS for the default styles
```
<link rel="stylesheet" href="/style.css">
```
And the theme CSS for some extra flair
```
<link rel="stylesheet" href="/theme.css">
```
Then call the calendar function on the element inside which you want your calendar pugin to put itself
```
$('.calendar-wrapper').calendar();
```
To use the optional features pass the parameters as options:
```
$('.calendar-wrapper').calendar({
  date: '05/21/2017',
  enableMonthChange: false
});
```
**And you should be up and running. Most of the code is pretty self explanatory.**

To update it, call the updateCalendarOptions function
```
$('.calendar-wrapper').updateCalendarOptions({
  date: '05/11/2017'
});
```

Default options go as below:
```
var options = {
  date: null,
  weekDayLength: 1,
  prevButton: 'Prev',
  nextButton: 'Next',
  monthYearSeparator: ' ',
  onClickDate: function(date){},
  onChangeMonth: function(date){},
  onClickToday: function(date){},
  onClickMonthNext: function(date){},
  onClickMonthPrev: function(date){},
  onClickYearNext: function(date){},
  onClickYearPrev: function(date){},
  onShowYearView: function(date){},
  onSelectYear: function(date){},
  showThreeMonthsInARow: true,
  enableMonthChange: true,
  enableYearView: true,
  showTodayButton: true,
  highlightSelectedWeekday: true,
  highlightSelectedWeek: true,
  todayButtonContent: 'Today',
  showYearDropdown: false,
  min: null,
  max: null,
  disable: function (date) { return false },
}
```

### Options:

Type of each option followed by the description of each of the options...

`date` - **[Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date)** / **String**
> The date that you want to be the highlighted date when the plugin is loaded.


`weekDayLength` - **Number**
> The Number of characters of the week day that you want to show on the header


`prevButton` - **String**
> The content of the previous button in the header to change month or year. You can also put HTML string.


`nextButton` - **String**
> The content of the next button in the header to change month or year. You can also put HTML string.


`monthYearSeparator` - **String**
> The string you want to put in between the month and the year in the month view. You can also put HTML string.


`onClickDate` - **function**
> The function that is called when any date is clicked in the month view. The date is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onClickToday` - **function**
> The function that is called when you click the today button. Today's date is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onChangeMonth` - **function**
> The function that is called when any month is clicked in the year view. The first day of the month is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onClickMonthNext` - **function**
> The function that is called when you click on the next button in the month view. The first day of the next month is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onClickMonthPrev` - **function**
> The function that is called when you click on the previous button in the month view. The first day of the previous month is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onSelectYear` - **function**
> The function that is called when you select a year from the dropdown in the year view header. The first day of the first month of the selected year is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onClickYearNext` - **function**
> The function that is called when you click on the next button in the year view. The first day of the first month of the next year is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onClickYearPrev` - **function**
> The function that is called when you click on the previous button in the year view. The first day of the first month of the previous year is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`onShowYearView` - **function**
> The function that is called when you click on the month header in the month view. The first day of the first month of the current year is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.


`showThreeMonthsInARow` - **Boolean**
> Defaults to **true**. If set to **false**, then months will come four in a row in year view.


`enableMonthChange` - **Boolean**
> Defaults to **true**. If set to **false**, then you won't be able to change either month or year.


`enableYearView` - **Boolean**
> Defaults to **true**. If set to **false**, then you won't be able to go to the year view. You can only change the month using the next or previous buttons in the month view.


`showTodayButton` - **Boolean**
> Defaults to **true**. If set to **false**, then the today button won't be visible.


`highlightSelectedWeekday` - **Boolean**
> Defaults to **true**. When set to **true**, all other dates with the same week-day as the selected date will be highlighted. Note that this feature will only apply to the month that the selected date is a part of.


`highlightSelectedWeek` - **Boolean**
> Defaults to **true**. When set to **true**, then the selected week that contains the selected date will  be highlighted.


`todayButtonContent` - **String**
> The content of the today button at the bottom. You can also put HTML string.


`showYearDropdown` - **Boolean**
> Defaults to **false**. If set to **true**, then you can select the year in a dropdown.


`min` - **[Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date)** / **String**
> The minimum date that can be selected on the calendar


`max` - **[Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date)** / **String**
> The maximum date that can be selected on the calendar


`disable` - **function**
> This function gets called for every date block on the calendar. If this function returns true, the date will be disabled. The date of each block is passed as a parameter to the function as a javascript [Date](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date) object.

Example for disable function
```
$('.calendar-wrapper').updateCalendarOptions({
  date: '05/11/2077',
  disable: function (date) { 
    return date < new Date(); // This will disable all dates before today
  },
});
```

## That's all folks!
