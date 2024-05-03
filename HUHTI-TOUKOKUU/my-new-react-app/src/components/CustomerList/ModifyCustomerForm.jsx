import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModifyCustomerForm({ customer, setCustomers, showModal, closeModal }) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (customer) {
            setFormData({ ...customer });
        }
    }, [customer]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customer.id}`, formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                setCustomers(prev => prev.map(c => c.id === customer.id ? { ...c, ...formData } : c));
                alert('Customer updated successfully!');
                closeModal();
            }
        } catch (error) {
            console.error('Failed to update customer:', error);
            alert('Failed to update customer. Please try again.');
        }
    };

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modify Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" required />
                    <input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" required />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                    <input name="streetaddress" value={formData.streetaddress} onChange={handleChange} placeholder="Street Address" required />
                    <input name="postcode" value={formData.postcode} onChange={handleChange} placeholder="Postcode" required />
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                    <Button variant="primary" type="submit">Update Customer</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ModifyCustomerForm;
