import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
    <div className='Navi'>
    <Navbar bg="primary" variant="dark" expand="lg">
        <Nav className="me-auto">
        <Nav.Link
        as={NavLink}
        to="/customers"
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
        Customers
        </Nav.Link>
        <Nav.Link
        as={NavLink}
        to="/trainings"
        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
            Trainings
        </Nav.Link>
        </Nav>
    </Navbar>
    </div>
    );
};

export default Navigation;
