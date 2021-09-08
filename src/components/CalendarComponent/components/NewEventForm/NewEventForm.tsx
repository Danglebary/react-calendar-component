import React from 'react';
import { useFormik } from 'formik';

import './NewEventForm.css';

interface Props {
    toggleModal: () => void;
    addEvent: (event: { date: string; eventName: string }) => void;
    date: string;
    removeEvent: (event: { date: string; eventName: string }) => void;
}

export const NewEventForm = ({ addEvent, date, toggleModal }: Props) => {
    // init formik (used formik as it felt unnecessary to create my own solution for simplifying forms)
    const formik = useFormik({
        initialValues: {
            eventName: ''
        },
        onSubmit: (values) => {
            addEvent({ date: date, eventName: values.eventName });
            toggleModal();
        }
    });

    return (
        <div className="new-event-form-container">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="eventName">Event name:</label>
                <input
                    id="eventName"
                    name="eventName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.eventName}
                />
            </form>
        </div>
    );
};
