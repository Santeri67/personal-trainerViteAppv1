import axios from 'axios';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function AddTrainingForm({ show, handleClose, customerId }) {
    const [trainingData, setTrainingData] = useState({
        date: '',
        duration: '',
        activity: ''
    });

    const handleChange = (e) => {
        setTrainingData({ ...trainingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate the date format
        const dateObject = new Date(trainingData.date);
        if (isNaN(dateObject.getTime())) {
            alert("Please enter a valid date.");
            return;
        }
        const formattedDate = dateObject.toISOString();
        try {
            const response = await axios.post('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
                ...trainingData,
                date: formattedDate,
                customer: `https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                alert('Training added successfully!');
                handleClose();
            }
        } catch (error) {
            console.error('Failed to add training:', error);
            alert('Failed to add training. Please try again.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Training</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input type="datetime-local" name="date" value={trainingData.date} onChange={handleChange} required />
                    <input type="number" name="duration" placeholder="Duration in minutes" value={trainingData.duration} onChange={handleChange} required />
                    <input type="text" name="activity" placeholder="Activity" value={trainingData.activity} onChange={handleChange} required />
                    <Button type="submit">Add Training</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddTrainingForm;
