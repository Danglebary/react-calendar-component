import { getAllEventsForGivenDate, getAllLocalStorageEvents } from './events';

const getAllWeekdays: GetAllWeekdays = () => {
    const weekdays = [
        'sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    return weekdays;
};

const getWeekday: GetWeekday = (index, weekdays?) => {
    // if weekdays array is supplied, skip unnecessary function call
    if (weekdays) {
        const day = weekdays[index];
        return day;
    } else {
        const allDays = getAllWeekdays();
        const day = allDays[index];
        return day;
    }
};

export const getAllMonths: GetAllMonths = () => {
    const months = [
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
        'December'
    ];
    return months;
};
const getMonth: GetMonth = (index, months?) => {
    // if months array is supplied, skip unnecessary function call
    if (months) {
        const month = months[index];
        return month;
    } else {
        const months = getAllMonths();
        const month = months[index];
        return month;
    }
};

export const getAllYears: GetAllYears = (
    year,
    maxPastYears,
    maxFutureYears
) => {
    const pastYear = year - maxPastYears;
    const futureYear = year + maxFutureYears;
    const allYears: number[] = [];
    for (let year = pastYear; year < futureYear; year++) {
        allYears.push(year);
    }
    return allYears;
};

export const getNumDaysInMonth: GetNumDaysInMonth = (month, year) => {
    // add 1 to month index to get the next month,
    // then use 0 as the day index to get the last date of the month
    const numDays: number = new Date(year, month + 1, 0).getDate();
    return numDays;
};

export const getNumPastPaddingDays: GetNumPastPaddingDays = (month, year) => {
    const weekdays = getAllWeekdays();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const dayName = getWeekday(firstDayOfMonth, weekdays);
    const numDays = weekdays.indexOf(dayName);
    return numDays;
};

export const getNumFuturePaddingDays: GetNumFuturePaddingDays = (
    month,
    year
) => {
    const weekdays = getAllWeekdays();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const dayName = getWeekday(lastDayOfMonth, weekdays);
    const numDays = weekdays.length - 1 - weekdays.indexOf(dayName);
    return numDays;
};

export const getDateDisplayString: GetDateDisplayString = (month, year) => {
    const monthName = getMonth(month);
    const dateString = `${monthName} ${year}`;
    return dateString;
};

export const getDayDatasForMonth: GetDayDatasForMonth = (month, year) => {
    const daysInMonth = getNumDaysInMonth(month, year);
    let pastPaddingDays = getNumPastPaddingDays(month, year);
    let futurePaddingDays = getNumFuturePaddingDays(month, year);

    const initAllDays = pastPaddingDays + daysInMonth + futurePaddingDays;
    const numExtraDays = 42 - initAllDays;

    const events = getAllLocalStorageEvents();

    if (numExtraDays !== 0) {
        if (pastPaddingDays > futurePaddingDays) {
            futurePaddingDays += numExtraDays;
        } else {
            pastPaddingDays += numExtraDays;
        }
    }

    const dayDatas: DayData[] = [];
    for (
        let i = 0;
        i < pastPaddingDays + daysInMonth + futurePaddingDays;
        i++
    ) {
        const dt = new Date(year, month, i + 1 - pastPaddingDays);
        const date: number = dt.getDate();
        let isFirstDay = false;
        let isFirstPastPaddingDay = false;
        if (date == 1) {
            isFirstDay = true;
        }
        if (pastPaddingDays !== 0 && i == 0) {
            isFirstPastPaddingDay = true;
        }
        const dow: number = dt.getDay();
        const dayName: string = getWeekday(dow);
        const monthName = dt.toLocaleString('default', { month: 'long' });
        const isPadding = dt.getMonth() !== month;

        const dayEvents = getAllEventsForGivenDate(dt.toDateString());

        const dayData: DayData = {
            fullDate: dt.toDateString(),
            month: monthName,
            date: date,
            dayName: dayName,
            isPadding: isPadding,
            isFirstDay: isFirstDay,
            isFirstPastPaddingDay: isFirstPastPaddingDay,
            events: dayEvents
        };
        dayDatas.push(dayData);
    }
    return dayDatas;
};
