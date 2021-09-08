import React from 'react';
import { storiesOf } from '@storybook/react';

import { Calendar } from '../components/CalendarComponent';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
    return <Calendar />;
});
