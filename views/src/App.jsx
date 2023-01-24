import './app.scss'
import Home from './pages/home/Home'
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Watch from './pages/watch/Watch';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';

function App() {
    const { user } = useContext(AuthContext)
    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Navigate to="register" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/movies" element={user ? <Home type="movies" /> : <Navigate to='/login' />} />
                <Route path="/series" element={user ? <Home type="series" /> : <Navigate to='/login' />} />
                <Route path="/watch" element={user ? <Watch /> : <Navigate to='/login' />} />
            </Routes>
        </Router>
    )
}

export default App;
