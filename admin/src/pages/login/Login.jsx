import { useContext, useState } from 'react'
import { login } from '../../context/authContext/apiCalls'
import './login.scss'
import { AuthContext } from '../../context/authContext/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch)
  }
  return (
    <div className='login'>
      <form className="loginForm">
        <h2 style={{textAlign:'center'}}> Try this</h2>
        <h5 style={{textAlign:'center'}}>
          <span>Email:netflixadmin@gmail.com</span><br></br>
          <span style={{textAlign:'center'}}>Password:123456789</span>
        </h5>
        <input type="email" placeholder='Email' className="loginInput" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className="loginInput" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} disabled={isFetching}>Login</button>
      </form>
    </div>
  )
}

export default Login