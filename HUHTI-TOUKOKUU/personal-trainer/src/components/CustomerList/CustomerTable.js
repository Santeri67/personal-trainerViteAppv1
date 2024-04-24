// CustomerTable.js
import React from 'react';
import './CustomerList.css'; // Import the same CSS used by TrainingTable

function CustomerTable({ customers, handleSort, navigate }) {
    return (
        <table className="table table-dark1">
            <thead>
                <tr>
                    <th onClick={() => handleSort('firstname')}>First Name</th>
                    <th onClick={() => handleSort('lastname')}>Last Name</th>
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
