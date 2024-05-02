import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './CustomerList.css';

function CustomerTable({ customers = [], handleSort, navigate, sortConfig = { key: '', direction: '' }, setCustomers }) {
    const handleDeleteCustomer = async (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                const response = await axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`);
                if (response.status === 200) {
                    const updatedCustomers = customers.filter(customer => customer.id !== customerId);
                    setCustomers(updatedCustomers);
                }
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert(`Failed to delete customer: ${error.response ? error.response.data.message : 'Server error'}`);
            }
        }
    };
    
    return (
        <>
        {customers.map((customer) => (
            <div className="mobile-card" key={customer.id}>
                <p><strong>Customer&apos;s name:</strong> {customer.firstname}, {customer.lastname}</p>
                <p><strong>Street Address:</strong> {customer.streetaddress}</p>
                <p><strong>City:</strong> {customer.city}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><button onClick={() => navigate?.(`/customers/${customer.id}/trainings`)} className="btn btn-primary">View Trainings</button></p>
                <p><button onClick={() => handleDeleteCustomer(customer.id)} className="btn btn-danger">Delete</button></p>
            </div>
        ))}
        
        <div className="table-responsive">
            <table className="table table-dark1">
                <thead>
                    <tr>
                        <th onClick={() => handleSort?.('firstname')}>First Name<FontAwesomeIcon icon={sortConfig?.key === 'firstname' ? (sortConfig?.direction === 'ascending' ? faSortUp : faSortDown) : faSort} /></th>
                        <th onClick={() => handleSort?.('lastname')}>Last Name<FontAwesomeIcon icon={sortConfig?.key === 'lastname' ? (sortConfig?.direction === 'ascending' ? faSortUp : faSortDown) : faSort} /></th>
                        <th>Street Address</th>
                        <th>Postcode</th>
                        <th>City</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className="actions">Actions</th>
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
                                <td className="actions">
                            <div className="button-group">
                                <button onClick={() => navigate?.(`/customers/${customer.id}/trainings`)} className="btn btn-primary">View Trainings</button>
                                <button onClick={() => handleDeleteCustomer(customer.id)} className="btn btn-danger">Delete</button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
);
}

export default CustomerTable;