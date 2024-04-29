// CustomerTable.js
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './CustomerList.css'; // Import the same CSS used by TrainingTable

function CustomerTable({ customers, handleSort, navigate, sortConfig }) {
    return (
        <table className="table table-dark1">
            <thead>
                <tr>
                    <th onClick={() => handleSort('firstname')}>
                        First Name
                        <FontAwesomeIcon
                            icon={sortConfig.key === 'firstname' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort}
                            className={sortConfig.key === 'firstname' ? 'sort-icon-active' : 'sort-icon-inactive'}
                        />
                    </th>
                    <th onClick={() => handleSort('lastname')}>
                        Last Name
                        <FontAwesomeIcon
                            icon={sortConfig.key === 'lastname' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort}
                            className={sortConfig.key === 'lastname' ? 'sort-icon-active' : 'sort-icon-inactive'}
                        />
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.firstname}</td>
                        <td>{customer.lastname}</td>
                        <td>
                            <button onClick={() => navigate(`/customers/${customer.id}/trainings`)}>
                                View Trainings
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default CustomerTable;
