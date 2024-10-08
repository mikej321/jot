import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../styles/dashboard.css';



function Searchbar() {
    return (
        <>
            <div className="searchbarContainer mobileSearchbar">
                <div className="searchIconContainer">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="dashboardIcon" />
                </div>
                <input type="text" name="searchbar" id="" className="searchbar" />
            </div>
            <div className="searchbarContainer desktopSearchbar">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="dashboardIcon dashboardSearchIconDesktop" />
                <input type="text" name="searchbar" id="" className="searchbar" />
            </div>
        </>
    )
}

export default Searchbar;