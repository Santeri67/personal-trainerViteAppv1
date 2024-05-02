import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerTable from './CustomerTable';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'firstname', direction: 'ascending' });
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    const applySorting = useCallback((customers) => {
        return [...customers].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [sortConfig]);

    const applyFiltering = useCallback(() => {
        const result = customers.filter(customer =>
            customer.firstname.toLowerCase().includes(filter.toLowerCase()) ||
            customer.lastname.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredCustomers(applySorting(result));
    }, [filter, customers, applySorting]);

    useEffect(() => {
        const fetchAndProcessCustomers = async () => {
            try {
                const response = await axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers');
                if (response.data._embedded && response.data._embedded.customers) {
                    let fetchedCustomers = response.data._embedded.customers.map(customer => ({
                        ...customer,
                        id: customer._links.self.href.split('/').pop() // Extracts the ID
                    }));
                    setCustomers(fetchedCustomers);
                    setFilteredCustomers(applySorting(fetchedCustomers));
                } else {
                    throw new Error("No customers found");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Failed to fetch customers. Please try again.');
            }
        };
        fetchAndProcessCustomers();
    }, []);

    useEffect(() => {
        applyFiltering();
    }, [filter, applyFiltering]);

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>
            <h2>Customer List</h2>
            <input type="text" className="form-control my-3" placeholder="Filter by name..." value={filter} onChange={handleFilterChange} />
            <CustomerTable customers={filteredCustomers} handleSort={handleSort} navigate={navigate} sortConfig={sortConfig} />
        </div>
    );
}

export default CustomerList;
