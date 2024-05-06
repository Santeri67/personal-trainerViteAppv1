import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCustomerModal from './AddCustomerModal';
import CustomerTable from './CustomerTable';
import ExportCustomer from './ExportCustomer';
import ModifyCustomerForm from './ModifyCustomerForm';

function CustomerList() {
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
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
                        id: customer._links.self.href.split('/').pop()
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

const handleShowModifyModal = () => setShowModifyModal(true);
const handleCloseModifyModal = () => {
    setShowModifyModal(false);
    setEditingCustomer(null);
};

const handleModify = (customer) => {
    setEditingCustomer(customer);
    handleShowModifyModal();
};


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
        <div className='tablecontainer'>
            <h2>Customer List</h2>
            <AddCustomerModal customers={customers} setCustomers={setCustomers} />
            <ExportCustomer />
            <input type="text" className="form-control my-3" placeholder="Filter by name..." value={filter} onChange={handleFilterChange} />
            <CustomerTable
                customers={filteredCustomers}
                handleSort={handleSort}
                navigate={navigate}
                sortConfig={sortConfig}
                setCustomers={setCustomers}
                handleModify={handleModify}
            />
            {editingCustomer && showModifyModal && (
                <ModifyCustomerForm
                    customer={editingCustomer}
                    setCustomers={setCustomers}
                    showModal={showModifyModal}
                    closeModal={handleCloseModifyModal}
                />
            )}
        </div>
    );
}

export default CustomerList;
