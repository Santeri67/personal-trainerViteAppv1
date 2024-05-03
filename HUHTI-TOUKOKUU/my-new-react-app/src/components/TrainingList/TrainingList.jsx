import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTraining } from '../../utils/apiHelpers';
import TrainingTable from './TrainingTable';





function TrainingList() {
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

    const applyFiltering = useCallback((trainings) => (
        trainings.filter(training => training.activity.toLowerCase().includes(filter.toLowerCase()))
    ), [filter]);

    const applySorting = useCallback((trainings) => (
        [...trainings].sort((a, b) => {
            if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
            return a[sortConfig.key] < b[sortConfig.key] ? (sortConfig.direction === 'ascending' ? -1 : 1) :
            (a[sortConfig.key] > b[sortConfig.key] ? (sortConfig.direction === 'ascending' ? 1 : -1) : 0);
        })
    ), [sortConfig]);

    const fetchTrainings = useCallback(async () => {
        const endpoint = `https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings`;
        try {
            const response = await axios.get(endpoint);
            console.log("API Response:", response.data);
            let trainingsData = response.data._embedded ? response.data._embedded.trainings : response.data;
            if (!Array.isArray(trainingsData)) {
                trainingsData = [];
            }
            trainingsData = trainingsData.map(training => ({
                ...training,
                date: dayjs(training.date).format('DD.MM.YYYY HH:mm'),
                customerName: training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : 'Unknown'
            }));
            trainingsData = applySorting(applyFiltering(trainingsData));
            setTrainings(trainingsData);
        } catch (error) {
            console.error('Error fetching trainings:', error);
            alert(`Failed to fetch trainings: ${error.toString()}`);
            setTrainings([]);
        }
    }, [applyFiltering, applySorting]);

    useEffect(() => {
        fetchTrainings();
    }, [fetchTrainings]);

    const handleSort = useCallback((key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
        }));
    }, []);

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
        <div>
            <h2>All Trainings</h2>
            <input
                type="text"
                className="form-control my-3"
                placeholder="Filter by activity..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            {trainings.length > 0 ? (
                <TrainingTable trainings={trainings} handleSort={handleSort} sortConfig={sortConfig} navigate={navigate} handleDeleteTraining={handleDeleteTraining} />
            ) : (
                <div>No trainings found or data is still loading.</div>
            )}
        </div>
    );
}

export default TrainingList;
