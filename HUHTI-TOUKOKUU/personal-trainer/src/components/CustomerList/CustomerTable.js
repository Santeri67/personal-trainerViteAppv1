// CustomerTable.js
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'; // Import faTrash for delete icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import './CustomerList.css'; // Make sure this CSS includes styles for the delete button

function CustomerTable({ customers, handleSort, navigate, sortConfig, setCustomers }) {
  // Function to handle the deletion of a customer
  const handleDeleteCustomer = async (customerId) => {
    console.log('Attempting to delete customer with ID:', customerId);
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`);
        if (response.status === 200) {
        // Filter out the deleted customer from the state
        const updatedCustomers = customers.filter(customer => customer.id !== customerId);
        setCustomers(updatedCustomers);
        }
      } catch (error) {
        console.error('Error deleting customer: ', error);
        alert(`Failed to delete customer: ${error.response ? error.response.data.message : 'Server error'}`);
      }
    }
  };

  return (
    <table className="table table-dark1">
      <thead>
        <tr>
        <th onClick={() => handleSort('firstname')}>
            First Name
            <FontAwesomeIcon icon={sortConfig.key === 'firstname' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} />
          </th>
          <th onClick={() => handleSort('lastname')}>
            Last Name
            <FontAwesomeIcon icon={sortConfig.key === 'lastname' ? (sortConfig.direction === 'ascending' ? faSortUp : faSortDown) : faSort} />
          </th>
          <th>Street Address</th>
          <th>Postcode</th>
          <th>City</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.firstname}</td>
            <td>{customer.lastname}</td>
            <td>{customer.streetaddress}</td>
            <td>{customer.postcode}</td>
            <td>{customer.city}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>
              {/* Action buttons */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;