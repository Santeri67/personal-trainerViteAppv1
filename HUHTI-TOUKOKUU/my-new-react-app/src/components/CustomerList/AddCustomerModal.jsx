import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewCustomerForm from './NewCustomerForm'; // Adjust path as necessary

function AddCustomerModal({ customers, setCustomers }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="table-responsive">
            <Button variant="primary" onClick={handleShow}>
                Add Customer
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <NewCustomerForm setCustomers={setCustomers} customers={customers} closeModal={handleClose}/>
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
}

export default AddCustomerModal;
