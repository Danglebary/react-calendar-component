// OBJECTS AND CONSTANTS TYPES
/**
 * Return object type for the React Hook "useCalendar"
 */
type UseCalendarReturnType = {
    /**
     * The DateTime of the current day
     */
    dt: Date;
    /**
     * An array of all 12 month names as strings
     */
    allMonths: string[];
    /**
     * An array for a given range of years pre and post current year
     */
    allYears: number[];
    /**
     * Parameter used to calculate range of years, this is the maximum years previous to
     * the current year that will be added to the "allYears" array
     */
    maxPastYears: number;
    /**
     * Parameter used to calculate range of years, this is the maximum years future to
     * the current year that will be added to the "allYears" array
     */
    maxFutureYears: number;
    /**
     * Constant four-digit int value of the current year
     */
    currentYear: number;
    /**
     * Constant int value of the current month, ie [0] = "January", [1] = "February", etc...
     */
    currentMonth: number;
    /**
     * Constant int value of the current date in month of year
     */
    currentDay: number;
    /**
     * Int value of the currently selected month, ie [0] = "January", [1] = "February", etc...
     */
    selectedMonth: number;
    /**
     * React SetStateAction used to update the currently selected month value
     */
    setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
    /**
     * Four-digit int value of the currently selected year
     */
    selectedYear: number;
    /**
     * React SetStateAction used to update the currently selected year value
     */
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
    /**
     * Array of dayData objects used by the calendar view
     */
    days: DayData[];
    /**
     * String representation of the currently selected month and year, ie. "August 2021"
     */
    selectedDateDisplay: string;
    /**
     * Function used to add event to dayDatas and localstorage
     */
    addEvent: AddEvent;
    /**
     * Function used to remove event from dayDatas and localstorage
     */
    removeEvent: RemoveEvent;
    /**
     * Function returning all events for a give day
     */
    getEventsForDay: GetEventsForDay;
};

// FUNCTION TYPES
/**
 * Function used to add a new Event object to both application state and local storage
 * @param event: The Event object to be added
 */
type AddEvent = (event: EventData) => void;

/**
 * Function used to remove a given Event object from both application state and local storage
 * @param event: The Event object to be removed
 */
type RemoveEvent = (event: EventData) => void;

/**
 * Function returning an array of Event object for a given day, or undefined if no Event objects
 * exist for given day
 * @param date: String representation of the full date (weekday/month/date/year) (Date.toDateString())
 */
type GetEventsForDay = (date: string) => EventData[] | undefined;

/**
 * React hook function returning all necessary data and functions for a calendar component
 */
type UseCalendar = () => UseCalendarReturnType;
