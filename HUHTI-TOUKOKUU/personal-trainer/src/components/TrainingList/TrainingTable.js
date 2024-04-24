// TrainingTable.js
import React from 'react';
import './TrainingList.css';
const TrainingTable = ({ trainings, handleSort }) => (
    <table className="table table-dark">
        <thead>
            <tr>
                <th onClick={() => handleSort('date')}>Date</th>
                <th onClick={() => handleSort('activity')}>Activity</th>
                <th>Customer Name</th>
            </tr>
        </thead>
        <tbody>
            {trainings.map((training, index) => (
                <tr key={training.id || index}>
                    <td>{training.date}</td>
                    <td>{training.activity}</td>
                    <td>{training.customerName}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default TrainingTable;
