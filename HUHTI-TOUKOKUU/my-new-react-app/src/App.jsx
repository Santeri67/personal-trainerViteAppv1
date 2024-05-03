import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from '././components/Navigation';
import './App.css';
import CustomerList from './components/CustomerList/CustomerList';
import CustomerTrainings from './components/TrainingList/CustomerTrainings';
import TrainingList from './components/TrainingList/TrainingList';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:customerId/trainings" element={<CustomerTrainings />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default App;
