// OBJECT TYPES
type DayData = {
    /**
     * String representation of the full date (weekday/month/date/year) (Date.toDateString())
     */
    fullDate: string;
    /**
     * The string name of the month, for given day
     */
    month: string;
    /**
     * The date number of the given day
     */
    date: number;
    /**
     * The string name of the given day
     */
    dayName: string;
    /**
     * Boolean representing if this day exists in the selected month,
     * or if it is only added as padding for the calendar view
     */
    isPadding: boolean;
    /**
     * Boolean representing if this day is the first day of the month
     */
    isFirstDay: boolean;
    /**
     * Boolean representing if this day is the first padding day of the calendar
     * (only for past padding days)
     */
    isFirstPastPaddingDay: boolean;
    /**
     * Array of event objects for given day
     */
    events?: EventData[];
};

// FUNCTION TYPES

/**
 * Function returning an array of all weekday names, ie [0] = "Sunday", [1] = "Monday", etc...
 */
type GetAllWeekdays = () => string[];

/**
 * Function returning the weekday name of a day by index
 * @param index index of day-of-week, ie [0] = "Sunday", [1] = "Monday", etc...
 * @param weekdays optional param, used if a function has already called
 * the "getAllWeekdays" function, saving an unnecessary exta call
 */
type GetWeekday = (index: number, weekdays?: string[]) => string;

/**
 * Function returning an array of calendar month names, ie [0] = "January", [1] = "February", etc...
 */
type GetAllMonths = () => string[];

/**
 * Function returning the month name of a month by index
 * @param index index of month-of-year, ie [0] = "January", [1] = "February", etc...
 * @param months optional param, used if a function has already called
 * the "getAllMonths" function, saving an unnecessary extra call
 */
type GetMonth = (index: number, months?: string[]) => string;

/**
 * Function returning an array of years in range :
 * (year - maxPastYears) -> (year + maxFutureYears)
 * @param year mid-point year for range to be based on
 * @param maxPastYears maximum number of years previous to mid-point year
 * @param maxFutureYears maximum number of years future to mid-point year
 */
type GetAllYears = (
    year: number,
    maxPastYears: number,
    maxFutureYears: number
) => number[];

/**
 * Function returning total number of days in month of year
 * @param month number index of month of calendar, ie [0] = "January", [1] = "February", etc...
 * @param year four-digit integer representation of a year
 */
type GetNumDaysInMonth = (month: number, year: number) => number;

/**
 * Function returning total number of days preceeding the first day of month of year,
 * if the first day of the month is not sunday
 * @param month number index of month of calendar, ie [0] = "January", [1] = "February", etc...
 * @param year four-digit integer representation of a year
 */
type GetNumPastPaddingDays = (month: number, year: number) => number;

/**
 * Function returning total number of days proceeding the last day of month of year,
 * if the last day of the month is not saturday
 * @param month number index of month of calendar, ie [0] = "January", [1] = "February", etc...
 * @param year four-digit integer representation of a year
 */
type GetNumFuturePaddingDays = (month: number, year: number) => number;

/**
 * Function returning a string representation of the month of year
 * i.e "August 2021"
 * @param month number index of month of calendar, ie [0] = "January", [1] = "February", etc...
 * @param year four-digit integer representation of a year
 */
type GetDateDisplayString = (month: number, year: number) => string;

/**
 * Function returning an Array of dayData objects for month in year,
 * including past and future padding days (days from previous and next month,
 * if first day of month is not sunday, and last day of month is not saturday,
 * used for calendar view)
 * @param month number index of month of calendar, ie [0] = "January", [1] = "February", etc...
 * @param year four-digit integer representation of a year
 */
type GetDayDatasForMonth = (month: number, year: number) => DayData[];
