const React = require('react');
const PropTypes = require('prop-types');
const moment = require('moment');

const MonthTable = ({
  activeSelectDate,
  currentDate,
  getDateRangePosition,
  handleDateHover,
  handleDateSelect,
  isInActiveRange,
  minimumDate,
  selectedEndDate,
  selectedStartDate,
  styles
}) => {
  const days = [];
  let startDate = moment.unix(currentDate).startOf('month').startOf('week');
  const endDate = moment.unix(currentDate).endOf('month').endOf('week');

  while (moment(startDate).isBefore(endDate)) {
    const disabledDay = minimumDate && startDate.isBefore(moment.unix(minimumDate));
    const isActiveRange = (selectedStartDate || selectedEndDate) ?
      isInActiveRange(selectedStartDate, selectedEndDate, activeSelectDate, startDate) :
      false;
    const whereInRange = getDateRangePosition(selectedStartDate, selectedEndDate, activeSelectDate, startDate);
    const isSelectedDay = startDate.isSame(moment.unix(selectedStartDate), 'day') || startDate.isSame(moment.unix(selectedEndDate), 'day');

    const day = (
      <div
        key={startDate}
        onClick={!disabledDay && handleDateSelect.bind(null, startDate.unix())}
        onMouseEnter={!disabledDay && handleDateHover.bind(null, startDate.unix())}
        style={Object.assign({},
          styles.calendarDay,
          startDate.isSame(moment.unix(currentDate), 'month') && styles.currentMonth,
          disabledDay && styles.calendarDayDisabled,
          (startDate.isSame(moment(), 'day') && !isActiveRange) && styles.today,
          isActiveRange && Object.assign({}, styles.betweenDay, styles['betweenDay' + whereInRange]),
          isSelectedDay && Object.assign({}, styles.selectedDay, styles['selected' + whereInRange])
        )}
      >
        {startDate.date()}
      </div>
    );

    days.push(day);
    startDate = startDate.add(1, 'd');
  }

  return (<div style={styles.calendarTable}>{days}</div>);
};

MonthTable.propTypes = {
  activeSelectDate: PropTypes.number,
  currentDate: PropTypes.number,
  getDateRangePosition: PropTypes.func,
  handleDateHover: PropTypes.func,
  handleDateSelect: PropTypes.func,
  isInActiveRange: PropTypes.func,
  minimumDate: PropTypes.number,
  selectedEndDate: PropTypes.number,
  selectedStartDate: PropTypes.number,
  styles: PropTypes.object
};

module.exports = MonthTable;
