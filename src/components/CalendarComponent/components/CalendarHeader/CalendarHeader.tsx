// general imports
import React from 'react';
// hook imports
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarWeekdays } from '../CalendarWeekdays/CalendarWeekdays';
// component imports
import { MonthPicker } from '../MonthPicker/MonthPicker';
import { YearPicker } from '../YearPicker/YearPicker';
// style import
import './CalendarHeader.css';

interface Props {
    allMonths: string[];
    selectedMonth: number;
    setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
    currentYear: number;
    maxPastYears: number;
    maxFutureYears: number;
    selectedYear: number;
    setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
    selectedDateDisplay: string;
}

export const CalendarHeader = ({
    allMonths,
    selectedMonth,
    setSelectedMonth,
    currentYear,
    maxPastYears,
    maxFutureYears,
    selectedYear,
    setSelectedYear,
    selectedDateDisplay
}: Props) => {
    return (
        <div className="calendar-header-container">
            <div className="extras-container">
                <div className="header-date-display">{selectedDateDisplay}</div>
                <div className="pickers-container">
                    <MonthPicker
                        allMonths={allMonths}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                    />
                    <YearPicker
                        currentYear={currentYear}
                        maxPastYears={maxPastYears}
                        maxFutureYears={maxFutureYears}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                    />
                </div>
            </div>
            <CalendarWeekdays />
        </div>
    );
};
