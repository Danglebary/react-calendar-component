// general imports
import React, { Dispatch, SetStateAction } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
// style import
import './MonthPicker.css';

interface Props {
    allMonths: string[];
    selectedMonth: number;
    setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

export const MonthPicker = ({
    allMonths,
    selectedMonth,
    setSelectedMonth
}: Props) => {
    // simple function to step forwards through allMonths array to update selectedMonth
    const increment = () => {
        const nextMonth = selectedMonth == 11 ? 0 : selectedMonth + 1;
        setSelectedMonth(nextMonth);
    };
    // simple function to step backwards through allMonths array to update selectedMonth
    const decrement = () => {
        const prevMonth = selectedMonth == 0 ? 11 : selectedMonth - 1;
        setSelectedMonth(prevMonth);
    };

    return (
        <div className="month-picker-container">
            <button className="month-picker-button" onClick={decrement}>
                {'<'}
            </button>
            <h3 className="month-picker-display">
                {allMonths[selectedMonth].slice(0, 3)}
            </h3>
            <button className="month-picker-button" onClick={increment}>
                {'>'}
            </button>
        </div>
    );
};
