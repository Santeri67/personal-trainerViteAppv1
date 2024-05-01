import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import 'dayjs/locale/fi'; // Import Finnish locale
import timezone from 'dayjs/plugin/timezone'; // For timezone handling
import utc from 'dayjs/plugin/utc'; // For UTC handling
import './TrainingList.css';

dayjs.extend(utc);
dayjs.extend(timezone);

function TrainingTable({ trainings, handleSort, sortConfig }) {
    // Set locale to Finnish
    dayjs.locale('fi');
    dayjs.tz.setDefault("Europe/Helsinki");

    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th onClick={() => handleSort('date')}>Date<FontAwesomeIcon icon={sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} /></th>
                    <th onClick={() => handleSort('duration')}>Duration (min)<FontAwesomeIcon icon={sortConfig.key === 'duration' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} /></th>
                    <th onClick={() => handleSort('activity')}>Activity<FontAwesomeIcon icon={sortConfig.key === 'activity' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} /></th>
                    <th>Customer Name</th>
                </tr>
            </thead>
            <tbody>
                {trainings.map((training, index) => (
                    <tr key={training.id || index}>
                        <td>{dayjs(training.date).format('DD.MM.YYYY HH:mm')}</td>
                        <td>{training.duration}</td>
                        <td>{training.activity}</td>
                        <td>{training.customerName || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TrainingTable;
