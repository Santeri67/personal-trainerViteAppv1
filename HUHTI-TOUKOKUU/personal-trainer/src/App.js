import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; // Global import, only needed once
import './App.css';
import CustomerList from './components/CustomerList/CustomerList';
import Navigation from './components/Navigation';
import TrainingList from './components/TrainingList/TrainingList.js';
import './index.css';




function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:customerId/trainings" element={<TrainingList />} />
        <Route path="/trainings" element={<TrainingList />} />
        {/* ... other routes ... */}
      </Routes>
    </Router>
  );
}

export default App;
