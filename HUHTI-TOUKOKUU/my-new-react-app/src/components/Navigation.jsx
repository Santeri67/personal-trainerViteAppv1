import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <div className='Navi'>
            <Nav className="me-auto">
                <Nav.Link
                    as={NavLink}
                    to="/"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    Home
                </Nav.Link>
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
        </div>
    );
};

export default Navigation;
