import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteTraining } from '../../utils/apiHelpers';
import './TrainingList.css';


function CustomerTrainings() {
    const { customerId } = useParams();
    const [trainings, setTrainings] = useState([]);
    const [customerName, setCustomerName] = useState('');

    // Fetch customer details
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}`);
                if (response.data) {
                    setCustomerName(`${response.data.firstname} ${response.data.lastname}`);
                }
            } catch (error) {
                console.error('Error fetching customer details:', error);
                setCustomerName('Unknown');
            }
        };

        const fetchTrainings = async () => {
            try {
                const response = await axios.get(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}/trainings`);
                if (response.data._embedded) {
                    setTrainings(response.data._embedded.trainings.map(training => ({
                        ...training,
                        date: dayjs(training.date).format('DD.MM.YYYY HH:mm')
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch trainings:', error);
                setTrainings([]);
            }
        };

        fetchCustomerDetails();
        fetchTrainings();
    }, [customerId]);

    const handleDeleteTraining = async (trainingId) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            try {
                const response = await deleteTraining(trainingId);
                if (response.status === 204) {
                    setTrainings(prevTrainings => prevTrainings.filter(t => t.id !== trainingId));
                    alert("Training deleted successfully.");
                }
            } catch (error) {
                console.error('Failed to delete training:', error);
                alert('Failed to delete training. Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Trainings for {customerName} (ID: {customerId})</h2>
            {trainings.length > 0 ? (
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Duration (min)</th>
                            <th>Activity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainings.map((training, index) => (
                            <tr key={index}>
                                <td>{dayjs(training.date).format('DD.MM.YYYY HH:mm')}</td>
                                <td>{training.duration}</td>
                                <td>{training.activity}</td>
                                <td>
                                    <button onClick={() => handleDeleteTraining(training.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No trainings found or data is still loading.</div>
            )}
        </div>
    );
}

export default CustomerTrainings;
