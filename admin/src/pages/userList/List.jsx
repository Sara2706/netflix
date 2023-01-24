import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/userDataTable/DataTable'
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { getUsers } from '../../context/userContext/apiCalls';
import { PopUpContext } from '../../context/popUpContext/PopUpContext';

const UserList = () => {

  const { show,content,dispatch:popUpDispatch  } = useContext(PopUpContext);


  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  return (
    <>
      <div className='list'>
        <Sidebar />
        <div className='listContainer'>
          <Navbar />
          <DataTable datas={users} />
        </div>
      </div>
      {show &&
        <div className="popUp">
          <div className="popUpBackk"></div>
          <div className="popUpContent">
            <h1>{content}</h1>
            <button onClick={()=>popUpDispatch({type:'DONT_SHOW'})}>Ok</button>
          </div>
        </div>
      }
    </>
  )
}

export default UserList