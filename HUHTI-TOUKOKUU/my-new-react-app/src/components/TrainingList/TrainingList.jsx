import axios from 'axios';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TrainingTable from './TrainingTable';

function TrainingList() {
    const { customerId } = useParams();
    const [trainings, setTrainings] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [filter, setFilter] = useState('');

    const applyFiltering = useCallback((trainings) => (
        trainings.filter(training =>
            training.activity?.toLowerCase().includes(filter.toLowerCase())
        )
    ), [filter]);

    const applySorting = useCallback((trainings) => (
        [...trainings].sort((a, b) => {
            if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        })
    ), [sortConfig]);

    async function fetchCustomerNames(customerIds) {
        const endpointBase = 'https://customerrestservice-personaltraining.rahtiapp.fi';
        const responses = await Promise.all(customerIds.map(id =>
            axios.get(`${endpointBase}/api/customers/${id}`)
        ));
        return responses.reduce((acc, response) => {
            const { id, firstname, lastname } = response.data;
            acc[id] = `${firstname} ${lastname}`;
            return acc;
        }, {});
    }

    const fetchTrainings = useCallback(async () => {
        const endpointBase = 'https://customerrestservice-personaltraining.rahtiapp.fi';
        const trainingEndpoint = customerId ? `${endpointBase}/api/customers/${customerId}/trainings` : `${endpointBase}/api/trainings`;

        try {
            const trainingResponse = await axios.get(trainingEndpoint);
            let trainingsData = trainingResponse.data._embedded ? trainingResponse.data._embedded.trainings : [];
    
            if (trainingsData.length > 0 && trainingsData.some(t => t.customerId)) {
                const customerIds = [...new Set(trainingsData.map(t => t.customerId))].filter(id => id !== undefined);
                let customerDetails = {};
                if (customerIds.length > 0) {
                    customerDetails = await fetchCustomerNames(customerIds);
                }
                trainingsData = trainingsData.map(training => ({
                    ...training,
                    customerName: customerDetails[training.customerId] || 'Unknown',
                    date: dayjs(new Date(training.date)).format('DD.MM.YYYY HH:mm')
                }));
            }

            setTrainings(applySorting(applyFiltering(trainingsData)));
        } catch (error) {
            console.error('Error fetching trainings:', error);
            alert(`Failed to fetch trainings: ${error.toString()}`);
        }
    }, [customerId, applyFiltering, applySorting]);

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
        }));
    }, []);

    useEffect(() => {
        fetchTrainings();
    }, [fetchTrainings]);

    return (
        <div>
            <h2>{customerId ? `Trainings for Customer ID: ${customerId}` : 'All Trainings'}</h2>
            <input
                type="text"
                className="form-control my-3"
                placeholder="Filter by activity..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            {trainings.length > 0 ? (
                <TrainingTable trainings={trainings} handleSort={handleSort} sortConfig={sortConfig} />
            ) : (
                <div>No trainings found or data is still loading.</div>
            )}
        </div>
    );
}

export default TrainingList;
