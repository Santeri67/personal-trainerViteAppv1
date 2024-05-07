import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navigation from '././components/Navigation';
import './App.css';
import CustomerList from './components/CustomerList/CustomerList';
import './components/CustomerList/CustomerList.css';
import HomePage from './components/HomePage/HomePage';
import CustomerTrainings from './components/TrainingList/CustomerTrainings';
import TrainingList from './components/TrainingList/TrainingList';


function App() {
  return (
    <Router basename="/personal-trainerViteAppv1">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:customerId/trainings" element={<CustomerTrainings />} />
        <Route path="/trainings" element={<TrainingList />} />
      </Routes>
    </Router>
  );
}

export default App;
