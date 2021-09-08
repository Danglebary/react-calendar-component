import React from 'react';

import './EventEntry.css';

interface Props {
    event: { date: string; eventName: string };
    removeEvent: (event: { date: string; eventName: string }) => void;
    toggleModal: () => void;
}

export const EventEntry = ({ event, removeEvent, toggleModal }: Props) => {
    // simple function used to call removeEvent from useCalendar, closing the EventModal afterwards.
    // this solution does not reflect changes immediately to the user, this is why the modal is closed,
    // to prevent the user from still seeing a removed Event after removing it.
    // this functionality should be extended to account for that situation,
    // but is out of the current scope (for me right now at least...)
    const handleClick = () => {
        removeEvent(event);
        toggleModal();
    };

    return (
        <div className="event-entry-container">
            <div className="event-icon">•</div>
            <div className="event-name">{event.eventName}</div>
            <div className="remove-event-icon" onClick={handleClick}>
                ⨯
            </div>
        </div>
    );
};
