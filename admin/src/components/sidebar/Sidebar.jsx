import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logout } from '../../context/authContext/apiCalls';



const Sidebar = () => {

      const { dispatch:modeDispatch } = useContext(DarkModeContext);
    const { user, dispatch } = useContext(AuthContext);

    const setLogout = () => {
        if (user) {
            logout(user, dispatch);
        }
    }

    return (
        <div className='sideBar'>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <div className="top"><span className="logo">Admin panel</span></div>
            </Link>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <li><DashboardIcon className='icon' /><span>Dashboard</span></li>
                    </Link>
                    <p className="title">QUICK MENU</p>
                    <Link to='/users' style={{ textDecoration: 'none' }}>
                        <li><PersonIcon className='icon' /><span>Users</span></li>
                    </Link>

                    <Link to='/movies' style={{ textDecoration: 'none' }}>
                        <li><StoreMallDirectoryIcon className='icon' /><span>Movies</span></li>
                    </Link>
                    <Link to='/lists' style={{ textDecoration: 'none' }}>
                    <li><CreditCardIcon className='icon' /><span>Lists</span></li>
                    </Link>
                    <li><LocalShippingIcon className='icon' /><span>Subsribe</span></li>
                    <p className="title">LISTS</p>
                    <li><QueryStatsIcon className='icon' /><span>Stats</span></li>
                    <li><NotificationsIcon className='icon' /><span>Notifications</span></li>
                    <p className="title">SERVICE</p>
                    <li><FavoriteIcon className='icon' /><span>System health</span></li>
                    <li><PsychologyIcon className='icon' /><span>Logs</span></li>
                    <li><SettingsIcon className='icon' /><span>Settings</span></li>
                    <p className="title">USER</p>
                    <li><AccountCircleIcon className='icon' /><span>Profile</span></li>
                    <Link to={user ? '/logout' : '/login'} style={{ textDecoration: 'none' }}>
                        <li onClick={setLogout}><LogoutIcon className='icon' /><span>{user ? 'Logout' : 'Login'}</span></li>
                    </Link>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={() => modeDispatch({ type: "LIGHT" })}></div>
                <div className="colorOption" onClick={() => modeDispatch({ type: "DARK" })}></div>
            </div>
        </div>
    )
}

export default Sidebar