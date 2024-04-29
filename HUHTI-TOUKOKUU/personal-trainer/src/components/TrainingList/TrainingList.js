import axios from 'axios';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import TrainingTable from './TrainingTable';

function TrainingList({ customerId }) {
  // State declarations
  const [trainings, setTrainings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filter, setFilter] = useState('');

  // Filter trainings based on user input
  const applyFiltering = useCallback((trainings) => (
    trainings.filter(training =>
      training.activity.toLowerCase().includes(filter.toLowerCase())
    )
  ), [filter]);

  // Sort trainings based on selected column
  const applySorting = useCallback((trainings) => (
    [...trainings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    })
  ), [sortConfig]);

  // Fetch and process trainings from the API
  const fetchTrainings = useCallback(async () => {
    try {
      const trainingEndpoint = 'https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings';
      const response = await axios.get(trainingEndpoint);

      const processedTrainings = response.data.map(training => ({
        ...training,
        date: dayjs(training.date).format('DD.MM.YYYY HH:mm'),
      }));

      setTrainings(applySorting(applyFiltering(processedTrainings)));
    } catch (error) {
      console.error('Error fetching trainings:', error);
      alert(`Failed to fetch trainings: ${error.message}`);
    }
  }, [applyFiltering, applySorting]);

  // Handle user sorting action
  const handleSort = useCallback((key) => (
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending',
    }))
  ), []);

  // Fetch trainings on mount and when dependencies change
  useEffect(() => {
    fetchTrainings();
  }, [fetchTrainings]);

  // Render the training list or a loading message
  return (
    <div>
      <h2>Training List</h2>
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
