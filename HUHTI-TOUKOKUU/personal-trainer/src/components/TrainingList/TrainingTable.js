// TrainingTable.js
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './TrainingList.css';

const TrainingTable = ({ trainings, handleSort, sortConfig }) => {

    return (
        <table className="table table-dark">
            <thead>
            <tr>
                <th onClick={() => handleSort('date')}>
                Date
                <FontAwesomeIcon icon={sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} />
                </th>
                <th onClick={() => handleSort('duration')}>
                Duration (min)
                <FontAwesomeIcon icon={sortConfig.key === 'duration' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} />
                </th>
                <th onClick={() => handleSort('activity')}>
                Activity
                <FontAwesomeIcon icon={sortConfig.key === 'activity' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} />
                </th>
                <th>Customer Name</th>
            </tr>
            </thead>
            <tbody>
                {trainings.map((training) => (
                <tr key={training.id}>
                    <td>{training.date}</td>
                    <td>{training.duration}</td>
                    <td>{training.activity}</td>
      <td>{training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : 'N/A'}</td> {/* Display customer's full name */}
    </tr>
))}
</tbody>
        </table>
        );
    };
    
export default TrainingTable;
