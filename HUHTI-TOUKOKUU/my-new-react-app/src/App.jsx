import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList/CustomerList';
import Navigation from './components/Navigation';
import TrainingList from './components/TrainingList/TrainingList';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:customerId/trainings" element={<TrainingList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default App;
