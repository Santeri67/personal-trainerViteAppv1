import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const localizer = momentLocalizer(moment);

function CustomHeader({ date }) {

    const weekNumber = moment(date).isoWeek();
    return <div>Week {weekNumber}</div>;
}

function TrainingCalendar({ events }) {
    const [view, setView] = useState('week');

    return (
        <div style={{ height: '100%', minHeight: '700px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                view={view}
                onView={setView}
                views={['month', 'week', 'day']}
                step={60}
                timeslots={1}
                showMultiDayTimes
                defaultDate={new Date()}
                components={{
                    month: {
                        header: CustomHeader
                    }
                }}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.duration > 60 ? 'red' : 'indigo',
                        color: 'white',
                        borderRadius: '0px'
                    }
                })}
                min={view === 'week' ? moment().startOf('day').add(7, 'hours') : undefined}
            />
        </div>
    );
}

export default TrainingCalendar;
