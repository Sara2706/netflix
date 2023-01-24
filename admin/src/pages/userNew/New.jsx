import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { createUser } from '../../context/userContext/apiCalls';

const UserNew = ({ title }) => {
  const [data, setData] = useState('');

  const { dispatch } = useContext(UserContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value })
  }

  const uploadUser = (e) => {
    e.preventDefault();

    createUser(data, dispatch)
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className='userCont'>
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form className='form'>
              <div className="wrap">
                <div className="formInput">
                  <label>Email</label>
                  <input type='text' name="email" onChange={handleChange} placeholder='Name' />
                </div>
                <div className="formInput">
                  <label>Username</label>
                  <input type='text' name="username" onChange={handleChange} placeholder='Username' />
                </div>
                <div className="formInput">
                  <label>Password</label>
                  <input type='password' name="password" onChange={handleChange} placeholder='password' />
                </div>
                <div className="formInput">
                  <label>Is Admin</label>
                  <select name="isAdmin" onChange={handleChange}>
                    <option value="true">Admin</option>
                    <option value="false">User</option>
                  </select>
                </div>
              </div>
              <button onClick={uploadUser}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNew