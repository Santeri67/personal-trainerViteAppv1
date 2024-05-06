import axios from 'axios';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

function ExportCustomer() {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers');
            if (response.data && response.data._embedded && response.data._embedded.customers) {
                setCustomers(response.data._embedded.customers);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const headers = [
        { label: 'First Name', key: 'firstname' },
        { label: 'Last Name', key: 'lastname' },
        { label: 'Street Address', key: 'streetaddress' },
        { label: 'Postcode', key: 'postcode' },
        { label: 'City', key: 'city' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' }
    ];

    const csvData = customers.map(customer => ({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone
    }));

    const handleExportClick = () => {
        if (window.confirm("Export customers to CSV?")) {
            document.querySelector(".csv-link").click();
        }
    };

    return (
        <div>
            {isLoading ? (
                <button disabled>Loading Customers...</button>
            ) : (
                customers.length > 0 && (
                    <>
                        <button onClick={handleExportClick} className="btn btn-export">
                            Export Customers to CSV
                        </button>
                        <CSVLink data={csvData} headers={headers} filename="customers.csv" className="csv-link" style={{ display: 'none' }}>
                            Download CSV
                        </CSVLink>
                    </>
                )
            )}
        </div>
    );
}

export default ExportCustomer;
