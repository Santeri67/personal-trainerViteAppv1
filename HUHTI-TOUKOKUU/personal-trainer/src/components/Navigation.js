import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/trainings">Trainings</Link></li>
        {/* Add more navigation links if needed */}
      </ul>
    </nav>
  );
};

export default Navigation;
