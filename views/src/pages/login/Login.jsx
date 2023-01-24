import { useContext } from 'react';
import { useState } from 'react';
import { login } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';
import './login.scss'

const Login = () => {
    const [data,setData] = useState(null)
    const {dispatch} = useContext(AuthContext)


    const handleChamge = (e) => {
        const value = e.target.value;
        setData({...data,[e.target.name]:value})
    }

    const checkLogin = async(e) => {
        e.preventDefault();
        try {
            login(data,dispatch)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Logo" />
                </div>
            </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder='Email or Phone number' name='email' onChange={handleChamge}/>
                    <input type="password" placeholder='Password' name='password' onChange={handleChamge}/>
                    <button className="logInButton" onClick={checkLogin}>Sign In</button>
                    <span>New to Netflix?<b>Sign Up now.</b></span>
                    <small>Lorem ipsum dolor sit amet.<b>Learn more</b>.</small>
                </form>
            </div>
        </div>
    )
}

export default Login