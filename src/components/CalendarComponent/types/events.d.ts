// OBJECT TYPES

type EventData = {
    /**
     * String representation of the full date (weekday/month/date/year)
     */
    date: string;
    /**
     * String used as title of an event
     */
    eventName: string;
};

/**
 * Function returning an array containing all Event objects saved in local storage
 * Returns undefined if no ('events') key found in local storage
 */
type GetAllLocalStorageEvents = () => EventData[] | undefined;

/**
 * Function returning an array containing all Event objects saved in local storage that
 * match the given date string (weekday/month/date/year)
 * Returns undefined if no ('events') key found in local storage,
 * or if no Events were found matching the given date
 * @param date: String representation of a date, in format (weekday/month/date/year) (Date.toDateString())
 */
type GetAllEventsForGivenDate = (date: string) => EventData[] | undefined;

/**
 * Function used to add a given Event object to the array of Events held in local storage
 * @param event: EventData{date: string (Date.toDateString()), eventName: string (basically the title)}
 */
type AddSingleEventToLocalStorage = (event: EventData) => void;

/**
 * Function used to remove an existing Event object from the array of Events held in local storage,
 * and replace it with a new Event object
 * @param oldEvent: The Event object to be replaced in local storage
 * @param newEvent: The Event object that will be replacing the given event in local storage
 */
type UpdateSingleLocalStorageEvent = (
    oldEvent: EventData,
    newEvent: EventData
) => void;

/**
 * Function used to remove an existing Event object from the array of Events held in local storage
 * @param event: The Event object to be removed from local storage
 */
type RemoveSingleEventFromLocalStorage = (event: EventData) => void;
