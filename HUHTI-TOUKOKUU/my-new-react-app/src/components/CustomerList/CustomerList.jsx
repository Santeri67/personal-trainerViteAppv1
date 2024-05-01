import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTable from './CustomerTable';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'firstname', direction: 'ascending' });
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    const applySorting = useCallback((customers, { key, direction }) => {
        return [...customers].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, []);

    const applyFiltering = useCallback((customers, filter) => {
        return customers.filter(customer =>
            customer.firstname.toLowerCase().includes(filter.toLowerCase()) ||
            customer.lastname.toLowerCase().includes(filter.toLowerCase())
        );
    }, []);

    const fetchAndProcessCustomers = useCallback(async () => {
        try {
            const response = await axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers');
            if (response.data._embedded && response.data._embedded.customers) {
                let fetchedCustomers = response.data._embedded.customers.map(customer => ({
                    ...customer,
                    id: customer._links.self.href.split('/').pop() // Safely extracts the ID
                }));
                fetchedCustomers = applySorting(fetchedCustomers, sortConfig);
                fetchedCustomers = applyFiltering(fetchedCustomers, filter);
                setCustomers(fetchedCustomers);
            } else {
                throw new Error("No customers found");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch customers. Please try again.');
        }
    }, [sortConfig, filter, applySorting, applyFiltering]);

    useEffect(() => {
        fetchAndProcessCustomers();
    }, [fetchAndProcessCustomers]);

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    if (customers.length === 0) {
        return <div>No customers found or data is still loading.</div>;
    }

    return (
        <div>
            <h2>Customer List</h2>
            <input type="text" className="form-control my-3" placeholder="Filter by name..." value={filter} onChange={handleFilterChange} />
            <CustomerTable customers={customers} handleSort={handleSort} navigate={navigate} sortConfig={sortConfig} />
        </div>
    );
}

export default CustomerList;
