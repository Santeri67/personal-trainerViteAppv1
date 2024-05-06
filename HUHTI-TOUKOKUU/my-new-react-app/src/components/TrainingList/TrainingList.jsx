import axios from 'axios';
import 'dayjs/locale/fi';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTraining } from '../../utils/apiHelpers';
import TrainingCalendar from './TrainingCalendar';
import TrainingTable from './TrainingTable';






function TrainingList() {
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [events, setEvents] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

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
            
            // Convert dates to Date objects and add customer names right here
            trainingsData = trainingsData.map(training => ({
                ...training,
                date: new Date(training.date), // Converting string date to Date object
                customerName: training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : 'Unknown',
                end: new Date(new Date(training.date).getTime() + training.duration * 60000) // Calculating end time
            }));
    
            // Apply filtering and sorting
            trainingsData = applySorting(applyFiltering(trainingsData));
            setTrainings(trainingsData);
    
            // Transform trainings data into events for the calendar
            const calendarEvents = trainingsData.map(training => ({
                title: `${training.activity} / ${training.customerName}`,
                start: training.date,
                end: training.end
            }));
            console.log("Events set for calendar:", calendarEvents);
            setEvents(calendarEvents);
    
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
            <button onClick={() => setShowCalendar(!showCalendar)} className="btn btn-toggle">
                {showCalendar ? "Show Table" : "Show Calendar"}
            </button>
            <input
                type="text"
                className="form-control my-3"
                placeholder="Filter by activity..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                />
                {trainings.length > 0 ? (
                    showCalendar ?
                    <TrainingCalendar events={events} /> :
                    <TrainingTable trainings={trainings} handleSort={handleSort} sortConfig={sortConfig} navigate={navigate} handleDeleteTraining={handleDeleteTraining} />
                ) : (
                    <div>No trainings found or data is still loading.</div>
                )}
            </div>
        );
    }

export default TrainingList;
