import { useState, useEffect } from 'react';
import {
    getAllMonths,
    getAllYears,
    getDateDisplayString,
    getDayDatasForMonth
} from '../helperFunctions/dates';
import {
    addSingleEventToLocalStorage,
    getAllEventsForGivenDate,
    removeSingleEventFromLocalStorage
} from '../helperFunctions/events';

export const useCalendar: UseCalendar = () => {
    // initialize new Date object
    const dt = new Date();

    // set year range constants
    const maxPastYears = 3;
    const maxFutureYears = 3;

    // get current year, month, day
    const currentYear: number = dt.getFullYear();
    const currentMonth: number = dt.getMonth();
    const currentDay: number = dt.getDate();

    // create state for year, month, day
    // and initialize with above current data
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedDay, setSelectedDay] = useState(currentDay);

    // get lists of month names and range of years
    //  ( -{maxPastYears} / +{maxFutureYears} from {currentYear} )
    const allMonths: string[] = getAllMonths();
    const allYears: number[] = getAllYears(
        currentYear,
        maxPastYears,
        maxFutureYears
    );

    // string to display in CalendarHeader component, e.g. "August 2021"
    const [selectedDateDisplay, setDateDisplay] = useState('');

    // data for each day in current calendar view (month + paddingDays)
    const [days, setDays] = useState([] as DayData[]);

    // update state data on {selectedMonth} and {selectedYear} changes
    useEffect(() => {
        // set dayDatas for {selectedMonth} of {selectedYear}
        const calendarDays: DayData[] = getDayDatasForMonth(
            selectedMonth,
            selectedYear
        );
        setDays(calendarDays);
        // set dateDisplay string
        const dateString = getDateDisplayString(selectedMonth, selectedYear);
        setDateDisplay(dateString);
    }, [selectedMonth, selectedYear]);

    // CRUD-ish operations for EventData in state and local storage

    const addEvent: AddEvent = (event) => {
        try {
            let dayData = days.filter((obj) => obj.fullDate === event.date);
            if (dayData.length > 0) {
                dayData[0].events?.push(event);
                addSingleEventToLocalStorage(event);
            } else {
                throw new Error(
                    'somehow there are multiple entries for this single day'
                );
            }
        } catch (error) {
            console.log(error);
            return;
        }
    };

    const removeEvent: RemoveEvent = (event) => {
        try {
            let dayData = days.filter((obj) => obj.fullDate === event.date);
            if (dayData.length > 0) {
                let indexOfEventToRemove = dayData[0].events?.findIndex(
                    (obj) => obj.eventName === event.eventName
                );
                if (
                    indexOfEventToRemove != undefined &&
                    indexOfEventToRemove != -1
                ) {
                    dayData[0].events?.splice(indexOfEventToRemove, 1);
                    removeSingleEventFromLocalStorage(event);
                }
            }
        } catch (error) {
            console.log(error);
            return;
        }
    };

    const getEventsForDay: GetEventsForDay = (date) => {
        let results = getAllEventsForGivenDate(date);
        if (results !== undefined) {
            // something exists
            if (results.length > 0) {
                // something exists
                return results;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    };

    return {
        dt,
        allMonths,
        allYears,
        maxPastYears,
        maxFutureYears,
        currentYear,
        currentMonth,
        currentDay,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        selectedDay,
        setSelectedDay,
        days,
        selectedDateDisplay,
        addEvent,
        removeEvent,
        getEventsForDay
    };
};
