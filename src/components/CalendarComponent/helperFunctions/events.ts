export const getAllLocalStorageEvents: GetAllLocalStorageEvents = () => {
    try {
        let result = localStorage.getItem('events');
        if (result !== null) {
            return JSON.parse(result);
        } else {
            throw new Error("No 'events' key in localstorage");
        }
    } catch (error) {
        console.log(error);
        return;
    }
};

export const getAllEventsForGivenDate: GetAllEventsForGivenDate = (date) => {
    try {
        let result = localStorage.getItem('events');
        if (result !== null) {
            if (result.length > 0) {
                let allEvents: EventData[] = JSON.parse(result);
                let dayEvents = allEvents.filter((obj) => obj.date === date);
                return dayEvents;
            } else {
                throw new Error("'events' key may exist, but came up empty");
            }
        } else {
            throw new Error("No 'events' key in localstorage");
        }
    } catch (error) {
        console.log(error);
        return;
    }
};

export const addSingleEventToLocalStorage: AddSingleEventToLocalStorage = (
    event
) => {
    try {
        let result = localStorage.getItem('events');
        if (result !== null) {
            // events array already exists in localstorage, just add to it
            let allEvents: EventData[] = JSON.parse(result);
            allEvents.push(event);
            localStorage.setItem('events', JSON.stringify(allEvents));
        } else {
            // events array does not exist in localstorage, create and populate it
            localStorage.setItem('events', JSON.stringify([event]));
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateSingleLocalStorageEvent: UpdateSingleLocalStorageEvent = (
    oldEvent,
    newEvent
) => {
    try {
        let result = localStorage.getItem('events');
        if (result !== null) {
            let events: EventData[] = JSON.parse(result);
            let eventIndex = events.findIndex(
                (obj) =>
                    obj.date === oldEvent.date &&
                    obj.eventName === oldEvent.eventName
            );
            if (eventIndex != -1) {
                events.splice(eventIndex, 1, newEvent);
                localStorage.setItem('events', JSON.stringify(events));
            } else {
                throw new Error('No matching event was found in local storage');
            }
        } else {
            throw new Error("No 'events' key in localstorage");
        }
    } catch (error) {
        console.log(error);
    }
};

export const removeSingleEventFromLocalStorage: RemoveSingleEventFromLocalStorage =
    (event) => {
        try {
            let results = localStorage.getItem('events');
            if (results !== null) {
                let allEvents: EventData[] = JSON.parse(results);
                if (allEvents.length > 0) {
                    let indexOfEventToRemove = allEvents.findIndex(
                        (obj) =>
                            obj.date === event.date &&
                            obj.eventName === event.eventName
                    );
                    allEvents.splice(indexOfEventToRemove, 1);
                    localStorage.setItem('events', JSON.stringify(allEvents));
                } else {
                    throw new Error(
                        "'events' key may exist, but came up empty"
                    );
                }
            } else {
                throw new Error("No 'events' key in localstorage");
            }
        } catch (error) {
            console.log(error);
        }
    };
