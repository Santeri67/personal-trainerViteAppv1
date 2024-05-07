import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TrainingList.css';


function CustomerTrainings() {
    const { customerId } = useParams();
    const [trainings, setTrainings] = useState([]);
    const [customerName, setCustomerName] = useState('');

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
                    const trainingsWithIds = response.data._embedded.trainings.map((training, index) => ({
                        ...training,
                        id: training.id || `fallback-id-${index}`,
                        date: dayjs(training.date).format('DD.MM.YYYY HH:mm')
                    }));
                    console.log("Fetched Trainings with IDs:", trainingsWithIds);
                    setTrainings(trainingsWithIds);
                }
            } catch (error) {
                console.error('Failed to fetch trainings:', error);
                setTrainings([]);
            }
        };

        fetchCustomerDetails();
        fetchTrainings();
    }, [customerId]);

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
                        </tr>
                    </thead>
                    <tbody>
                        {trainings.map(training => (
                            <tr key={training.id}>
                                <td>{dayjs(training.date).format('DD.MM.YYYY HH:mm')}</td>
                                <td>{training.duration}</td>
                                <td>{training.activity}</td>
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
