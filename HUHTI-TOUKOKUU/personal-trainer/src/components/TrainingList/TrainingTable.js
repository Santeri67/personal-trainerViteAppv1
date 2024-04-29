// TrainingTable.js
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './TrainingList.css';

const TrainingTable = ({ trainings, handleSort, sortConfig }) => {
    // Calculate the number of columns for the colSpan
    const columnCount = 3; // Adjust the number according to your actual number of columns

    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th onClick={() => handleSort('date')}>
                        Date
                        <FontAwesomeIcon
                            icon={sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort}
                            className={sortConfig.key === 'date' ? 'sort-icon-active' : 'sort-icon-inactive'}
                        />
                    </th>
                    <th onClick={() => handleSort('activity')}>
                        Activity
                        <FontAwesomeIcon
                            icon={sortConfig.key === 'activity' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort}
                            className={sortConfig.key === 'activity' ? 'sort-icon-active' : 'sort-icon-inactive'}
                        />
                    </th>
                    <th>Customer Name</th>
                </tr>
            </thead>
            <tbody>
                {trainings.length > 0 ? (
                    trainings.map((training, index) => (
                        <tr key={training.id || index}>
                            <td>{training.date}</td>
                            <td>{training.activity}</td>
                            <td>{training.customerName}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columnCount} className="text-center">No trainings found or data is still loading.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TrainingTable;
