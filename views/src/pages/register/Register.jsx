import axios from 'axios';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './register.scss'

const Register = () => {
    const [email, setEmail] = useState('');

    const [data, setData] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setData({ ...data, [e.target.name]: value })
    }

    const handleStart = async (e) => {
        setEmail(data.email)
    }

    const handleFinish = (e) => {
        e.preventDefault();
       registerNew();
    }

    const registerNew = async() => {
        try {
            await axios.post('auth/register', data );
            navigate('/login') 
        } catch (error) {
            console.log(error)
        }
    }
    


    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Logo" />
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, Tv shows and more.</h1>
                <h2>Watch anywhere. Cancel anythime.</h2>
                <p>ready to watch? Enter your email to create or restart your membership</p>
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder='email address' name='email' onChange={handleChange} />
                        <button className="registerButton" onClick={handleStart}>Get start</button>
                    </div>
                ) : (
                    <form className="input">
                        <input type="password" placeholder='password' name='password' onChange={handleChange} />
                        <input type="text" placeholder='Username' name='username' onChange={handleChange} />
                        <button className="registerButton" onClick={handleFinish}>Start</button>
                    </form>
                )}
                <p>Already have a account {<Link to='/login' style={{color:'red',textDecoration: 'none'}}>Login</Link>}</p>
            </div>
        </div>
    )
}

export default Register