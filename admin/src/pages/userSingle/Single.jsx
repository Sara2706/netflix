import './single.scss'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useContext, useState } from 'react'
import { updateUser } from '../../context/userContext/apiCalls'
import { UserContext } from '../../context/userContext/UserContext'

const UserSingle = ({ type }) => {
  const [edit, setEdit] = useState(false)
  const location = useLocation();
  let item = location.state;

  const [data, setData] = useState('');

  const { dispatch } = useContext(UserContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value })
  }

  const updateUserData = (e) => {
    e.preventDefault();
    const id = item._id;
    updateUser(id, data, dispatch)
  }
  console.log(item.isAdmin)
  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => setEdit(true)}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Id:</span>
                  <span className="itemValue">{item._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{item.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{item.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{item.isAdmin === true ? 'Admin' : 'User'}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{item.createdAt}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Password:</span>
                  <span className="itemValue">{item.password}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {edit &&
          (<div className="bottom">
            <h1 className="title">Edit datas</h1>
            <form className="upWrapper">
              <div className="updateItem">
                <label>Email:</label>
                <input type="text" name="email" className="upInput" placeholder={item.email} onChange={handleChange} />
              </div>
              <div className="updateItem">
                <label>Username:</label>
                <input type="text" name="username" className="upInput" placeholder={item.username} onChange={handleChange} />
              </div>
              <div className="updateItem">
                <label>Is Admin:</label>
                <select name='isAdmin' name="isAdmin" onChange={handleChange}>
                  <option value="true">Admin</option>
                  <option value="false">User</option>
                </select>
              </div>
              <div className="updateItem">
                <label>Password:</label>
                <input type="text" name="password" className="upInput" placeholder={item.password} onChange={handleChange} />
              </div>
              <button onClick={updateUserData}>Update user</button>
            </form>
          </div>)
        }
      </div>
    </div>
  )
}

export default UserSingle