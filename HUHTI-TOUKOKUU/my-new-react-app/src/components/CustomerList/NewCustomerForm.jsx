import axios from 'axios';
import { useState } from 'react';
import './CustomerList.css';

function NewCustomerForm({ setCustomers, customers, closeModal }) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCustomers([...customers, response.data]); // Update the local state to include the new customer
            alert('Customer added successfully!');
            closeModal();
        } catch (error) {
            console.error('Failed to add customer:', error);
            alert('Failed to add customer. Please try again.');
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" required />
            <input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" required />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input name="streetaddress" value={formData.streetaddress} onChange={handleChange} placeholder="Street Address" required />
            <input name="postcode" value={formData.postcode} onChange={handleChange} placeholder="Postcode" required />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
            <button className="submit-buttons">Add Customer</button>
        </form>
        </div>
    );
}

export default NewCustomerForm;
