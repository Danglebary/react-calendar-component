import React, { useState } from 'react';
import { EventEntry } from '../EventEntry/EventEntry';
import { NewEventForm } from '../NewEventForm/NewEventForm';

import './EventModal.css';

interface Props {
    addEvent: (event: { date: string; eventName: string }) => void;
    date: string;
    toggleModal: () => void;
    events?: { date: string; eventName: string }[];
    removeEvent: (event: { date: string; eventName: string }) => void;
}

export const EventModal = ({
    addEvent,
    removeEvent,
    date,
    toggleModal,
    events
}: Props) => {
    // simple state used to toggle between showing/hiding the NewEventForm
    const [newEventOpen, setNewEventOpen] = useState(false);

    // simple (kind of unnecessary) function used to toggle the visiblity of the NewEventForm
    const toggleEventOpen = () => {
        setNewEventOpen(!newEventOpen);
    };

    // dateString to show on EventModal for selectedDate
    const dateStringArray = date.split(' ');
    const dateString = dateStringArray[1] + ' ' + dateStringArray[2];

    return (
        <>
            <div className="wrapper" onClick={toggleModal} />
            <div className="event-modal-container">
                <div className="event-modal-header">
                    <div className="event-modal-date">{dateString}</div>
                    <div
                        className="event-modal-close-button"
                        onClick={toggleModal}
                    >
                        Close
                    </div>
                </div>
                <div className="event-modal-content-container">
                    {newEventOpen ? (
                        <NewEventForm
                            toggleModal={toggleModal}
                            addEvent={addEvent}
                            removeEvent={removeEvent}
                            date={date}
                        />
                    ) : (
                        <div className="event-modal-events-container">
                            {!events
                                ? null
                                : events.map((event, index) => {
                                      return (
                                          <EventEntry
                                              event={event}
                                              removeEvent={removeEvent}
                                              toggleModal={toggleModal}
                                              key={index}
                                          />
                                      );
                                  })}
                        </div>
                    )}
                    <div className="add-event-button" onClick={toggleEventOpen}>
                        {newEventOpen ? 'Back' : 'New event'}
                    </div>
                </div>
            </div>
        </>
    );
};
