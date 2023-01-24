import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowDropDown, Notifications } from '@material-ui/icons';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {user, dispatch} = useContext(AuthContext);


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);

    return () => (window.onscroll = null);
  }

  const handleLogOut = () => {
    try {
      localStorage.removeItem('user')
      logout(dispatch)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="left">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Logo" />
          <Link to="/" className='link'><span>Homepage</span></Link>
          <Link to="/series" className='link'><span>Series</span></Link>
          <Link to="/movies" className='link'><span>Movies</span></Link>
          <span>New and popular</span>
          <span>My list</span>
        </div>
        <div className="right">
          <SearchIcon className='icon' />
          <span>Kid</span>
          <Notifications className='icon' />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTtS5VKxQV8A6BvC0gdCGFSSZ4Z9PcKPwi9w&usqp=CAU" alt="Profile" />
          <div className="profile">
            <ArrowDropDown className='icon' />
            <div className="options">
              <span>Settings</span>
              {!user ? <Link to='/login'>Login</Link> : <span onClick={handleLogOut}>Logout</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar