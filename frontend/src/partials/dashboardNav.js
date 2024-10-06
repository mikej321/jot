import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import BrightnessToggle from './components/brightnessToggle';
import '../styles/dashboard.css';


function DashboardNav() {
    return (
        <nav className="dashboardNav">
            <FontAwesomeIcon icon={faRightFromBracket} className="navbarIcon" />
            <div className="nameBubble">
                <div className="userNameFirstLetter">M</div>
            </div>
            <BrightnessToggle />
        </nav>
    )
}

export default DashboardNav;