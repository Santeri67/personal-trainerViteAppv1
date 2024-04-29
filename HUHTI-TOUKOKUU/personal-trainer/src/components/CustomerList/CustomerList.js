// CustomerList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';
import CustomerTable from './CustomerTable'; // Import the new component

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'firstname', direction: 'ascending' });
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers');
                let fetchedCustomers = response.data._embedded.customers;

                fetchedCustomers = applySorting(fetchedCustomers, sortConfig);
                fetchedCustomers = applyFiltering(fetchedCustomers, filter);

                setCustomers(fetchedCustomers);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchCustomers();
    }, [sortConfig, filter]);

    const handleSort = (key) => {
    setSortConfig(prevConfig => ({
        key,
        direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
    }));
};

    if (customers.length === 0) {
        return <div>No customers found or data is still loading.</div>;
    }

    return (
        <div>
            <h2>Customer List</h2>
            <FilterInput filter={filter} setFilter={setFilter} />
            <CustomerTable customers={customers} handleSort={handleSort} navigate={navigate} sortConfig={sortConfig} />
        </div>
    );
}

function applySorting(customers, sortConfig) {
    return [...customers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });
}

function applyFiltering(customers, filter) {
    return customers.filter(customer =>
        customer.firstname.toLowerCase().includes(filter.toLowerCase()) ||
        customer.lastname.toLowerCase().includes(filter.toLowerCase())
    );
}

function FilterInput({ filter, setFilter }) {
    return (
        <input
            type="text"
            className="form-control my-3"
            placeholder="Filter by name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />
    );
}

export default CustomerList;
