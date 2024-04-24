import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import TrainingTable from './TrainingTable';

function TrainingList({ customerId }) {
  const [trainings, setTrainings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const endpoint = customerId
          ? `https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customerId}/trainings`
          : 'https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings';
        
        const response = await axios.get(endpoint);
        let fetchedTrainings = response.data._embedded.trainings.map(async (training) => {
          try {
            const customerResponse = await axios.get(training._links.customer.href);
            const customer = customerResponse.data;
            return {
              ...training,
              date: dayjs(training.date).format('DD.MM.YYYY HH:mm'),
              customerName: `${customer.firstname} ${customer.lastname}`
            };
          } catch (err) {
            console.error("Error fetching customer data for training:", err);
            // Provide default data if customer details can't be loaded
            return {
              ...training,
              date: dayjs(training.date).format('DD.MM.YYYY HH:mm'),
              customerName: "Unknown Customer"
            };
          }
        });

        fetchedTrainings = await Promise.all(fetchedTrainings);

        if (filter) {
          fetchedTrainings = applyFiltering(fetchedTrainings, filter);
        }

        if (sortConfig.key) {
          fetchedTrainings = applySorting(fetchedTrainings, sortConfig);
        }

        setTrainings(fetchedTrainings);
      } catch (error) {
        console.error('Error fetching trainings: ', error);
      }
    };

    fetchTrainings();
  }, [customerId, sortConfig, filter]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  const applyFiltering = (trainings, filter) => {
    return trainings.filter(training =>
      training.activity.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const applySorting = (trainings, sortConfig) => {
    return [...trainings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  if (trainings.length === 0) {
    return <div>No trainings found or data is still loading.</div>;
  }

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
        <TrainingTable trainings={trainings} handleSort={handleSort} />
    </div>
  );
}

export default TrainingList;
