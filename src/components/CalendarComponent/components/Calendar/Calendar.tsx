// general imports
import React, { useState } from 'react';
// hook imports
import { useCalendar } from '../../hooks/useCalendar';
// component imports
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { DayCard } from '../DayCard/DayCard';
import { EventModal } from '../EventModal/EventModal';
// style import
import './Calendar.css';

interface Props {}

export const Calendar = ({}: Props) => {
    // init useCalendar hook (destructured for readability, though it is a lot of lines...)
    const {
        dt,
        currentDay,
        days,
        allMonths,
        selectedMonth,
        setSelectedMonth,
        currentYear,
        maxPastYears,
        maxFutureYears,
        selectedYear,
        setSelectedYear,
        selectedDateDisplay,
        addEvent,
        removeEvent,
        getEventsForDay
    } = useCalendar();

    // the name string of the current month for today
    const currentMonth = allMonths[dt.getMonth()];

    // state used for accessing and populating the EventModal when clicking a DayCard
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    // simple (kind of unnecessary) function used to toggle the visiblity of the EventModal
    // (added to increase readability, at the cost of adding lines)
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            {modalVisible ? (
                <EventModal
                    addEvent={addEvent}
                    date={selectedDate}
                    toggleModal={() => setModalVisible(false)}
                    events={getEventsForDay(selectedDate)}
                    removeEvent={removeEvent}
                />
            ) : null}
            <div className="calendar-main-container">
                <CalendarHeader
                    allMonths={allMonths}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    currentYear={currentYear}
                    maxPastYears={maxPastYears}
                    maxFutureYears={maxFutureYears}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedDateDisplay={selectedDateDisplay}
                />
                <div className="calendar-component-container">
                    {days.map((day, index) => {
                        const isCurrentDay =
                            day.date == currentDay
                                ? day.month == currentMonth
                                    ? true
                                    : false
                                : false;

                        return (
                            <DayCard
                                date={day.date}
                                isPadding={day.isPadding}
                                isFirstDay={day.isFirstDay}
                                month={day.month}
                                isCurrentDay={isCurrentDay}
                                isFirstPastPaddingDay={
                                    day.isFirstPastPaddingDay
                                }
                                fullDate={day.fullDate}
                                setSelectedDate={setSelectedDate}
                                toggleModal={toggleModal}
                                events={day.events}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
