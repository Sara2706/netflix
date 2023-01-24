import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import UserList from './pages/userList/List';
import MovieList from './pages/movieList/List';
import List from './pages/lisiOfList/List';
import UserSingle from './pages/userSingle/Single';
import MovieSingle from './pages/movieSingle/Single';
import ListSingle from './pages/ListSingle/Single';
import UserNew from './pages/userNew/New';
import MovieNew from './pages/movieNew/New';
import ListNew from './pages/listNew/New';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext/AuthContext'


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext)

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user?<Navigate to='/'/>:<Login />} />
          <Route path="/logout" element={<Navigate to='/'/>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:userId" element={<UserSingle type='user'/>} />
          <Route path="/users/new" element={<UserNew inputs={userInputs} title='Add new user' />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:productId" element={<MovieSingle type='movie'/>} />
          <Route path="/movies/new" element={<MovieNew title='Add new movie' />} />
          <Route path="/lists" element={<List />} />
          <Route path="/lists/:listId" element={<ListSingle type='movie'/>} />
          <Route path="/lists/new" element={<ListNew type='movie'/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
