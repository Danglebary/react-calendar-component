// general imports
import React, { Dispatch, SetStateAction } from 'react';
// hook imports
import { useCalendar } from '../../hooks/useCalendar';
// style import
import './YearPicker.css';

interface Props {
    currentYear: number;
    maxPastYears: number;
    maxFutureYears: number;
    selectedYear: number;
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}

export const YearPicker = ({
    currentYear,
    maxPastYears,
    maxFutureYears,
    selectedYear,
    setSelectedYear
}: Props) => {
    // simple function to step forwards through the given range of years to update selectedYear
    const increment = () => {
        const nextYear =
            selectedYear + 1 > currentYear + maxFutureYears
                ? currentYear - maxPastYears
                : selectedYear + 1;
        setSelectedYear(nextYear);
    };
    // simple function to step backwards through the given range of years to update selectedYear
    const decrement = () => {
        const prevYear =
            selectedYear - 1 < currentYear - maxPastYears
                ? currentYear + maxFutureYears
                : selectedYear - 1;
        setSelectedYear(prevYear);
    };

    return (
        <div className="year-picker-container">
            <button className="year-picker-button" onClick={decrement}>
                {'<'}
            </button>
            <h3 className="year-picker-display">{selectedYear}</h3>
            <button className="year-picker-button" onClick={increment}>
                {'>'}
            </button>
        </div>
    );
};
