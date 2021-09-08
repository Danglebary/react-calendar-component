// general imports
import React from 'react';
// style import
import './DayCard.css';

interface Props {
    month: string;
    date: number;
    isPadding: boolean;
    isFirstDay: boolean;
    isCurrentDay: boolean;
    isFirstPastPaddingDay: boolean;
    fullDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    toggleModal: () => void;
    events?: { date: string; eventName: string }[];
}

export const DayCard = ({
    month,
    date,
    isPadding,
    isFirstDay,
    isCurrentDay,
    isFirstPastPaddingDay,
    fullDate,
    events,
    setSelectedDate,
    toggleModal
}: Props) => {
    // simple function used to populate and open EventModal with selectedDate data
    const handleClick = () => {
        setSelectedDate(fullDate);
        toggleModal();
    };

    // really ugly-looking way of choosing styles based on if the DayCard represents
    // a padding day, the current day, or just a normal day of the selectedMonth
    const className = isPadding
        ? isCurrentDay
            ? 'day-card-container day-card-padding-day day-card-current-day'
            : 'day-card-container day-card-padding-day'
        : isCurrentDay
        ? 'day-card-container day-card-current-day'
        : 'day-card-container';

    return (
        <div className={className} onClick={handleClick}>
            <div
                className={
                    isPadding
                        ? 'day-card-header'
                        : 'day-card-header day-card-header-border'
                }
            >
                {isFirstDay ? (
                    <div className="day-card-month-label">
                        {month.slice(0, 3)}
                    </div>
                ) : null}
                {isFirstPastPaddingDay ? (
                    <div className="day-card-month-label">
                        {month.slice(0, 3)}
                    </div>
                ) : null}
                <div className="day-card-label">{date}</div>
            </div>
            <div className="day-card-events-container">
                {!events
                    ? null
                    : events.map((_, index) => {
                          return (
                              <div className="day-card-event-icon" key={index}>
                                  •
                              </div>
                          );
                      })}
            </div>
        </div>
    );
};
